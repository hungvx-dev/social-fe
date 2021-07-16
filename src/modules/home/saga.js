import { all, call, put, takeLatest } from 'redux-saga/effects'

import { PostAPI, TopicAPI, UserAPI } from '@/services'

import * as types from './store/action_types'

function* fetchPosts({ payload: { slug, params, isUpdate } }) {
  try {
    yield put({ type: types.SET_PROCESSING_POSTS })
    const posts = yield call(() => TopicAPI.getPostsOfTopic(slug, params))
    yield put({ type: types.SET_HAS_MORE, payload: posts.length > 0 })
    if (isUpdate) yield put({ type: types.ADD_POST, payload: posts })
    else yield put({ type: types.SET_POSTS, payload: posts })
  } catch (error) {
    // throw new Error(error)
  } finally {
    yield put({ type: types.SET_PROCESSING_POSTS })
  }
}

function* getPost({ payload: { id, socket } }) {
  try {
    const post = yield call(() => PostAPI.getPostById(id))
    socket.emit('JoiningRoom', post.id)
    yield put({ type: types.SET_POST, payload: post })
  } catch (error) {
    // throw new Error(error)
  }
}

function* getPostsUser({ payload }) {
  try {
    const posts = yield call(() => UserAPI.posts(payload))
    yield put({ type: types.SET_POSTS, payload: posts })
  } catch (error) {
    // throw new Error(error)
  }
}

function* getPostsVoted() {
  try {
    yield put({ type: types.SET_PROCESSING })
    const postsUserVoted = yield call(() => PostAPI.getPostsUserVoted())
    yield put({ type: types.SET_POSTS_VOTED, payload: postsUserVoted })
  } catch (error) {
    // throw new Error(error)
  } finally {
    yield put({ type: types.SET_PROCESSING })
  }
}

export default function* homeSaga() {
  yield all([
    takeLatest(types.S_FETCH_POSTS, fetchPosts),
    takeLatest(types.S_GET_POST, getPost),
    takeLatest(types.S_FETCH_POSTS_USER, getPostsUser),
    takeLatest(types.S_FETCH_POSTS_VOTED, getPostsVoted),
  ])
}
