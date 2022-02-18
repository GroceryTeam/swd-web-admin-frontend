import { createSlice } from '@reduxjs/toolkit'
import { login, signOut } from './authThunk'

interface LoginState {
  token: string | null
  loading: boolean
}

const initialState = {
  token: null,
  loading: false,
} as LoginState

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        const token = action.payload
        state.token = token
        state.loading = false
      })
      .addCase(login.rejected, (state) => {
        state.loading = false
      })
      .addCase(signOut.pending, (state) => {
        state.loading = false
        state.token = null
      })
  },
})

// export const {  } = authSlice.actions

export default authSlice.reducer
