import { queryUrl } from '@/helpers/api'
import http from '../helpers/axios'

const path = '/users'

export const list = params => http.get(queryUrl(path, params))

export const me = () => http.get(`${path}/me`)

export const resetPassword = (id, data) => http.put(`${path}/${id}/reset_password`, data)

export const show = id => http.get(`${path}/${id}`)

export const posts = id => http.get(`${path}/${id}/posts?sort=-createdAt`)

export const followBlog = blogId => http.post(`${path}/follow_blog`, { blogId })

export const updateAvatar = ({ avatarUrl }) => http.put(`${path}/avatar`, { avatarUrl })
export const updateInfo = ({ fullName, introduction }) => http.put(`${path}/info`, { fullName, introduction })

export const search = q => http.get(`/search?q=${q}`).then(res => res.data)

export const reportPost = ({ reason, postId, commentId, type, status, value }) =>
  http.post(`${path}/report_post`, { value, reason, postId, commentId, type, status })

export const blockPost = (postId, isBlock) => http.post(`${path}/block_post`, { postId, isBlock })

export const blockUser = (userId, isBlock) => http.post(`${path}/block_user`, { userId, isBlock })

export const blockComment = (commentId, isBlock) => http.post(`${path}/block_comment`, { commentId, isBlock })
