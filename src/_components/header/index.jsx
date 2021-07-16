import { makeGetIsAuthenticated, makeGetMe } from '@/modules/auth/store/selector'
import { Avatar } from '@material-ui/core'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import queryString from 'query-string'
import { Link, useHistory, useLocation } from 'react-router-dom'
import {
  Menu,
  // ForumNav, BlogsNav,
  Search,
  BlogsNavColor,
  ForumNavColor,
  BlogsNav,
  ForumNav,
  ShowMore,
  Logout,
} from 'Templates/icon/IconsSvg'
import * as types from '@/modules/auth/store/action_types'
import useClickOutside from '@/hooks/useClickOutside'
import { useShouldShowModal } from '@/hooks/useShowModalLogin'
import { getAvatar } from '@/helpers/common'

function HeaderNav() {
  const user = makeGetMe()
  const isAuth = makeGetIsAuthenticated()
  const dropdown = useRef(null)
  const location = useLocation()
  const isTab = {
    forum: /topics/.test(location.pathname) || location.pathname === '/',
    blog: /blogs/.test(location.pathname),
  }
  const { q } = queryString.parse(location.search)
  const dispatch = useDispatch()
  const history = useHistory()

  const [isShowPopupUser, setIsShowPopupUser] = useState(false)
  const [textSearch, setTextSearch] = useState(q || '')

  useEffect(() => {
    if (!q) setTextSearch(() => '')
  }, [location.search])

  const dismissDropdown = useCallback(() => {
    setIsShowPopupUser(false)
  }, [setIsShowPopupUser])

  const handleSearch = async () => {
    if (textSearch.length > 0) {
      history.push(`/search?q=${textSearch}`)
    } else {
      history.push(`/`)
    }
  }

  const handleChangeSearch = event => setTextSearch(event.target.value)

  useClickOutside(dropdown, dismissDropdown)

  return (
    <div>
      <nav className="flex items-center w-full fixed h-12 bg-white border-gray-100 border-b z-30 shadow-sm">
        <div className="w-full md:w-11/12 lg:w-7/10 mx-auto flex items-center justify-between md:px-1">
          <div className="flex items-center flex-shrink-0">
            <div className="md:hidden text-lg text-gray-700 ml-1">
              <Menu />
            </div>
            <Link to="/" className="bg-white hidden md:block no-underline">
              <span className="text-green-500" style={{ fontFamily: '"Bangers", cursive', fontSize: 32 }}>
                ly kafe
              </span>
            </Link>
            <Link
              to="/"
              className={`ml-3 text-gray-600 flex items-center font-semibold no-underline ${
                isTab.forum && 'text-black'
              }`}
            >
              {isTab.forum ? <ForumNavColor width="1.25" unit="rem" /> : <ForumNav width="1.25" unit="rem" />}
              <span className="ml-1 font-semibold">Diễn đàn</span>
            </Link>
            <Link
              to="/blogs?tab=news"
              className={`ml-3 text-gray-600 flex items-center font-semibold no-underline  ${
                isTab.blog && 'text-black'
              }`}
            >
              {isTab.blog ? <BlogsNavColor width="1.25" unit="rem" /> : <BlogsNav width="1.25" unit="rem" />}
              <span className="ml-1 font-semibold">Blog</span>
            </Link>
          </div>

          <div className=" md:flex items-center flex-shrink ml-10 w-full h-full pl-8 border border-gray-lightest hover:border-gray-500 rounded relative bg-gray-100">
            <Search width="16" />
            <input
              type="text"
              value={textSearch}
              onChange={event => handleChangeSearch(event)}
              onKeyDown={event => event.key === 'Enter' && handleSearch()}
              className="text-sm w-full my-1 outline-none bg-gray-100"
              name="search"
              placeholder="Tìm kiếm"
            />
            <span onClick={() => handleSearch()} aria-hidden="true">
              <svg width="1.2em" height="1.2em" viewBox="0 0 32 32" style={{ cursor: 'pointer', marginRight: 10 }}>
                <path
                  d="M27.71 4.29a1 1 0 0 0-1.05-.23l-22 8a1 1 0 0 0 0 1.87l9.6 3.84l3.84 9.6a1 1 0 0 0 .9.63a1 1 0 0 0 .92-.66l8-22a1 1 0 0 0-.21-1.05zM19 24.2l-2.79-7L21 12.41L19.59 11l-4.83 4.83L7.8 13l17.53-6.33z"
                  fill="#626262"
                />
              </svg>
            </span>
          </div>
          <button
            type="button"
            onClick={async () => {
              if (await useShouldShowModal({ dispatch, isAuth, type: 'login' })) return
              history.push('/posts/add?classify=forum')
            }}
            className=" md:block ml-5 mr-10 flex-shrink-0 hover:bg-green-600 rounded-full bg-green-500 text-white no-underline"
            style={{ padding: '4px 8px' }}
          >
            <span className="font-medium text-sm">&nbsp;Đăng bài</span>
          </button>
          <div className="flex items-center flex-shrink-0">
            {!isAuth ? (
              <div className=" md:flex items-center flex-shrink-0">
                <Link
                  to="/login"
                  className="ml-5 flex-shrink-0 hover:text-black no-underline text-gray-600"
                  style={{ padding: '4px 8px' }}
                >
                  <span className="font-medium text-sm">Đăng nhập</span>
                </Link>
                <Link
                  to="/register"
                  className="px-3 flex-shrink-0 rounded-full ml-2 bg-green-500 hover:bg-green-700  no-underline text-gray-600"
                  style={{ padding: '4px 8px' }}
                >
                  <span className="font-medium text-sm text-white">Đăng ký</span>
                </Link>
              </div>
            ) : (
              <div ref={dropdown} className="relative inline-block text-left">
                <div
                  className="false text-gray-700 select-none bg-white cursor-pointer p-1 rounded-lg hover:bg-gray-200"
                  onClick={() => setIsShowPopupUser(!isShowPopupUser)}
                  aria-hidden="true"
                >
                  <div className="hover:text-black flex items-center">
                    {user.avatarUrl ? (
                      <Avatar alt="" src={getAvatar(user.avatarUrl)} style={{ width: 28, height: 28 }} />
                    ) : (
                      <Avatar style={{ width: 28, height: 28 }}>{user.fullName[0].toUpperCase()}</Avatar>
                    )}
                    <span className="hidden md:block text-sm mx-1 font-medium">{user.fullName}</span>
                    <ShowMore />
                  </div>
                </div>
                {isShowPopupUser && (
                  <div className="mt-1 absolute rounded border border-gray-400 shadow-lg right-0">
                    <div className="bg-white rounded whitespace-no-wrap z-50 shadow-sm">
                      {user.role === 'admin' && (
                        <Link
                          to="/admin/users"
                          target="_blank"
                          className="flex items-center rounded-t px-6 py-2 text-black hover:bg-green-200 cursor-pointer no-underline"
                          onClick={() => setIsShowPopupUser(!isShowPopupUser)}
                        >
                          <div>Admin</div>
                        </Link>
                      )}
                      <Link
                        to={`/users/${user.id}`}
                        className="flex items-center rounded-t px-6 py-2 text-black hover:bg-green-200 cursor-pointer no-underline"
                        onClick={() => setIsShowPopupUser(!isShowPopupUser)}
                      >
                        <div>Trang cá nhân</div>
                      </Link>
                      <Link
                        to="/users/setting"
                        className="flex items-center px-6 py-2 text-black hover:bg-green-200 cursor-pointer no-underline"
                        onClick={() => setIsShowPopupUser(!isShowPopupUser)}
                      >
                        <div>Cài đặt tài khoản</div>
                      </Link>
                      <div className="h-px bg-gray-400"> </div>
                      <Link
                        to="/posts/add?classify=forum"
                        className="flex items-center px-6 py-2 text-black hover:bg-green-200 cursor-pointer no-underline"
                        onClick={() => setIsShowPopupUser(!isShowPopupUser)}
                      >
                        <div>Đăng bài diễn đàn</div>
                      </Link>
                      <Link
                        to="/blogs/add"
                        className="flex items-center px-6 py-2 text-black hover:bg-green-200 cursor-pointer no-underline"
                        onClick={() => setIsShowPopupUser(!isShowPopupUser)}
                      >
                        <div>Tạo blog</div>
                      </Link>
                      <Link
                        to="/blogs?tab=me"
                        className="flex items-center px-6 py-2 text-black hover:bg-green-200 cursor-pointer no-underline"
                        onClick={() => setIsShowPopupUser(!isShowPopupUser)}
                      >
                        <div>Blog của tôi</div>
                      </Link>
                      <div className="h-px bg-gray-400"> </div>
                      <div
                        className="flex items-center px-6 py-2 hover:bg-green-200 cursor-pointer rounded-b"
                        onClick={() => {
                          setIsShowPopupUser(!isShowPopupUser)
                          dispatch({ type: types.S_AUTH_LOGOUT_REQUEST })
                          history.push('/login')
                        }}
                        aria-hidden="true"
                      >
                        <div className="text-gray-600 mr-3">
                          <Logout />
                        </div>
                        <div>Đăng xuất</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default HeaderNav
