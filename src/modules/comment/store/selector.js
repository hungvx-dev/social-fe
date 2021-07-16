import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'

export const makeGetCommentsPost = () => {
  const stateSelect = createSelector(
    state => state.comment,
    comment => comment.comments
  )

  return useSelector(stateSelect)
}
