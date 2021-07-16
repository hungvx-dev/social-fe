import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

export const makeGetVote = () => {
  const stateSelect = createSelector(
    state => state.forum.postsVoted,
    state => state.forum.posts,
    (postsVoted, posts) =>
      posts.reduce(
        (acc, post) => ({
          ...acc,
          [post.id]: {
            voteTotal: post.voteNum,
            vote: postsVoted[post.id],
          },
        }),
        {}
      )
  )
  return useSelector(stateSelect)
}

export const makeGetSearchPostsWithType = type => {
  const stateSelect = createSelector(
    state => state.forum.search.posts,
    posts => posts.filter(post => post.classify === type)
  )

  return useSelector(stateSelect)
}

export const makeGetDataReport = () => {
  const stateSelect = createSelector(
    state => state.forum,
    forum => forum.dataReport
  )

  return useSelector(stateSelect)
}

export const makeGetSearchBlogs = () => {
  const stateSelect = createSelector(
    state => state.forum.search,
    forum => forum.blogs
  )

  return useSelector(stateSelect)
}

export const makeGetSearchUsers = () => {
  const stateSelect = createSelector(
    state => state.forum.search,
    forum => forum.users
  )

  return useSelector(stateSelect)
}

export const makeGetPosts = () => {
  const stateSelect = createSelector(
    state => state.forum,
    forum => forum.posts
  )

  return useSelector(stateSelect)
}

export const makeGetPost = () => {
  const stateSelect = createSelector(
    state => state.forum,
    forum => forum.post
  )

  return useSelector(stateSelect)
}

export const makeGetPostsVoted = () => {
  const stateSelect = createSelector(
    state => state.forum,
    forum => forum.postsVoted
  )

  return useSelector(stateSelect)
}

export const makeGetProcessing = type => {
  const stateSelect = createSelector(
    state => state.forum,
    forum => forum.processing[type]
  )

  return useSelector(stateSelect)
}

export const makeGetIsShowReport = () => {
  const stateSelect = createSelector(
    state => state.forum,
    forum => forum.app.isShowReport
  )

  return useSelector(stateSelect)
}

export const makeGetIsLogin = () => {
  const stateSelect = createSelector(
    state => state.forum,
    forum => forum.app.isLogin
  )

  return useSelector(stateSelect)
}

export const makeGetIsBlock = () => {
  const stateSelect = createSelector(
    state => state.forum,
    forum => forum.app.isBlock
  )

  return useSelector(stateSelect)
}
