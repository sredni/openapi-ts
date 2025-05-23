// This file is auto-generated by @hey-api/openapi-ts

import { type Options, create } from '../sdk.gen';
import { queryOptions, type UseMutationOptions, type DefaultError } from '@tanstack/react-query';
import type { CreateData } from '../types.gen';
import { client as _heyApiClient } from '../client.gen';

export type QueryKey<TOptions extends Options> = [
    Pick<TOptions, 'baseUrl' | 'body' | 'headers' | 'path' | 'query'> & {
        _id: string;
        _infinite?: boolean;
    }
];

const createQueryKey = <TOptions extends Options>(id: string, options?: TOptions, infinite?: boolean): [
    QueryKey<TOptions>[0]
] => {
    const params: QueryKey<TOptions>[0] = { _id: id, baseUrl: (options?.client ?? _heyApiClient).getConfig().baseUrl } as QueryKey<TOptions>[0];
    if (infinite) {
        params._infinite = infinite;
    }
    if (options?.body) {
        params.body = options.body;
    }
    if (options?.headers) {
        params.headers = options.headers;
    }
    if (options?.path) {
        params.path = options.path;
    }
    if (options?.query) {
        params.query = options.query;
    }
    return [
        params
    ];
};

export const createQueryKey2 = (options?: Options<CreateData>) => createQueryKey('create', options);

export const createOptions = (options?: Options<CreateData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await create({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: createQueryKey2(options)
    });
};

export const createMutation = (options?: Partial<Options<CreateData>>): UseMutationOptions<unknown, DefaultError, Options<CreateData>> => {
    const mutationOptions: UseMutationOptions<unknown, DefaultError, Options<CreateData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await create({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};