import { queryUrl } from '@/helpers/api'
import http from '../helpers/axios'

const path = '/topics'

export const getPostsOfTopic = async (topic, params) => {
  const url = topic ? `${path}/${topic}/posts` : '/posts?classify=forum'
  return http.get(queryUrl(url, params)).then(res => res.data)
}
