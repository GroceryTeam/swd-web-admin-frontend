import { User } from './user'
import { PaginationResponse } from './pagination'
import { BrandStatus } from 'utils/constants'

export interface BrandRequest {
  userId?: int
  searchTerm?: string
  status?: BrandStatus
  pageIndex?: number
  pageSize?: number
}

export interface UpdateBrandStatusRequest {
  brandId: number
  status: BrandStatus
}

export interface Brand {
  id: number
  name: string
  status: number
  userList: User[]
  storeList?: any
}

export interface BrandResponse extends PaginationResponse {
  data: Brand[]
}
