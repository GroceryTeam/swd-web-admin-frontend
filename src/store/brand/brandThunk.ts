import { createAsyncThunk } from '@reduxjs/toolkit'
import { getBrandApi, updateStatusBrandApi } from 'api/brandApi'
import { BrandRequest, UpdateBrandStatusRequest } from 'entities/brand'

export const fetchBrandsAsyncThunk = createAsyncThunk('brands/fetchBrands', async (payload: BrandRequest) => {
  const response = await getBrandApi(payload)
  return response
})

export const updateBrandAsyncThunk = createAsyncThunk(
  'brands/updateBrand',
  async (payload: UpdateBrandStatusRequest) => {
    const response = await updateStatusBrandApi(payload)
    return response
  }
)
