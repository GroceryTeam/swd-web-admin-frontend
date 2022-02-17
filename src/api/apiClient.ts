import axios from 'axios'

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
  const token = localStorage.getItem('token')
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
