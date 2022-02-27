import { StoreApproveStatus } from 'utils/constants'
import { Brand } from './brand'
import { PaginationResponse } from './pagination'

export interface CustomerStoreRequest {
  searchTerm?: string
  brandId?: number
  approveStatus?: StoreApproveStatus
  pageIndex?: number
  pageSize?: number
}

export interface ApproveStoreRequest {
  storeId: number
  status: StoreApproveStatus
}
export interface CustomerStore {
  id: number
  brandId: number
  brandName: string
  brand: Brand
  name: string
  address: string
  approvedStatus: number
}

export interface CustomerStoreResponse extends PaginationResponse {
  data: CustomerStore[]
}
