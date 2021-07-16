import React, { lazy, Suspense } from 'react'
import Loading from '@/_components/commons/Loader'
// const { SocketPost } = lazy(() => import('@/_layouts/Socket'))
const PostViewForum = lazy(() => import('./PostViewForum'))
const PostViewBlog = lazy(() => import('./PostViewBlog'))
const PostAdd = lazy(() => import('./components/PostAdd'))

export default [
  {
    path: '/topics/posts/:id',
    exact: true,
    component: () => (
      <Suspense fallback={<Loading />}>
        <PostViewForum />
      </Suspense>
    ),
  },
  {
    path: '/blogs/posts/:id',
    exact: true,
    component: () => (
      <Suspense fallback={<Loading />}>
        <PostViewBlog />
      </Suspense>
    ),
  },
  {
    path: '/posts/add',
    auth: true,
    exact: true,
    component: () => (
      <Suspense fallback={<Loading />}>
        <PostAdd />
      </Suspense>
    ),
  },
]
