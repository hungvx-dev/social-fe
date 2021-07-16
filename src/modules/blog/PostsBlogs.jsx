import React from 'react'
import { makeGetIsAuthenticated, makeGetMe } from '../auth/store/selector'
import PostBlog from './PostBlog'

function PostsBlogs({ posts, type, view }) {
  const user = makeGetMe()
  const isAuth = makeGetIsAuthenticated()

  if (view) {
    return (
      <ul>
        {posts.map(post => (
          <div
            key={post.id}
            className="shadow-box-2 rounded-lg"
            style={{ margin: '8px 0', background: 'honeydew', paddingRight: '8px' }}
          >
            <PostBlog post={post} userId={user.id} type={type} isAuth={isAuth} />
          </div>
        ))}
      </ul>
    )
  }

  return (
    <ul>
      {posts.map(post => (
        <PostBlog key={post.id} post={post} userId={user.id} type={type} isAuth={isAuth} />
      ))}
    </ul>
  )
}

export default PostsBlogs
