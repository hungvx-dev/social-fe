import { combineReducers } from 'redux'

// import home from '@/modules/home/store/reducer'
import auth from '@/modules/auth/store/reducer'
import comment from '@/modules/comment/store/reducer'
import forum from '@/modules/home/store/reducer'

export default combineReducers({ auth, comment, forum })
