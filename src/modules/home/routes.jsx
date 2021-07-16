import Loading from '@/_components/commons/Loader'
import React, { lazy, Suspense } from 'react'

const Home = lazy(() => import('./Home'))
const Search = lazy(() => import('./Search'))

export default [
  {
    path: ['/', '/topics/:slug'],
    auth: false,
    exact: true,
    component: props => (
      <Suspense fallback={<Loading />}>
        <Home {...props} />
      </Suspense>
    ),
  },
  {
    path: ['/search'],
    auth: false,
    exact: true,
    component: props => (
      <Suspense fallback={<Loading />}>
        <Search {...props} />
      </Suspense>
    ),
  },
]
