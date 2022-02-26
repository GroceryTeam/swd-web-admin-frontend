import { StoreApproveStatus } from 'utils/constants'
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
  name: string
  address: string
  approvedStatus: number
}

export interface CustomerStoreResponse extends PaginationResponse {
  data: CustomerStore[]
}
