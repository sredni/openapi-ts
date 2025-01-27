import fs from 'node:fs';
import path from 'node:path';

import type ts from 'typescript';

import { compiler } from '../compiler';
import { type ImportExportItemObject, tsNodeToString } from '../compiler/utils';
import type { IR } from '../ir/types';
import { ensureValidIdentifier } from '../openApi/shared/utils/identifier';
import type { StringCase } from '../types/config';
import { stringCase } from '../utils/stringCase';
import { ensureDirSync } from './utils';

export interface Identifier {
  /**
   * Did this function add a new property to the file's `identifiers` map?
   */
  created: boolean;
  /**
   * The resolved identifier name. False means the identifier has been blacklisted.
   */
  name: string | false;
}

type Namespace = Record<
  string,
  Pick<Identifier, 'name'> & {
    /**
     * Ref to the type in OpenAPI specification.
     */
    $ref: string;
  }
>;

interface Namespaces {
  /**
   * Type namespace. Types, interfaces, and type aliases exist here.
   * @example
   * ```ts
   * export type Foo = string;
   * ```
   */
  type: Namespace;
  /**
   * Value namespace. Variables, functions, classes, and constants exist here.
   * @example
   * ```js
   * export const foo = '';
   * ```
   */
  value: Namespace;
}

export class TypeScriptFile {
  /**
   * Should the exports from this file be re-exported in the index barrel file?
   */
  private _exportFromIndex: boolean;
  private _headers: Array<string> = [];
  private _identifierCase: StringCase | undefined;
  private _imports = new Map<string, Map<string, ImportExportItemObject>>();
  private _items: Array<ts.Node | string> = [];
  private _name: string;
  private _path: string;

  public namespaces: Namespaces = {
    type: {},
    value: {},
  };
  /**
   * Path relative to the client output root.
   */
  // TODO: parser - add relative path property for quick access, currently
  // everything is resolved into an absolute path with cwd
  // public relativePath: string;

  public constructor({
    dir,
    exportFromIndex = false,
    header = true,
    identifierCase,
    name,
  }: {
    dir: string;
    /**
     * Should the exports from this file be re-exported in the index barrel file?
     */
    exportFromIndex?: boolean;
    header?: boolean;
    identifierCase?: StringCase;
    name: string;
  }) {
    this._exportFromIndex = exportFromIndex;
    this._identifierCase = identifierCase;
    this._name = this._setName(name);
    this._path = path.resolve(dir, this._name);

    if (header) {
      this._headers.push(
        '// This file is auto-generated by @hey-api/openapi-ts',
      );
    }
  }

  public add(...nodes: Array<ts.Node | string>) {
    this._items = this._items.concat(nodes);
  }

  /**
   * Prevents a specific identifier from being created. This is useful for
   * transformers where we know a certain transformer won't be needed, and
   * we want to avoid attempting to create since we know it won't happen.
   */
  public blockIdentifier({
    $ref,
    namespace,
  }: Pick<EnsureUniqueIdentifierData, '$ref'> & {
    namespace: keyof Namespaces;
  }): Identifier {
    const refValue = this.namespaces[namespace][$ref];
    if (!refValue) {
      throw new Error(
        `Identifier for $ref ${$ref} in namespace ${namespace} not found`,
      );
    }

    refValue.name = false;

    return {
      created: false,
      name: refValue.name,
    };
  }

  public get exportFromIndex(): boolean {
    return this._exportFromIndex;
  }

  public identifier({
    namespace,
    ...args
  }: Omit<EnsureUniqueIdentifierData, 'case' | 'namespace'> & {
    namespace: keyof Namespaces;
  }): Identifier {
    return ensureUniqueIdentifier({
      case: this._identifierCase,
      namespace: this.namespaces[namespace],
      ...args,
    });
  }

  /**
   * Adds an import to the provided module. Handles duplication, returns added
   * import. Returns the imported name. If we import an aliased export, `name`
   * will be equal to the specified `alias`.
   */
  public import({
    module,
    ...importedItem
  }: ImportExportItemObject & {
    module: string;
  }): Pick<ImportExportItemObject, 'asType' | 'name'> {
    let moduleMap = this._imports.get(module);

    if (!moduleMap) {
      moduleMap = new Map<string, ImportExportItemObject>();
      this._imports.set(module, moduleMap);
    }

    const match = moduleMap.get(importedItem.name);
    if (match) {
      return {
        ...match,
        name: match.alias || match.name,
      };
    }

    moduleMap.set(importedItem.name, importedItem);
    return {
      ...importedItem,
      name: importedItem.alias || importedItem.name,
    };
  }

  public isEmpty() {
    return !this._items.length;
  }

  public nameWithoutExtension() {
    const { name } = splitNameAndExtension(this._name);
    return name;
  }

  public relativePathToFile({
    context,
    id,
  }: {
    context: IR.Context;
    id: string;
  }): string {
    let filePath = '';

    if (!id.startsWith('.')) {
      const file = context.file({ id });
      if (!file) {
        throw new Error(`File with id ${id} does not exist`);
      }

      filePath = file._path;
    } else {
      filePath = path.resolve(process.cwd(), id);
    }

    const thisPathParts = this._path.split(path.sep);
    const filePathParts = filePath.split(path.sep);

    let index = -1;
    let relativePath = '';
    for (const part of thisPathParts) {
      index += 1;
      if (filePathParts[index] !== part) {
        const pathArray = Array.from({
          length: thisPathParts.length - index,
        }).fill('');
        const relativePathToFile = filePathParts.slice(index);
        const relativeFolder = relativePathToFile.slice(
          0,
          relativePathToFile.length - 1,
        );
        if (relativeFolder.length) {
          relativeFolder.push('');
        }
        relativePath =
          (pathArray.join('../') || './') + relativeFolder.join('/');
        break;
      }
    }

    const fileName = filePathParts[filePathParts.length - 1]!;
    // TODO: parser - cache responses
    return `${relativePath}${splitNameAndExtension(fileName).name}`;
  }

  public remove(options?: Parameters<typeof fs.rmSync>[1]) {
    fs.rmSync(this._path, options);
  }

  /**
   * Removes last node form the stack. Works as undo.
   */
  public removeNode() {
    this._items = this._items.slice(0, this._items.length - 1);
  }

  private _setName(fileName: string) {
    if (fileName.includes('index')) {
      return fileName;
    }

    const { extension, name } = splitNameAndExtension(fileName);
    return [name, 'gen', extension].filter(Boolean).join('.');
  }

  public toString(separator: string = '\n') {
    let output: string[] = [];
    if (this._headers.length) {
      output.push(this._headers.join('\n'));
    }
    const importsStringArray: string[] = [];
    for (const [_module, moduleMap] of this._imports.entries()) {
      const imports = Array.from(moduleMap.values());
      const node = compiler.namedImportDeclarations({
        imports,
        module: _module,
      });
      importsStringArray.push(tsNodeToString({ node }));
    }
    if (importsStringArray.length) {
      output.push(importsStringArray.join('\n'));
    }
    output = output.concat(
      this._items.map((node) =>
        typeof node === 'string'
          ? node
          : tsNodeToString({ node, unescape: true }),
      ),
    );
    return output.join(separator);
  }

  public write(separator = '\n') {
    if (this.isEmpty()) {
      this.remove({ force: true });
      return;
    }

    let dir = this._path;
    if (typeof this._path === 'string') {
      const parts = this._path.split(path.sep);
      dir = parts.slice(0, parts.length - 1).join(path.sep);
    }
    ensureDirSync(dir);
    fs.writeFileSync(this._path, this.toString(separator));
  }
}

interface EnsureUniqueIdentifierData {
  $ref: string;
  case: StringCase | undefined;
  count?: number;
  create?: boolean;
  /**
   * Transforms name obtained from `$ref` before it's passed to `stringCase()`.
   */
  nameTransformer?: (name: string) => string;
  namespace: Namespace;
}

const ensureUniqueIdentifier = ({
  $ref,
  case: identifierCase,
  count = 1,
  create = false,
  nameTransformer,
  namespace,
}: EnsureUniqueIdentifierData): Identifier => {
  const parts = $ref.split('/');
  const name = parts[parts.length - 1] || '';

  if (!name) {
    return {
      created: false,
      name: '',
    };
  }

  const refValue = namespace[$ref];
  if (refValue) {
    return {
      created: false,
      name: refValue.name,
    };
  }

  const nameWithTransform = nameTransformer?.(name) ?? name;
  let nameWithCasing = stringCase({
    case: identifierCase,
    value: nameWithTransform,
  });

  if (count > 1) {
    nameWithCasing = `${nameWithCasing}${count}`;
  }

  let nameValue = namespace[nameWithCasing];
  if (nameValue) {
    if (nameValue.$ref === $ref) {
      return {
        created: false,
        name: nameValue.name,
      };
    }

    return ensureUniqueIdentifier({
      $ref,
      case: identifierCase,
      count: count + 1,
      create,
      nameTransformer,
      namespace,
    });
  }

  if (!create) {
    return {
      created: false,
      name: '',
    };
  }

  nameValue = {
    $ref,
    name: ensureValidIdentifier(nameWithCasing),
  };
  namespace[nameWithCasing] = nameValue;
  namespace[nameValue.$ref] = nameValue;

  return {
    created: true,
    name: nameValue.name,
  };
};

const splitNameAndExtension = (fileName: string) => {
  const match = fileName.match(/\.[0-9a-z]+$/i);
  const extension = match ? match[0].slice(1) : '';
  const name = fileName.slice(
    0,
    fileName.length - (extension ? extension.length + 1 : 0),
  );
  return { extension, name };
};
