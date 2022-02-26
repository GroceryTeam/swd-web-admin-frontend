import { createSlice } from '@reduxjs/toolkit'
import { PaginationResponse } from 'entities/pagination'
import { CustomerStore } from 'entities/store'
import { fetchStoresAsyncThunk, approveStoreAsyncThunk } from './storeThunk'

interface CustomerStoreState {
  storeList?: CustomerStore[]
  pagination?: PaginationResponse
  isIndexPageChange: boolean
  loading: boolean
  loadingApprove: boolean
}

const initialState = {
  storeList: undefined,
  pagination: undefined,
  isIndexPageChange: false,
  loading: false,
  loadingApprove: false,
} as CustomerStoreState

export const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    changePageIndex: (state, action) => {
      if (!state?.pagination) return
      state.isIndexPageChange = true
      state.pagination = { ...state.pagination, pageIndex: action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoresAsyncThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchStoresAsyncThunk.fulfilled, (state, action) => {
        const { data, ...pagination } = action.payload
        state.storeList = data
        state.pagination = pagination
        state.loading = false
        state.isIndexPageChange = false
      })
      .addCase(approveStoreAsyncThunk.pending, (state) => {
        state.loadingApprove = true
      })
      .addCase(approveStoreAsyncThunk.fulfilled, (state) => {
        state.loadingApprove = false
      })
  },
})

export const { changePageIndex } = storesSlice.actions

export default storesSlice.reducer
