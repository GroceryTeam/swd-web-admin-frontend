import axiosClient from 'api/apiClient'

export const getUsers = async () => {
  return axiosClient.get('/users').then((res) => res?.data?.data as any)
}
