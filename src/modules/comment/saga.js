import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { CommentAPI, PostAPI } from '@/services'
import { toast } from 'react-toastify'
import * as types from './store/action_types'
import * as typesHome from '../home/store/action_types'

function* getCommentsPost({ payload }) {
  try {
    const comments = yield call(() => PostAPI.listComment(payload))
    yield put({ type: types.SET_COMMENTS_POST, payload: comments })
  } catch (error) {
    // throw new Error(error)
  }
}

function* createComment({ payload: { data, socket } }) {
  try {
    const comment = yield call(() => CommentAPI.create(data))

    socket.emit('Comment', comment)
    yield put({ type: types.ADD_COMMENT, payload: comment })
    yield put({ type: typesHome.UPDATE_POST_COMMENT_NUM })
  } catch (error) {
    // throw new Error(error)
  }
}

function* createChildComment({ payload: { data, socket } }) {
  try {
    const comment = yield call(() => CommentAPI.create(data))

    socket.emit('Comment', comment)
    yield put({ type: types.ADD_COMMENT, payload: comment })
    yield put({ type: typesHome.UPDATE_POST_COMMENT_NUM })
  } catch (error) {
    // throw new Error(error)
  }
}

function* deleteComment({ payload: { comment, socket } }) {
  try {
    yield call(() => CommentAPI.destroy(comment.id))
    socket.emit('DeleteComment', comment)
    yield put({ type: types.DELETE_COMMENT, payload: comment })
    toast.success('Xóa bình luận thành công')
    yield put({
      type: typesHome.UPDATE_POST_COMMENT_NUM,
      payload: -(1 + (comment.commentsChild ? comment.commentsChild.length : 0)),
    })
  } catch (error) {
    // throw new Error(error)
  }
}

function* updateComment({ payload: { comment, content, socket } }) {
  try {
    yield call(() => CommentAPI.update(comment.id, content))
    socket.emit('UpdateComment', { comment, content })
    toast.success('Chỉnh sửa bình luận thành công')
    yield put({ type: types.UPDATE_COMMENT, payload: { comment, content } })
  } catch (error) {
    // throw new Error(error)
  }
}

export default function* commentSaga() {
  yield all([
    takeLatest(types.S_CREATE_COMMENT_POST, createComment),
    takeEvery(types.S_FETCH_COMMENTS_POST, getCommentsPost),
    takeLatest(types.S_CREATE_CHILD_COMMENT, createChildComment),
    takeLatest(types.S_DELETE_COMMENT, deleteComment),
    takeLatest(types.S_UPDATE_COMMENT, updateComment),
  ])
}
