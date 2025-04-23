import { redirect } from 'next/navigation'
import axios from 'axios'
import getAccessToken from '../auth'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const axiosInstance = axios.create({
  baseURL: BASE_URL
})

axiosInstance.interceptors.request.use(
  config => {
    try {
      const newToken = getAccessToken()

      if (newToken) {
        config.headers.token = newToken
      }
    } catch (error) {
      console.error('Error updating request with new token:', error)
    }

    return config
  },
  error => {
    console.error('Request error:', error)

    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const { response } = error

    if (response && (response.status === 401 || response.status === 403)) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login' // Client-side redirection
      } else {
        redirect('/login') // Server-side redirection
      }
    }

    return Promise.reject(error)
  }
)
