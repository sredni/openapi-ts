import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import type { Client } from '../../client/interfaces/Client';
import type { Config } from '../../node';
import { getHttpRequestName } from '../getHttpRequestName';
import type { Templates } from '../registerHandlebarTemplates';

/**
 * Generate OpenAPI core files, this includes the basic boilerplate code to handle requests.
 * @param client Client containing models, schemas, and services
 * @param templates The loaded handlebar templates
 * @param outputPath Directory to write the generated files to
 * @param options Options passed to the `generate()` function
 */
export const writeClientCore = async (
    client: Client,
    templates: Templates,
    outputPath: string,
    options: Pick<Required<Config>, 'client' | 'serviceResponse'> & Omit<Config, 'client' | 'serviceResponse'>
): Promise<void> => {
    const context = {
        httpRequest: getHttpRequestName(options.client),
        server: options.base !== undefined ? options.base : client.server,
        version: client.version,
    };

    await writeFileSync(
        path.resolve(outputPath, 'OpenAPI.ts'),
        templates.core.settings({
            $config: options,
            ...context,
        })
    );
    await writeFileSync(
        path.resolve(outputPath, 'ApiError.ts'),
        templates.core.apiError({
            $config: options,
            ...context,
        })
    );
    await writeFileSync(
        path.resolve(outputPath, 'ApiRequestOptions.ts'),
        templates.core.apiRequestOptions({
            $config: options,
            ...context,
        })
    );
    await writeFileSync(
        path.resolve(outputPath, 'ApiResult.ts'),
        templates.core.apiResult({
            $config: options,
            ...context,
        })
    );
    await writeFileSync(
        path.resolve(outputPath, 'CancelablePromise.ts'),
        templates.core.cancelablePromise({
            $config: options,
            ...context,
        })
    );
    await writeFileSync(
        path.resolve(outputPath, 'request.ts'),
        templates.core.request({
            $config: options,
            ...context,
        })
    );
    await writeFileSync(
        path.resolve(outputPath, 'types.ts'),
        templates.core.types({
            $config: options,
            ...context,
        })
    );

    if (options.clientName) {
        await writeFileSync(
            path.resolve(outputPath, 'BaseHttpRequest.ts'),
            templates.core.baseHttpRequest({
                $config: options,
                ...context,
            })
        );
        await writeFileSync(
            path.resolve(outputPath, `${context.httpRequest}.ts`),
            templates.core.httpRequest({
                $config: options,
                ...context,
            })
        );
    }

    if (options.request) {
        const requestFile = path.resolve(process.cwd(), options.request);
        const requestFileExists = await existsSync(requestFile);
        if (!requestFileExists) {
            throw new Error(`Custom request file "${requestFile}" does not exists`);
        }
        await copyFileSync(requestFile, path.resolve(outputPath, 'request.ts'));
    }
};
