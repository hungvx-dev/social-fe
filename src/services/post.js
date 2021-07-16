import http from '../helpers/axios'

const path = '/posts'

export const list = () => http.get(path).then(res => res.data)

export const getPostById = id => http.get(`${path}/${id}`).then(res => res)

export const votePost = (id, vote) => http.put(`${path}/${id}/vote`, { vote })

export const getPostsUserVoted = () => http.get(`/users/posts_vote?type=forum`)

export const getPostsUserLiked = () => http.get(`/users/posts_vote?type=blog`)

export const getCommentsVoted = postId => http.get(`users/comments_vote?post=${postId}&type=forum`)

export const getCommentsLiked = postId => http.get(`users/comments_vote?post=${postId}&type=blog`)

export const likePost = id => http.put(`${path}/${id}/like`)

export const listComment = id => http.get(`${path}/${id}/comments`).then(res => res.data)

export const create = ({ title, content, classify, blog, topic, avatar }) =>
  http.post(`${path}`, { title, content, classify, blog, topic, avatar })

export const update = (id, { title, content, avatar, topic }) =>
  http.put(`${path}/${id}`, { title, content, avatar, topic })

export const destroy = id => http.delete(`${path}/${id}`)
