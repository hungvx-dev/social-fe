import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

export const makeGetBlog = () => {
  const stateSelect = createSelector(
    state => state.blog,
    ({ blog }) => blog
  )

  return useSelector(stateSelect)
}

export const makeGetPostsNew = () => {
  const stateSelect = createSelector(
    state => state.blog,
    blog => blog.postsNew
  )

  return useSelector(stateSelect)
}

export const makeGetBlogsTop = () => {
  const stateSelect = createSelector(
    state => state.blog,
    blog => blog.blogsTop
  )

  return useSelector(stateSelect)
}

export const makeGetPostsBlog = () => {
  const stateSelect = createSelector(
    state => state.blog,
    blog => blog.postsBlog
  )

  return useSelector(stateSelect)
}

export const makeGetBlogsMe = () => {
  const stateSelect = createSelector(
    state => state.blog,
    blog => blog.blogsMe
  )

  return useSelector(stateSelect)
}

export const makeGetPostsUserFollowed = () => {
  const stateSelect = createSelector(
    state => state.blog,
    blog => blog.postsUserFollowed
  )

  return useSelector(stateSelect)
}

export const makeGetErrorWithType = type => {
  const stateSelect = createSelector(
    state => state.blog.errors,
    errors => errors[type]
  )

  return useSelector(stateSelect)
}
