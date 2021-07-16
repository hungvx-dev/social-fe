import React, { useCallback, useEffect, useRef, useState } from 'react'

import { makeGetSocketWithType } from '@/_layouts/Socket'
import { parseQuery } from '@/helpers/api'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SkeletonPost from 'Templates/skeleton/Post'
import Post from './Post'
import { makeGetIsAuthenticated, makeGetMe } from '../auth/store/selector'
import { makeGetPostsVoted, makeGetProcessing } from './store/selector'

function Posts({ posts }) {
  const observer = useRef(null)
  const location = useLocation()
  const history = useHistory()
  const hasMore = useSelector(state => state.forum.hasMore)

  const user = makeGetMe()
  const postsVoted = makeGetPostsVoted()
  const isAuth = makeGetIsAuthenticated()
  const socket = makeGetSocketWithType()
  const loading = makeGetProcessing('posts')

  const [voteSocket, setVoteSocket] = useState({})
  const params = parseQuery(location.search, 10)

  const lastPostElementRef = useCallback(
    node => {
      if (loading) return null
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore && posts.length >= 10) {
          history.push(`?page=${(+params.page || 1) + 1}&limit=10`)
        }
      })
      if (node) observer.current.observe(node)
      return null
    },
    [loading, hasMore]
  )

  useEffect(() => {
    const handleVote = ({ vote, postId, userId }) => {
      setVoteSocket({ ...voteSocket, [postId]: { vote, userId } })
    }

    socket.on('VotePost', handleVote)
    return () => {
      socket.off('VotePost', handleVote)
      // history.replace({
      //   search: '',
      // })
    }
  }, [])

  return (
    <>
      {posts.map((post, index) =>
        posts.length === index + 1 ? (
          <Post
            refProp={lastPostElementRef}
            key={post.id}
            post={post}
            isVote={postsVoted[post.id]}
            userId={user.id}
            isAuth={isAuth}
            voteSocket={voteSocket[post.id]}
          />
        ) : (
          <Post
            key={post.id}
            post={post}
            isVote={postsVoted[post.id]}
            userId={user.id}
            isAuth={isAuth}
            voteSocket={voteSocket[post.id]}
          />
        )
      )}
      {!loading && posts && posts.length === 0 && (
        <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ color: 'red', fontSize: '20px' }}>Không tìm thấy bài viết nào</span>
        </div>
      )}
      {loading && (
        <>
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
        </>
      )}
    </>
  )
}

export default Posts
