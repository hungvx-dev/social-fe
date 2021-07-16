import Loading from '@/_components/commons/Loader'
import React, { lazy, Suspense } from 'react'

const Reports = lazy(() => import('./report/Reports'))
const Users = lazy(() => import('./user/Users'))

export default [
  {
    path: '/admin/reports',
    auth: true,
    role: 'admin',
    exact: true,
    component: props => (
      <Suspense fallback={<Loading />}>
        <Reports {...props} />
      </Suspense>
    ),
  },
  {
    path: '/admin/users',
    auth: true,
    role: 'admin',
    exact: true,
    component: props => (
      <Suspense fallback={<Loading />}>
        <Users {...props} />
      </Suspense>
    ),
  },
]
