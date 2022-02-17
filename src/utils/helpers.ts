import { TOKEN_KEY } from './constants'

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export const setToken = (val: string) => {
  localStorage.setItem(TOKEN_KEY, val)
}
