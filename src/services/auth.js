import http from '../helpers/axios'

const path = '/auth'

export const login = ({ username, password }) =>
  http.post(`${path}/login`, { username, password })

export const register = ({ username, fullName, password, passwordConfirm }) =>
  http.post(`${path}/register`, {
    username,
    fullName,
    password,
    passwordConfirm,
  })
