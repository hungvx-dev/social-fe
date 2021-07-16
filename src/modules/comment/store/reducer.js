import produce from 'immer'
import * as types from './action_types'

const initialState = {
  comments: [],
}

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case types.SET_COMMENTS_POST:
        draft.comments = payload
        break
      case types.ADD_COMMENT: {
        if (payload.commentParent) {
          const indexParent = state.comments.findIndex(_comment => _comment.id === payload.commentParent)
          if (indexParent !== -1) {
            draft.comments[indexParent].commentsChild.push(payload)
          }
        } else {
          draft.comments.push(payload)
        }
        break
      }
      case types.UPDATE_COMMENT: {
        const { comment, content } = payload
        if (comment.commentParent) {
          const indexParent = state.comments.findIndex(_comment => _comment.id === comment.commentParent)
          if (indexParent !== -1) {
            const indexComment = state.comments[indexParent].commentsChild.findIndex(
              _comment => _comment.id === comment.id
            )
            if (indexComment !== -1) draft.comments[indexParent].commentsChild[indexComment].content = content
          }
        } else {
          const indexComment = state.comments.findIndex(_comment => _comment.id === comment.id)
          if (indexComment !== -1) draft.comments[indexComment].content = content
        }
        break
      }
      case types.DELETE_COMMENT: {
        if (payload.commentParent) {
          const indexParent = state.comments.findIndex(comment => comment.id === payload.commentParent)
          if (indexParent !== -1) {
            const indexComment = state.comments[indexParent].commentsChild.findIndex(
              comment => comment.id === payload.id
            )
            if (indexComment !== -1) draft.comments[indexParent].commentsChild.splice(indexComment, 1)
          }
        } else {
          const indexComment = state.comments.findIndex(comment => comment.id === payload.id)
          if (indexComment !== -1) draft.comments.splice(indexComment, 1)
        }
        break
      }
      default:
        break
    }
  })

export default reducer
