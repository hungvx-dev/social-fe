import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

const type = { post: 'Bài viết', comment: 'Bình luận' }
const role = { admin: 'Admin', user: 'Viewer' }

export const makeGetReports = () => {
  const stateSelect = createSelector(
    state => state.admin.reports,
    reports =>
      reports.map(report => {
        const data = report.post || report.comment
        return {
          ...report,
          author: data.author.fullName,
          numberReports: report.reports.length,
          _type: type[report.type],
          status: data.isBlock ? 'Đã khóa' : 'Đang hoạt động',
        }
      })
  )

  return useSelector(stateSelect)
}

export const makeGetUsers = () => {
  const stateSelect = createSelector(
    state => state.admin.users,
    users =>
      users.map(user => ({
        ...user,
        _status: user.isBlock ? 'Block' : 'Active',
        _role: role[user.role],
        // author: report.userReport.fullName,
        // _type: type[report.type],
      }))
  )

  return useSelector(stateSelect)
}

export const makeGetLoading = () => {
  const stateSelect = createSelector(
    state => state.admin,
    admin => admin.loading
  )

  return useSelector(stateSelect)
}

export const makeGetTotal = () => {
  const stateSelect = createSelector(
    state => state.admin,
    admin => admin.total
  )

  return useSelector(stateSelect)
}
