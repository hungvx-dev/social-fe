import { all, call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { removeAuthToken, setAuthToken } from '@/helpers/storage'
import { AuthAPI, UserAPI } from '@/services'
import * as typesBlog from '@/modules/blog/store/action_types'
import * as types from './store/action_types'

function* login({ payload }) {
  console.log(payload)
  try {
    const { token } = yield call(() => AuthAPI.login(payload))
    setAuthToken(token, true)
    const user = yield call(UserAPI.me)
    yield put({ type: types.AUTH_SET_USER, payload: user })
    yield put({ type: types.AUTH_LOGIN_SUCCESSFUL })
  } catch (error) {
    yield put({ type: types.AUTH_LOGIN_ERRORS, payload: error })
    // console.log(error)
    // throw new Error('Lỗi đăng nhập')
  }
}

function* logout() {
  try {
    yield delay(300)
    removeAuthToken()
    yield put({ type: types.AUTH_LOGOUT_SUCCESSFUL })
    yield put({ type: typesBlog.SET_BLOGS_ME, payload: [] })
    yield put({ type: typesBlog.SET_POSTS_USER_FOLLOWED, payload: [] })
  } catch (error) {
    // // throw new Error(error)
  }
}

function* signUp({ payload }) {
  try {
    yield delay(300)

    const { username } = yield call(() => AuthAPI.register(payload))
    yield call(() =>
      login({
        payload: { username, password: payload.password },
      })
    )
  } catch (error) {
    yield put({ type: types.AUTH_SIGNUP_ERRORS, payload: error })
    // // throw new Error(error)
  }
}

function* getMe() {
  try {
    const user = yield call(UserAPI.me)
    yield put({ type: types.AUTH_SET_USER, payload: user })
    yield put({ type: types.AUTH_LOGIN_SUCCESSFUL })
  } catch (error) {
    removeAuthToken()
    // // throw new Error(error)
  } finally {
    yield put({ type: types.AUTH_SET_PROCESSING, payload: { key: 'login' } })
  }
}

function* updateMe() {
  try {
    const user = yield call(UserAPI.me)
    yield put({ type: types.AUTH_SET_USER, payload: user })
  } catch (error) {
    // // throw new Error(error)
  }
}

export default function* authSaga() {
  yield all([
    takeEvery(types.S_AUTH_GET_ME, getMe),
    takeLatest(types.S_AUTH_UPDATE_ME, updateMe),
    takeLatest(types.S_AUTH_LOGIN_REQUEST, login),
    takeLatest(types.S_AUTH_LOGOUT_REQUEST, logout),
    takeLatest(types.S_AUTH_SIGNUP_REQUEST, signUp),
  ])
}
