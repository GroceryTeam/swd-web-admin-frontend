import { createSlice } from '@reduxjs/toolkit'
import { PaginationResponse } from 'entities/pagination'
import { Brand } from 'entities/brand'
import { BrandStatus } from 'utils/constants'
import { fetchBrandsAsyncThunk, updateBrandAsyncThunk } from './brandThunk'

interface BrandState {
  brandList?: Brand[]
  pagination?: PaginationResponse
  isIndexPageChange: boolean
  loading: boolean
  loadingUpdate: boolean
  updateSuccess: boolean
  updateStatus?: BrandStatus
}

const initialState = {
  brandList: undefined,
  pagination: undefined,
  isIndexPageChange: false,
  loading: false,
  loadingUpdate: false,
  updateSuccess: false,
  updateStatus: undefined,
} as BrandState

export const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    changePageIndex: (state, action) => {
      if (!state?.pagination) return
      state.isIndexPageChange = true
      state.pagination = { ...state.pagination, pageIndex: action.payload }
    },
    resetUpdateSuccess: (state) => {
      state.updateSuccess = false
    },
    setUpdateStatus: (state, action) => {
      state.updateStatus = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandsAsyncThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchBrandsAsyncThunk.fulfilled, (state, action) => {
        const { data, ...pagination } = action.payload
        state.brandList = data
        state.pagination = pagination
        state.loading = false
        state.isIndexPageChange = false
      })
      .addCase(updateBrandAsyncThunk.pending, (state) => {
        state.loadingUpdate = true
      })
      .addCase(updateBrandAsyncThunk.fulfilled, (state) => {
        state.loadingUpdate = false
        state.updateSuccess = true
      })
  },
})

export const { changePageIndex, resetUpdateSuccess, setUpdateStatus } = brandsSlice.actions

export default brandsSlice.reducer
