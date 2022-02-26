import { createSlice } from '@reduxjs/toolkit'
import { User } from 'entities/user'
import { getToken } from 'utils/helpers'
import { login, signOut } from './authThunk'

interface LoginState {
  token?: string
  user?: User
  loading: boolean
  loginError: boolean
  isAuthenticated: boolean
}

const initialState = {
  token: getToken(),
  loading: false,
  loginError: false,
  isAuthenticated: !!getToken(),
} as LoginState

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearLoginError: (state) => {
      state.loginError = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.loginError = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload
        state.loading = false
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state) => {
        state.loading = false
        state.isAuthenticated = false
        state.loginError = true
      })

      .addCase(signOut.pending, (state) => {
        state.loading = false
        state.isAuthenticated = false
        state.token = undefined
      })
  },
})

export const { clearLoginError } = authSlice.actions

export default authSlice.reducer
