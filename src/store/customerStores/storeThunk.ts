import { createAsyncThunk } from '@reduxjs/toolkit'
import { approveStoreApi, getStoresApi } from 'api/customerStoreApi'
import { ApproveStoreRequest, CustomerStoreRequest } from 'entities/store'

export const fetchStoresAsyncThunk = createAsyncThunk('stores/fetchStores', async (payload: CustomerStoreRequest) => {
  const response = await getStoresApi(payload)
  return response
})

export const approveStoreAsyncThunk = createAsyncThunk('stores/approveStore', async (payload: ApproveStoreRequest) => {
  const response = await approveStoreApi(payload)
  return response
})
