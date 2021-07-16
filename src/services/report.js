import { queryUrl } from '@/helpers/api'
import http from '../helpers/axios'

const path = '/reports'

export const list = params => http.get(queryUrl(path, params))

export const destroy = id => http.delete(`${path}/${id}`)
export const destroyMany = ids => http.delete(`${path}`, { data: { ids } })

export const show = id => http.get(`${path}/${id}`)
