import { all } from 'redux-saga/effects'

import auth from '@/modules/auth/saga'
import comment from '@/modules/comment/saga'
import forum from '@/modules/home/saga'
import blog from '@/modules/blog/saga'

export default function* rootSaga() {
  yield all([auth(), comment(), forum(), blog()])
}
