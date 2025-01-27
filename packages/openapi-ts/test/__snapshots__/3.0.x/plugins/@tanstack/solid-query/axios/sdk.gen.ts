// This file is auto-generated by @hey-api/openapi-ts

import { type Options, formDataBodySerializer, urlSearchParamsBodySerializer } from '@hey-api/client-axios';
import type { ExportData, ImportData, ImportResponse, ApiVVersionODataControllerCountData, ApiVVersionODataControllerCountResponse, GetApiVbyApiVersionSimpleOperationData, GetApiVbyApiVersionSimpleOperationResponse, GetApiVbyApiVersionSimpleOperationError, DeleteCallWithoutParametersAndResponseData, GetCallWithoutParametersAndResponseData, HeadCallWithoutParametersAndResponseData, OptionsCallWithoutParametersAndResponseData, PatchCallWithoutParametersAndResponseData, PostCallWithoutParametersAndResponseData, PutCallWithoutParametersAndResponseData, DeleteFooData3, CallWithDescriptionsData, DeprecatedCallData, CallWithParametersData, CallWithWeirdParameterNamesData, GetCallWithOptionalParamData, PostCallWithOptionalParamData, PostCallWithOptionalParamResponse, PostApiVbyApiVersionRequestBodyData, PostApiVbyApiVersionFormDataData, CallWithDefaultParametersData, CallWithDefaultOptionalParametersData, CallToTestOrderOfParamsData, DuplicateNameData, DuplicateName2Data, DuplicateName3Data, DuplicateName4Data, CallWithNoContentResponseData, CallWithNoContentResponseResponse, CallWithResponseAndNoContentResponseData, CallWithResponseAndNoContentResponseResponse, DummyAData, DummyAResponse, DummyBData, DummyBResponse, CallWithResponseData, CallWithResponseResponse, CallWithDuplicateResponsesData, CallWithDuplicateResponsesResponse, CallWithDuplicateResponsesError, CallWithResponsesData, CallWithResponsesResponse, CallWithResponsesError, CollectionFormatData, TypesData, TypesResponse, UploadFileData, UploadFileResponse, FileResponseData, FileResponseResponse, ComplexTypesData, ComplexTypesResponse, MultipartResponseData, MultipartResponseResponse, MultipartRequestData, ComplexParamsData, ComplexParamsResponse, CallWithResultFromHeaderData, TestErrorCodeData, NonAsciiæøåÆøÅöôêÊ字符串Data, NonAsciiæøåÆøÅöôêÊ字符串Response, PutWithFormUrlEncodedData } from './types.gen';
import { client as _heyApiClient } from './client.gen';

export const export_ = <ThrowOnError extends boolean = false>(options?: Options<ExportData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/no-tag',
        ...options
    });
};

export const import_ = <ThrowOnError extends boolean = false>(options: Options<ImportData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).post<ImportResponse, unknown, ThrowOnError>({
        url: '/api/v{api-version}/no-tag',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

export const apiVVersionODataControllerCount = <ThrowOnError extends boolean = false>(options?: Options<ApiVVersionODataControllerCountData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<ApiVVersionODataControllerCountResponse, unknown, ThrowOnError>({
        url: '/api/v{api-version}/simple/$count',
        ...options
    });
};

export const getApiVbyApiVersionSimpleOperation = <ThrowOnError extends boolean = false>(options: Options<GetApiVbyApiVersionSimpleOperationData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<GetApiVbyApiVersionSimpleOperationResponse, GetApiVbyApiVersionSimpleOperationError, ThrowOnError>({
        url: '/api/v{api-version}/simple:operation',
        ...options
    });
};

export const deleteCallWithoutParametersAndResponse = <ThrowOnError extends boolean = false>(options?: Options<DeleteCallWithoutParametersAndResponseData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).delete<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/simple',
        ...options
    });
};

export const getCallWithoutParametersAndResponse = <ThrowOnError extends boolean = false>(options?: Options<GetCallWithoutParametersAndResponseData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/simple',
        ...options
    });
};

export const headCallWithoutParametersAndResponse = <ThrowOnError extends boolean = false>(options?: Options<HeadCallWithoutParametersAndResponseData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).head<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/simple',
        ...options
    });
};

export const optionsCallWithoutParametersAndResponse = <ThrowOnError extends boolean = false>(options?: Options<OptionsCallWithoutParametersAndResponseData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).options<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/simple',
        ...options
    });
};

export const patchCallWithoutParametersAndResponse = <ThrowOnError extends boolean = false>(options?: Options<PatchCallWithoutParametersAndResponseData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).patch<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/simple',
        ...options
    });
};

export const postCallWithoutParametersAndResponse = <ThrowOnError extends boolean = false>(options?: Options<PostCallWithoutParametersAndResponseData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).post<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/simple',
        ...options
    });
};

export const putCallWithoutParametersAndResponse = <ThrowOnError extends boolean = false>(options?: Options<PutCallWithoutParametersAndResponseData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).put<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/simple',
        ...options
    });
};

export const deleteFoo = <ThrowOnError extends boolean = false>(options: Options<DeleteFooData3, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).delete<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/foo/{foo_param}/bar/{BarParam}',
        ...options
    });
};

export const callWithDescriptions = <ThrowOnError extends boolean = false>(options?: Options<CallWithDescriptionsData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).post<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/descriptions',
        ...options
    });
};

/**
 * @deprecated
 */
export const deprecatedCall = <ThrowOnError extends boolean = false>(options: Options<DeprecatedCallData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).post<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/parameters/deprecated',
        ...options
    });
};

export const callWithParameters = <ThrowOnError extends boolean = false>(options: Options<CallWithParametersData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).post<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/parameters/{parameterPath}',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

export const callWithWeirdParameterNames = <ThrowOnError extends boolean = false>(options: Options<CallWithWeirdParameterNamesData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).post<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/parameters/{parameter.path.1}/{parameter-path-2}/{PARAMETER-PATH-3}',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

export const getCallWithOptionalParam = <ThrowOnError extends boolean = false>(options: Options<GetCallWithOptionalParamData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/parameters',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

export const postCallWithOptionalParam = <ThrowOnError extends boolean = false>(options: Options<PostCallWithOptionalParamData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).post<PostCallWithOptionalParamResponse, unknown, ThrowOnError>({
        url: '/api/v{api-version}/parameters',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

export const postApiVbyApiVersionRequestBody = <ThrowOnError extends boolean = false>(options?: Options<PostApiVbyApiVersionRequestBodyData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).post<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/requestBody',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

export const postApiVbyApiVersionFormData = <ThrowOnError extends boolean = false>(options?: Options<PostApiVbyApiVersionFormDataData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).post<unknown, unknown, ThrowOnError>({
        ...formDataBodySerializer,
        url: '/api/v{api-version}/formData',
        ...options,
        headers: {
            'Content-Type': null,
            ...options?.headers
        }
    });
};

export const callWithDefaultParameters = <ThrowOnError extends boolean = false>(options?: Options<CallWithDefaultParametersData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/defaults',
        ...options
    });
};

export const callWithDefaultOptionalParameters = <ThrowOnError extends boolean = false>(options?: Options<CallWithDefaultOptionalParametersData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).post<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/defaults',
        ...options
    });
};

export const callToTestOrderOfParams = <ThrowOnError extends boolean = false>(options: Options<CallToTestOrderOfParamsData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).put<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/defaults',
        ...options
    });
};

export const duplicateName = <ThrowOnError extends boolean = false>(options?: Options<DuplicateNameData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).delete<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/duplicate',
        ...options
    });
};

export const duplicateName2 = <ThrowOnError extends boolean = false>(options?: Options<DuplicateName2Data, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/duplicate',
        ...options
    });
};

export const duplicateName3 = <ThrowOnError extends boolean = false>(options?: Options<DuplicateName3Data, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).post<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/duplicate',
        ...options
    });
};

export const duplicateName4 = <ThrowOnError extends boolean = false>(options?: Options<DuplicateName4Data, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).put<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/duplicate',
        ...options
    });
};

export const callWithNoContentResponse = <ThrowOnError extends boolean = false>(options?: Options<CallWithNoContentResponseData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<CallWithNoContentResponseResponse, unknown, ThrowOnError>({
        url: '/api/v{api-version}/no-content',
        ...options
    });
};

export const callWithResponseAndNoContentResponse = <ThrowOnError extends boolean = false>(options?: Options<CallWithResponseAndNoContentResponseData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<CallWithResponseAndNoContentResponseResponse, unknown, ThrowOnError>({
        url: '/api/v{api-version}/multiple-tags/response-and-no-content',
        ...options
    });
};

export const dummyA = <ThrowOnError extends boolean = false>(options?: Options<DummyAData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<DummyAResponse, unknown, ThrowOnError>({
        url: '/api/v{api-version}/multiple-tags/a',
        ...options
    });
};

export const dummyB = <ThrowOnError extends boolean = false>(options?: Options<DummyBData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<DummyBResponse, unknown, ThrowOnError>({
        url: '/api/v{api-version}/multiple-tags/b',
        ...options
    });
};

export const callWithResponse = <ThrowOnError extends boolean = false>(options?: Options<CallWithResponseData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<CallWithResponseResponse, unknown, ThrowOnError>({
        url: '/api/v{api-version}/response',
        ...options
    });
};

export const callWithDuplicateResponses = <ThrowOnError extends boolean = false>(options?: Options<CallWithDuplicateResponsesData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).post<CallWithDuplicateResponsesResponse, CallWithDuplicateResponsesError, ThrowOnError>({
        url: '/api/v{api-version}/response',
        ...options
    });
};

export const callWithResponses = <ThrowOnError extends boolean = false>(options?: Options<CallWithResponsesData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).put<CallWithResponsesResponse, CallWithResponsesError, ThrowOnError>({
        url: '/api/v{api-version}/response',
        ...options
    });
};

export const collectionFormat = <ThrowOnError extends boolean = false>(options: Options<CollectionFormatData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/collectionFormat',
        ...options
    });
};

export const types = <ThrowOnError extends boolean = false>(options: Options<TypesData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<TypesResponse, unknown, ThrowOnError>({
        url: '/api/v{api-version}/types',
        ...options
    });
};

export const uploadFile = <ThrowOnError extends boolean = false>(options: Options<UploadFileData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).post<UploadFileResponse, unknown, ThrowOnError>({
        ...urlSearchParamsBodySerializer,
        url: '/api/v{api-version}/upload',
        ...options,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...options?.headers
        }
    });
};

export const fileResponse = <ThrowOnError extends boolean = false>(options: Options<FileResponseData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<FileResponseResponse, unknown, ThrowOnError>({
        responseType: 'blob',
        url: '/api/v{api-version}/file/{id}',
        ...options
    });
};

export const complexTypes = <ThrowOnError extends boolean = false>(options: Options<ComplexTypesData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<ComplexTypesResponse, unknown, ThrowOnError>({
        url: '/api/v{api-version}/complex',
        ...options
    });
};

export const multipartResponse = <ThrowOnError extends boolean = false>(options?: Options<MultipartResponseData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).get<MultipartResponseResponse, unknown, ThrowOnError>({
        url: '/api/v{api-version}/multipart',
        ...options
    });
};

export const multipartRequest = <ThrowOnError extends boolean = false>(options?: Options<MultipartRequestData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).post<unknown, unknown, ThrowOnError>({
        ...formDataBodySerializer,
        url: '/api/v{api-version}/multipart',
        ...options,
        headers: {
            'Content-Type': null,
            ...options?.headers
        }
    });
};

export const complexParams = <ThrowOnError extends boolean = false>(options: Options<ComplexParamsData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).put<ComplexParamsResponse, unknown, ThrowOnError>({
        url: '/api/v{api-version}/complex/{id}',
        ...options,
        headers: {
            'Content-Type': 'application/json-patch+json',
            ...options?.headers
        }
    });
};

export const callWithResultFromHeader = <ThrowOnError extends boolean = false>(options?: Options<CallWithResultFromHeaderData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).post<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/header',
        ...options
    });
};

export const testErrorCode = <ThrowOnError extends boolean = false>(options: Options<TestErrorCodeData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).post<unknown, unknown, ThrowOnError>({
        url: '/api/v{api-version}/error',
        ...options
    });
};

export const nonAsciiæøåÆøÅöôêÊ字符串 = <ThrowOnError extends boolean = false>(options: Options<NonAsciiæøåÆøÅöôêÊ字符串Data, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).post<NonAsciiæøåÆøÅöôêÊ字符串Response, unknown, ThrowOnError>({
        url: '/api/v{api-version}/non-ascii-æøåÆØÅöôêÊ字符串',
        ...options
    });
};

/**
 * Login User
 */
export const putWithFormUrlEncoded = <ThrowOnError extends boolean = false>(options: Options<PutWithFormUrlEncodedData, ThrowOnError>) => {
    return (options?.client ?? _heyApiClient).put<unknown, unknown, ThrowOnError>({
        ...urlSearchParamsBodySerializer,
        url: '/api/v{api-version}/non-ascii-æøåÆØÅöôêÊ字符串',
        ...options,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...options?.headers
        }
    });
};