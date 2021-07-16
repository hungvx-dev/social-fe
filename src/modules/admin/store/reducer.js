import produce from 'immer'
import * as types from './action_types'

const initialState = {
  reports: [],
  users: [],
  loading: false,
  total: 0,
}

const reducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case types.SET_REPORTS:
        draft.reports = payload.data
        draft.total = payload.total
        break
      case types.SET_USERS:
        draft.users = payload.data
        draft.total = payload.total
        break
      case types.SET_LOADING:
        draft.loading = !state.loading
        break
      case types.BLOCK: {
        const indexPost = state.reports.findIndex(report => report.id === payload)
        const data = draft.reports[indexPost].post || draft.reports[indexPost].comment
        data.isBlock = !data.isBlock
        break
      }
      case types.BLOCK_USER: {
        const index = state.users.findIndex(user => user.id === payload)
        draft.users[index].isBlock = !state.users[index].isBlock
        break
      }
      default:
        break
    }
  })

export default reducer
