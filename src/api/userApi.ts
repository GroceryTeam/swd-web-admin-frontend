import axiosClient from 'api/apiClient'
import { UserResponse } from 'entities/user'

export const getUsers = async ({ searchTerm = '' }: { searchTerm?: string }) => {
  return axiosClient.get(`/users?search-term=${searchTerm}`).then((res) => res?.data as UserResponse)
}
