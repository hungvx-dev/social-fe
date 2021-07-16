import React from 'react'

import { makeGetIsAuthenticated, makeGetMe } from '@/modules/auth/store/selector'
import { UserAPI } from '@/services'
import { useDispatch } from 'react-redux'
import { useShouldShowModal } from '@/hooks/useShowModalLogin'
import DropdownComponent from '../../../_components/dropDown/DropdownComponent'
import * as types from '../../auth/store/action_types'

function StatusBlogView({ blogId, authorId }) {
  const user = makeGetMe()
  const isAuth = makeGetIsAuthenticated()
  const dispatch = useDispatch()

  if (user.id === authorId) return null

  if (isAuth && user.blogsFollowing?.length > 0 && user.blogsFollowing.includes(blogId)) {
    return (
      <DropdownComponent
        component={() => (
          <div
            className="hover:bg-gray-200 border border-green-500 text-green-700 rounded p-1"
            style={{ lineHeight: '1.4rem' }}
          >
            <div className="font-light">
              <div className="text-sm">Đang theo dõi</div>
            </div>
          </div>
        )}
        options={[
          {
            title: 'Bỏ theo dõi',
            onClick: async () => {
              await UserAPI.followBlog(blogId)
              dispatch({ type: types.S_AUTH_UPDATE_ME })
            },
          },
        ]}
      />
    )
  }

  return (
    <button
      type="button"
      className="hover:bg-gray-200 border border-green-500 text-green-700 rounded p-1"
      style={{ lineHeight: '1.4rem' }}
      onClick={async () => {
        if (await useShouldShowModal({ dispatch, isAuth, type: 'login' })) return

        await UserAPI.followBlog(blogId)
        dispatch({ type: types.S_AUTH_UPDATE_ME })
      }}
    >
      <div className="text-sm">Theo dõi</div>
    </button>
  )
}

export default StatusBlogView
