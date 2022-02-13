import axiosClient from 'api/apiClient'

export const loginApi = async ({ username = "Admin", password = "123"}: {username?: string; password?: string}) => {
  return axiosClient.post('/login', { username, password }).then((res) => res?.data?.token as string)
}
