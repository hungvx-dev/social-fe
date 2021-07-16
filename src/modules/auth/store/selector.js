import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

export const makeGetErrorsLogin = () => {
  const stateSelect = createSelector(
    state => state.auth,
    auth => auth.errors.login
  )

  return useSelector(stateSelect)
}

export const makeGetErrorsSignUp = () => {
  const stateSelect = createSelector(
    state => state.auth,
    auth => auth.errors.signUp
  )

  return useSelector(stateSelect)
}

export const makeGetProcessing = key => {
  const stateSelect = createSelector(
    state => state.auth,
    auth => auth.processing[key]
  )

  return useSelector(stateSelect)
}

export const makeGetMe = () => {
  const stateSelect = createSelector(
    state => state.auth,
    auth => auth.user
  )

  return useSelector(stateSelect)
}

export const makeGetIsAuthenticated = () => {
  const stateSelect = createSelector(
    state => state.auth,
    auth => auth.isAuthenticate
  )

  return useSelector(stateSelect)
}
