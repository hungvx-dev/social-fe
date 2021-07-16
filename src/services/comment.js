import http from '../helpers/axios'

const path = '/comments'

export const voteComment = (id, vote) => http.put(`${path}/${id}/vote`, { vote })

export const likeComment = id => http.put(`${path}/${id}/like`)

export const create = ({ content, postId, parentId }) => http.post(`${path}`, { content, postId, parentId })

export const destroy = id => http.delete(`${path}/${id}`)

export const update = (id, content) => http.put(`${path}/${id}`, { content })
