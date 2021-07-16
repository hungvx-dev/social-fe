import { combineReducers } from 'redux'

// import home from '@/modules/home/store/reducer'
import auth from '@/modules/auth/store/reducer'
import comment from '@/modules/comment/store/reducer'
import forum from '@/modules/home/store/reducer'
import blog from '@/modules/blog/store/reducer'
import admin from '@/modules/admin/store/reducer'

import socket from '@/_layouts/Socket'

export default combineReducers({ auth, comment, forum, blog, socket, admin })
