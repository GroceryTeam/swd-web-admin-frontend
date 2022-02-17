import { PaginationResponse } from './pagination'

export interface User {
  id: number
  username: string
  email: string
  phone: string
  name: string
  status: number
}
export interface UserResponse extends PaginationResponse {
  data: User[]
}

export interface LoginProps {
  username: string
  password: string
}
