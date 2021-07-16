import axios from 'axios'

const instance = axios.create()
const url = `${process.env.API_URL}/api/${process.env.VERSION}`
const pathsNotAuthenticated = ['/signup']

instance.defaults.baseURL = url
// instance.defaults.headers['Content-Type'] = 'multipart/form-data'

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token')
    if (token) config.headers.authorization = `Bearer ${token}`

    if (config.method === 'post' && pathsNotAuthenticated.some(pathUrl => pathUrl === config.url))
      delete config.headers.authorization

    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error.response && error.response.data)
)

export default instance
