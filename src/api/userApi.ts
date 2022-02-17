import axiosClient from 'api/apiClient'
import { UserResponse } from 'entities/user'

export const getUsers = async ({
  current,
  pageSize,
  searchTerm = '',
}: {
  searchTerm?: string
  current?: number
  pageSize?: number
}) => {
  return axiosClient
    .get(
      `/users?search-term=${searchTerm}${current ? `&page-index=${current}` : ''}${
        pageSize ? `&page-size=${pageSize}` : ''
      }`
    )
    .then((res) => res?.data as UserResponse)
}
