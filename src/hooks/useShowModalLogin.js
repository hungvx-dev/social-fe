import * as _types from '@/modules/home/store/action_types'
import { UserAPI } from '@/services'

const types = {
  login: _types.APP_UPDATE_IS_LOGIN,
  report: _types.APP_UPDATE_IS_REPORT,
  block: 'APP_UPDATE_IS_BLOCK',
}

export const useShouldShowModal = async ({ dispatch, isAuth, type, payload = null }) => {
  if (isAuth) {
    const user = await UserAPI.me()
    if (user.isBlock) {
      dispatch({ payload, type: types.block })
    }
    return user.isBlock
  }

  dispatch({ payload, type: types[type] })
  return true
}
