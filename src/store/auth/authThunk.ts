import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginApi } from 'api/authApi'
import { LoginProps } from 'entities/user'
import { removeToken, setToken } from 'utils/helpers'
import history from 'utils/history'

export const login = createAsyncThunk('auth/login', async (payload: LoginProps) => {
  const response = await loginApi(payload)
  setToken(response)
  history.push('/dashboard')
  return response
})

export const signOut = createAsyncThunk('auth/signOut', async () => {
  removeToken()
})
