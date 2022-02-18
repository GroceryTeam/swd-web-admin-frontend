import axiosClient from 'api/apiClient'
import { UserResponse, UsersRequest } from 'entities/user'

export const fetchUsersApi = async ({ pageIndex, pageSize, searchTerm = '' }: UsersRequest) => {
  return axiosClient
    .get(
      `/users?search-term=${searchTerm}${pageIndex ? `&page-index=${pageIndex}` : ''}${
        pageSize ? `&page-size=${pageSize}` : ''
      }`
    )
    .then((res) => res?.data as UserResponse)
}
