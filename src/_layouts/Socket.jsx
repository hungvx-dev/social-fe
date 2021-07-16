import React, { useEffect } from 'react'
import { io } from 'socket.io-client'
import produce from 'immer'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'

import { ENV } from '@/_constants/common'

import * as typesHome from '@/modules/home/store/action_types'
import * as typesComment from '@/modules/comment/store/action_types'

// action-types
const types = {
  SET_SOCKET_POST: 'SET_SOCKET_POST',
}

// selector
export const makeGetSocketWithType = (type = 'posts') => {
  const stateSelect = createSelector(
    state => state.socket,
    socket => socket[type]
  )

  return useSelector(stateSelect)
}

// reducer
const initialState = {
  posts: null,
}

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case types.SET_SOCKET_POST:
        draft.posts = payload
        break
      default:
        break
    }
  })

export const SocketWrapper = ({ children }) => {
  const dispatch = useDispatch()
  const socket = makeGetSocketWithType()

  useEffect(() => {
    const socketPosts = io(`${ENV.API_SOCKET}/posts`, {
      // forceNew: true,
      // reconnection: true,
      withCredentials: true,
    })

    dispatch({ type: types.SET_SOCKET_POST, payload: socketPosts })

    socketPosts.on('JoiningRoom', msg => {
      console.log(msg)
    })

    socketPosts.on('UpdatePost', post => {
      dispatch({ type: typesHome.SET_POST, payload: post })
    })

    socketPosts.on('Comment', _comment => {
      dispatch({ type: typesComment.ADD_COMMENT, payload: _comment })
      dispatch({ type: typesHome.UPDATE_POST_COMMENT_NUM })
    })

    socketPosts.on('UpdateComment', ({ comment, content }) => {
      dispatch({ type: typesComment.UPDATE_COMMENT, payload: { comment, content } })
    })

    socketPosts.on('DeleteComment', _comment => {
      dispatch({ type: typesComment.DELETE_COMMENT, payload: _comment })
      dispatch({
        type: typesHome.UPDATE_POST_COMMENT_NUM,
        payload: -(1 + (_comment.commentsChild ? _comment.commentsChild.length : 0)),
      })
    })

    return () => {
      socketPosts.close()
      dispatch({ type: types.SET_SOCKET_POST, payload: null })
    }
  }, [])
  if (!socket) return null

  return <div>{children}</div>
}

// export const SocketWrapper = ({ children }) => <div>{children}</div>

export default reducer
