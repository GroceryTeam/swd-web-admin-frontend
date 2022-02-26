import axios from 'axios'
import { getToken } from 'utils/helpers'

const baseURL = process.env.REACT_APP_API

const axiosClient = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default axiosClient

axiosClient.interceptors.request.use((config) => {
  const token = getToken()
  if (token && config?.headers) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
})

axiosClient.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    throw error
  }
)
