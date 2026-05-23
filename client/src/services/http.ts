import axios from 'axios'

const DEFAULT_API_BASE_URL = 'https://dummyjson.com'
const REQUEST_TIMEOUT_MS = 10_000

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error)
    }

    if (error.code === 'ECONNABORTED') {
      error.message = 'The products service took too long to respond. Please try again.'
      return Promise.reject(error)
    }

    if (!error.response) {
      error.message =
        'Unable to reach the products service. Check your connection and try again.'
      return Promise.reject(error)
    }

    const apiMessage = getApiErrorMessage(error.response.data)

    error.message =
      apiMessage || `The products service returned status ${error.response.status}.`

    return Promise.reject(error)
  },
)

function getApiErrorMessage(data: unknown) {
  if (!data || typeof data !== 'object') {
    return ''
  }

  const message =
    'message' in data && typeof data.message === 'string' ? data.message : ''

  return message.trim()
}
