import produce from 'immer'
import * as types from './action_types'

const initialState = {
  app: {
    isShowReport: false,
    isLogin: false,
    isBlock: false,
  },
  dataReport: {
    type: '',
    id: '',
  },
  posts: [],
  post: null,
  postsVoted: {},
  processing: {
    posts: false,
    postsVoted: false,
  },
  hasMore: false,
  search: {
    posts: [],
    blogs: [],
    users: [],
  },
}

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case types.SET_SEARCH:
        draft.search = payload
        break
      case types.SET_POST:
        draft.post = payload
        break
      case types.UPDATE_POST_COMMENT_NUM: {
        draft.post.commentNum += payload || 1
        break
      }
      case types.SET_HAS_MORE: {
        draft.hasMore = payload
        break
      }
      case types.RESET_POST:
        draft.post = null
        break
      case types.SET_POSTS:
        draft.posts = payload
        break
      case types.ADD_POST:
        draft.posts.push(...payload)
        break
      case types.REMOVE_POST:
        draft.posts = draft.posts.filter(post => post.id !== payload)
        break
      case types.SET_POSTS_VOTED:
        draft.postsVoted = payload
        break
      case types.SET_PROCESSING:
        draft.processing.postsVoted = !state.processing.postsVoted
        break
      case types.SET_PROCESSING_POSTS:
        draft.processing.posts = !state.processing.posts
        break
      case types.APP_UPDATE_IS_REPORT: {
        draft.app.isShowReport = !state.app.isShowReport
        draft.dataReport = payload
        break
      }
      case types.APP_UPDATE_IS_LOGIN:
        draft.app.isLogin = !state.app.isLogin
        break
      case 'APP_UPDATE_IS_BLOCK':
        draft.app.isBlock = !state.app.isBlock
        break
      case types.UPDATE_TOPICS: {
        const indexPost = state.posts.findIndex(post => post.id === payload.id)
        if (indexPost !== -1) draft.posts[indexPost] = payload
        break
      }
      case types.DELETE_POST: {
        draft.search.posts = state.search.posts.filter(post => post.id !== payload)
        break
      }
      default:
        break
    }
  })

export default reducer
