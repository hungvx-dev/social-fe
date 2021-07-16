import { TOKEN_STORAGE_KEY } from '@/_constants/common'

export const setAuthToken = (token, persist) =>
  persist ? localStorage.setItem(TOKEN_STORAGE_KEY, token) : sessionStorage.setItem(TOKEN_STORAGE_KEY, token)

export const getAuthToken = () => localStorage.getItem(TOKEN_STORAGE_KEY) || sessionStorage.getItem(TOKEN_STORAGE_KEY)

export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY)
  sessionStorage.removeItem(TOKEN_STORAGE_KEY)
}

export const setStorage = (key, value) => localStorage.setItem(key, value)
export const getStorage = key => localStorage.getItem(key)
export const removeStorage = key => localStorage.removeItem(key)
