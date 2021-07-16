import queryString from 'query-string'

export const queryWith = params => queryString.stringify(params, { arrayFormat: 'comma' })

export const parseQuery = (search, limit = 5) =>
  queryString.parse(search || `?page=1&limit=${limit}&q=`, { arrayFormat: 'comma' })

export const queryUrl = (path, query) => queryString.stringifyUrl({ url: path, query })
