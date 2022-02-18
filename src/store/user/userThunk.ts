import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUsersApi } from 'api/userApi'
import { UsersRequest } from 'entities/user'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (payload: UsersRequest) => {
  const response = await fetchUsersApi(payload)
  return response
})
