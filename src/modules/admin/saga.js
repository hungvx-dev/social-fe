import { all, call, put, takeLatest } from 'redux-saga/effects'
import { ReportAPI, UserAPI } from '@/services'

import * as types from './store/action_types'

function* fetchReports({ payload }) {
  try {
    yield put({ type: types.SET_LOADING })
    const data = yield call(() => ReportAPI.list(payload))
    yield put({ type: types.SET_REPORTS, payload: data })
  } catch (error) {
    // throw new Error(error)
  } finally {
    yield put({ type: types.SET_LOADING })
  }
}

function* fetchUsers({ payload }) {
  try {
    yield put({ type: types.SET_LOADING })
    const data = yield call(() => UserAPI.list(payload))
    yield put({ type: types.SET_USERS, payload: data })
  } catch (error) {
    // throw new Error(error)
  } finally {
    yield put({ type: types.SET_LOADING })
  }
}

function* handleBlock({ payload }) {
  try {
    const post = payload.post || payload.comment.post
    if (payload.post) {
      yield call(() => UserAPI.blockPost(post.id, !post.isBlock))
    }
    if (payload.comment) {
      yield call(() => UserAPI.blockComment(payload.comment.id, !payload.comment.isBlock))
    }

    yield put({ type: types.BLOCK, payload: payload.id })
  } catch (error) {
    // throw new Error(error)
  }
}

function* handleBlockUser({ payload }) {
  try {
    yield call(() => UserAPI.blockUser(payload.id, !payload.isBlock))

    yield put({ type: types.BLOCK_USER, payload: payload.id })
  } catch (error) {
    // throw new Error(error)
  }
}

export default function* adminSaga() {
  yield all([
    takeLatest(types.S_FETCH_REPORTS, fetchReports),
    takeLatest(types.S_FETCH_USERS, fetchUsers),
    takeLatest(types.S_BLOCK, handleBlock),
    takeLatest(types.S_BLOCK_USER, handleBlockUser),
  ])
}
