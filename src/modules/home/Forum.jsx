import React, { useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { parseQuery } from '@/helpers/api'
import Posts from './Posts'
import * as types from './store/action_types'
import { makeGetIsAuthenticated } from '../auth/store/selector'
import { makeGetPosts } from './store/selector'

function Forum({ className }) {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const isAuth = makeGetIsAuthenticated()
  const posts = makeGetPosts()

  const params = parseQuery(location.search, 10)

  const fetchPosts = () =>
    dispatch({ type: types.S_FETCH_POSTS, payload: { slug, params, isUpdate: +params.page > 1 } })
  const getPostsVoted = () => dispatch({ type: types.S_FETCH_POSTS_VOTED })

  useEffect(() => {
    if (params.page > 1) history.push('/')
    else fetchPosts()
    if (isAuth) {
      getPostsVoted()
    }
  }, [])

  useEffect(() => {
    fetchPosts()
    if (isAuth) {
      getPostsVoted()
    }
  }, [slug, location])

  return (
    <div className={className}>
      <Posts posts={posts} slug={slug} />
    </div>
  )
}

export default Forum
