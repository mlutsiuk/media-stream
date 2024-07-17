const refreshToken = async () => {
  if (!useAuthStore().accessToken)
    return false

  if (useAuthStore().refreshToken === null) {
    useAuthStore().logout()

    return false
  }
  else {
    return await $fetch<{ access_token: string, token_type: string }>('/api/frontend/user/refresh_token', {
      baseURL: useRuntimeConfig().public.apiBase,
      method: 'POST',
      body: {
        refresh_token: useAuthStore().refreshToken,
        token_type: 'bearer'
      }
    }).then((data) => {
      useAuthStore().saveTokens({
        accessToken: data.access_token
      })

      return true
    }).catch(() => {
      useAuthStore().logout()

      return false
    })
  }
}

export function createApiFetch() {
  return $fetch.create({
    baseURL: useRuntimeConfig().public.apiBase,
    retryStatusCodes: [401],
    retry: 1,

    onRequest({ options }) {
      if (useAuthStore().accessToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${useAuthStore().accessToken}`
        }
      }
    },

    async onResponseError({ response }) {
      if (response.status === 401)
        await refreshToken()
    }
  })
}

export function createUnauthenticatedApiFetch() {
  return $fetch.create({
    baseURL: useRuntimeConfig().public.apiBase
  })
}

type ApiXhrOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  url: string
  body?: XMLHttpRequestBodyInit
  onProgress?: (event: ProgressEvent) => void
  signal?: AbortSignal
  headers?: Record<string, string>
}

class XhrError extends Error {
  status: number
  data: unknown

  constructor(data: { status: number, data: unknown }) {
    super(`Request failed with status ${data.status}`)
    this.status = data.status
    this.data = data.data
  }
}

function xhrRequest<ResponseT = unknown>(options: ApiXhrOptions) {
  return new Promise<ResponseT>((resolve, reject) => {
    const {
      method = 'GET',
      url,
      onProgress,
      signal,
      headers,
      body
    } = options

    const request = new XMLHttpRequest()

    if (onProgress)
      request.upload.onprogress = e => onProgress(e)

    if (signal)
      signal.onabort = () => request.abort()

    request.open(method, url, true)

    if (headers) {
      for (const [key, value] of Object.entries(headers))
        request.setRequestHeader(key, value)
    }

    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        resolve(JSON.parse(request.responseText))
      }
      else {
        reject(new XhrError({
          data: JSON.parse(request.responseText),
          status: request.status
        }))
      }
    }

    if (body)
      request.send(body)
    else
      request.send()
  })
}

export function createApiXhr() {
  return async <ResponseT>(options: ApiXhrOptions) => {
    const { url, headers, ...rest } = options

    const makeRequest = async () => xhrRequest<ResponseT>({
      url: `${useRuntimeConfig().public.apiBase}${url}`,
      headers: {
        Authorization: `Bearer ${useAuthStore().accessToken}`,
        ...headers
      },
      ...rest
    })

    try {
      return await makeRequest()
    }
    catch (error) {
      if (error instanceof XhrError && error.status === 401) {
        if (await refreshToken())
          return await makeRequest()
        else
          throw error
      }
      else {
        throw error
      }
    }
  }
}
