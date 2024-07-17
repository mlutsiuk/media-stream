import type { FetchError } from 'ofetch'

export const isFetchError = (error: unknown): error is FetchError => {
  return error instanceof Error && error.name === 'FetchError'
}

export const isAbortError = (error: unknown): error is Error => {
  return error instanceof DOMException && error.name === 'AbortError'
}

export const handleErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (isFetchError(error) && error.response?.status === 400) {
    useToast().add({
      title: 'Error',
      description: error.response._data.detail
    })
  }
  else {
    useToast().add({
      title: 'Error',
      description: fallbackMessage
    })
  }
}
