import axiosClient from 'api/apiClient'
import { Brand, BrandRequest, BrandResponse, UpdateBrandStatusRequest } from 'entities/brand'

export const getBrandApi = async ({ userId, searchTerm, status, pageIndex, pageSize }: BrandRequest) => {
  return axiosClient
    .get('/brands', {
      params: {
        'user-id': userId,
        'search-term': searchTerm,
        status: status,
        'page-index': pageIndex,
        'page-size': pageSize,
      },
    })
    .then((res) => res?.data as BrandResponse)
}

export const updateStatusBrandApi = async ({ brandId, status }: UpdateBrandStatusRequest) => {
  return axiosClient.put(`/brands/${brandId}/enable`, {
    status,
  })
}

export const getBrandByBrandIdApi = async ({ brandId }: { brandId: number }) => {
  return axiosClient.get(`/brands/${brandId}`).then((res) => res?.data as Brand)
}
