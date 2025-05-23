// This file is auto-generated by @hey-api/openapi-ts

export type PostFooData = {
    body?: never;
    path?: never;
    query?: {
        foo?: Array<string>;
    };
    url: '/foo';
};

export type PostFooResponses = {
    /**
     * OK
     */
    default: unknown;
};

export type ClientOptions = {
    baseURL: `${string}://${string}` | (string & {});
};