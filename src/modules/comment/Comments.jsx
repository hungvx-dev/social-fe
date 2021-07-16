import React from 'react'
import { makeGetIsAuthenticated, makeGetMe } from '../auth/store/selector'
import Comment from './Comment'

function Comments({ type, comments, commentsUserVote }) {
  const user = makeGetMe()
  const isAuth = makeGetIsAuthenticated()

  return (
    <>
      {comments.map((comment, i) => (
        <Comment
          type={type}
          isAuth={isAuth}
          key={comment.id}
          userId={user.id}
          comment={comment}
          commentsUserVote={commentsUserVote}
          isLasts={i === comments.length - 1}
          i={i}
        />
      ))}
    </>
  )
}

export default Comments
