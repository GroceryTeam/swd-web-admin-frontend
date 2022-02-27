import { User } from './user'

export interface Brand {
  id: number
  name: string
  status: number
  userList: User[]
  storeList?: any
}
