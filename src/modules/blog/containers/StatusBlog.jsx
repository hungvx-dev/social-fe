import React from 'react'
import { useHistory } from 'react-router-dom'

import { makeGetIsAuthenticated, makeGetMe } from '@/modules/auth/store/selector'
import { UserAPI } from '@/services'
import { useDispatch } from 'react-redux'
import { useShouldShowModal } from '@/hooks/useShowModalLogin'
import DropdownComponent from '../../../_components/dropDown/DropdownComponent'
import * as types from '../../auth/store/action_types'

function StatusBlog({ blogId, blogAuthorId, blogSlug }) {
  const user = makeGetMe()
  const isAuth = makeGetIsAuthenticated()
  const dispatch = useDispatch()
  const history = useHistory()

  if (blogAuthorId === user.id)
    return (
      <button
        type="button"
        className="flex-shrink-0 font-light cursor-pointer hover:bg-gray-300 rounded border border-gray-500 text-black no-underline"
        onClick={() => history.push(`/posts/add?classify=blog&blogSlug=${blogSlug}`)}
        style={{ fontSize: 16, padding: '4px 12px' }}
      >
        Viết bài
      </button>
    )

  if (isAuth && user.blogsFollowing?.length > 0 && user.blogsFollowing.includes(blogId)) {
    return (
      <DropdownComponent
        component={() => (
          <span
            className="flex-shrink-0 font-light cursor-pointer hover:bg-gray-200 rounded-full px-2 py-1"
            style={{ fontSize: 16 }}
          >
            Đang theo dõi
          </span>
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
      className="flex-shrink-0 font-light cursor-pointer hover:bg-gray-200 rounded-full px-2 py-1"
      style={{ fontSize: 16 }}
      onClick={async () => {
        if (await useShouldShowModal({ dispatch, isAuth, type: 'login' })) return

        await UserAPI.followBlog(blogId)
        dispatch({ type: types.S_AUTH_UPDATE_ME })
      }}
    >
      Theo dõi
    </button>
  )
}

export default StatusBlog
