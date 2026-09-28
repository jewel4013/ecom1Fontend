import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'Accept': 'application/json',
  },

})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default http