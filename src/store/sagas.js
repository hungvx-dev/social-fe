import { all } from 'redux-saga/effects'

import auth from '@/modules/auth/saga'
import comment from '@/modules/comment/saga'
import forum from '@/modules/home/saga'
import blog from '@/modules/blog/saga'
import admin from '@/modules/admin/saga'

export default function* rootSaga() {
  yield all([auth(), admin(), comment(), forum(), blog()])
}
