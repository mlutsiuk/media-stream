import type { FetchOptions } from 'ofetch'
import type { Prettify } from '~/types/utils'

type CroppedFetchOptions = Omit<
  FetchOptions,
  | 'body' | 'baseURL' | 'method'
  | 'retry' | 'retryDelay' | 'retryStatusCodes' | 'onRequest' | 'onRequestError' | 'onResponse' | 'onResponseError' | 'params'
>

type _EndpointOptions<TBody, TUrl> =
  (TBody extends undefined
    // eslint-disable-next-line ts/ban-types
    ? {}
    : { body: TBody }
  ) & (TUrl extends undefined
    // eslint-disable-next-line ts/ban-types
    ? {}
    : { url: TUrl }
  ) & CroppedFetchOptions

export type EndpointOptions<TBody = undefined, TUrl = undefined> = Prettify<_EndpointOptions<TBody, TUrl>>

type ServicePayload = {
  $api: ReturnType<typeof createApiFetch>
  $apiUnauthenticated: ReturnType<typeof createUnauthenticatedApiFetch>
}

export const createService = <T>(setup: (payload: ServicePayload) => T) => {
  return () => setup({
    $api: createApiFetch(),
    $apiUnauthenticated: createUnauthenticatedApiFetch()
  })
}
