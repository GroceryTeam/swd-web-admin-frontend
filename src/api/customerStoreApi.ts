import axiosClient from 'api/apiClient'
import { ApproveStoreRequest, CustomerStoreRequest, CustomerStoreResponse } from 'entities/store'

export const getStoresApi = async ({
  searchTerm,
  brandId,
  approveStatus,
  pageIndex,
  pageSize,
}: CustomerStoreRequest) => {
  return axiosClient
    .get('/stores', {
      params: {
        'search-term': searchTerm,
        'brand-id': brandId,
        'approve-status': approveStatus,
        'page-index': pageIndex,
        'page-size': pageSize,
      },
    })
    .then((res) => res?.data as CustomerStoreResponse)
}

export const approveStoreApi = async ({ storeId, status }: ApproveStoreRequest) => {
  return axiosClient.put(`/stores/${storeId}/status`, {
    params: {
      status,
    },
  })
}
