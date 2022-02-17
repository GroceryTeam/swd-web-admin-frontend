import axiosClient from 'api/apiClient'
import { LoginProps } from 'entities/user'

export const loginApi = async ({ username = 'Admin', password = '123' }: LoginProps) => {
  return axiosClient.post('/login', { username, password }).then((res) => res?.data?.token as string)
}
