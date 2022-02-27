import { createSlice } from '@reduxjs/toolkit'
import { PaginationResponse } from 'entities/pagination'
import { CustomerStore } from 'entities/store'
import { StoreApproveStatus } from 'utils/constants'
import { fetchStoresAsyncThunk, approveStoreAsyncThunk } from './storeThunk'

interface CustomerStoreState {
  storeList?: CustomerStore[]
  pagination?: PaginationResponse
  isIndexPageChange: boolean
  loading: boolean
  loadingApprove: boolean
  approveSuccess: boolean
  approveStatus?: StoreApproveStatus
}

const initialState = {
  storeList: undefined,
  pagination: undefined,
  isIndexPageChange: false,
  loading: false,
  loadingApprove: false,
  approveSuccess: false,
  approveStatus: undefined,
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
    resetApproveSuccess: (state) => {
      state.approveSuccess = false
    },
    setApproveStatus: (state, action) => {
      state.approveStatus = action.payload
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
        state.approveSuccess = true
      })
  },
})

export const { changePageIndex, resetApproveSuccess, setApproveStatus } = storesSlice.actions

export default storesSlice.reducer
