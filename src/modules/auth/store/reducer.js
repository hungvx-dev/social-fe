import produce from 'immer'
import * as types from './action_types'

const initialState = {
  user: {},
  isAuthenticate: false,
  processing: {
    login: true,
    password: true,
  },
  errors: {
    login: {
      username: '',
      password: '',
    },
    signUp: {
      username: '',
      fullName: '',
      password: '',
      password_confirm: '',
    },
    resetPassword: {
      password: '',
      new_password: '',
      confirm_new_password: '',
      password_response: '',
    },
  },
}

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case types.AUTH_SET_USER:
        draft.user = { ...payload }
        break

      case types.AUTH_LOGIN_ERRORS:
        draft.errors.login = { ...draft.errors.login, ...payload }
        break

      case types.AUTH_SIGNUP_ERRORS:
        draft.errors.signUp = { ...draft.errors.signUp, ...payload }
        break

      case types.AUTH_LOGIN_SUCCESSFUL:
        draft.isAuthenticate = !state.isAuthenticate
        break

      case types.AUTH_LOGOUT_SUCCESSFUL:
        draft.user = {}
        draft.isAuthenticate = !state.isAuthenticate
        break

      case types.AUTH_SET_PROCESSING:
        draft.processing[payload.key] = !state.processing[payload.key]
        break

      case types.AUTH_RESET_ERRORS:
        draft.errors.login = {
          username: '',
          password: '',
        }
        break

      case types.UPDATE_USER_AVATAR:
        draft.user.avatarUrl = payload
        break

      case types.UPDATE_USER_INFO:
        draft.user = { ...state.user, ...payload }
        break

      default:
        break
    }
  })

export default reducer
