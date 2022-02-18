import { createSlice } from '@reduxjs/toolkit'
import { PaginationResponse } from 'entities/pagination'
import { User } from 'entities/user'
import { fetchUsers } from './userThunk'

interface UserState {
  users?: User[]
  pagination?: PaginationResponse
  loading: boolean
  searchTerm?: string
}

const initialState = {
  users: undefined,
  pagination: undefined,
  loading: false,
  searchTerm: '',
} as UserState

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchTermAction: (state, action) => {
      state.searchTerm = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const { data, ...pagination } = action.payload
        state.users = data
        state.pagination = pagination
        state.loading = false
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { setSearchTermAction } = userSlice.actions

export default userSlice.reducer
