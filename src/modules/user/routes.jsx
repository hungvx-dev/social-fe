import Loading from '@/_components/commons/Loader'
import React, { lazy, Suspense } from 'react'

const UserView = lazy(() => import('./UserView'))
const UserSetting = lazy(() => import('./UserSetting'))

export default [
  {
    path: '/users/setting',
    auth: true,
    exact: true,
    component: props => (
      <Suspense fallback={<Loading />}>
        <UserSetting {...props} />
      </Suspense>
    ),
  },
  {
    path: '/users/:id',
    auth: false,
    exact: true,
    component: props => (
      <Suspense fallback={<Loading />}>
        <UserView {...props} />
      </Suspense>
    ),
  },
]
