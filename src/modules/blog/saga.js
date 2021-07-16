import { all, call, put, takeLatest } from 'redux-saga/effects'

import { BlogAPI } from '@/services'
import * as types from './store/action_types'

function* fetchPostsNew() {
  try {
    const posts = yield call(() => BlogAPI.getPostsOfBLogs())
    yield put({ type: types.SET_POSTS_NEW, payload: posts })
  } catch (error) {
    // throw new Error(error)
  }
}

function* fetchPostsUserFollowed() {
  try {
    const posts = yield call(() => BlogAPI.getPostsUserFollowed())
    yield put({ type: types.SET_POSTS_USER_FOLLOWED, payload: posts })
  } catch (error) {
    // throw new Error(error)
  }
}

function* fetchBlogsMe() {
  try {
    const blogs = yield call(() => BlogAPI.getBlogsMe())
    yield put({ type: types.SET_BLOGS_ME, payload: blogs })
  } catch (error) {
    // throw new Error(error)
  }
}

function* fetchBlogsTop() {
  try {
    const blogs = yield call(() => BlogAPI.getBlogs())
    yield put({ type: types.SET_BLOGS_TOP, payload: blogs })
  } catch (error) {
    // throw new Error(error)
  }
}

function* fetchPostsBlog({ payload: blogId }) {
  try {
    const blogs = yield call(() => BlogAPI.getPostsOfBlogId(blogId))
    yield put({ type: types.SET_POSTS_BLOG, payload: blogs })
  } catch (error) {
    // throw new Error(error)
  }
}

function* getBlog({ payload: slug }) {
  try {
    const blog = yield call(() => BlogAPI.getBlogById(slug))
    yield put({ type: types.SET_BLOG, payload: blog })
    yield call(() => fetchPostsBlog({ payload: blog.id }))
  } catch (error) {
    // throw new Error(error)
  }
}

export default function* blogsSaga() {
  yield all([
    takeLatest(types.S_FETCH_POSTS_NEW, fetchPostsNew),
    takeLatest(types.S_FETCH_POSTS_USER_FOLLOWED, fetchPostsUserFollowed),
    takeLatest(types.S_FETCH_BLOGS_ME, fetchBlogsMe),
    takeLatest(types.S_FETCH_BLOGS_TOP, fetchBlogsTop),
    takeLatest(types.S_FETCH_POSTS_BLOG, fetchPostsBlog),
    takeLatest(types.S_GET_BLOG, getBlog),
  ])
}
