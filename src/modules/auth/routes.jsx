import Loading from '@/_components/commons/Loader'
import React, { lazy, Suspense } from 'react'

const Register = lazy(() => import('./Register'))
const Login = lazy(() => import('./Login'))

export default [
  {
    path: '/login',
    exact: true,
    component: () => (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/register',
    exact: true,
    component: () => (
      <Suspense fallback={<Loading />}>
        <Register />
      </Suspense>
    ),
  },
]
