import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { BlogAPI, UserAPI } from '@/services'
import { getAvatar, timeSince } from '@/helpers/common'
import { LayoutBg, LayoutUser } from '@/_layouts'
import { Avatar } from '@material-ui/core'
import Modal3 from 'Templates/commons/Modal3'

import { makeGetIsAuthenticated, makeGetMe } from '../auth/store/selector'
import Blogs from '../blog/Blogs'
import Posts from '../home/Posts'
import * as types from '../home/store/action_types'
import UploadAvatar from './components/UploadAvatar'
import UpdateInfo from './components/UpdateInfo'
import { makeGetPosts } from '../home/store/selector'

const initialTabs = {
  blogs: false,
  forum: false,
}

function UserView() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const userMe = makeGetMe()
  const isAuth = makeGetIsAuthenticated()

  const [user, setUser] = useState(userMe.id === id ? userMe : null)
  const [blogs, setBlogs] = useState([])
  const [tabs, setTabs] = useState({ ...initialTabs, forum: true })
  const [isShowUploadAvatar, setIsShowUploadAvatar] = useState(false)
  const [isShowUpdateInfo, setIsShowUpdateInfo] = useState(false)
  const posts = makeGetPosts()

  useEffect(() => {
    setUser(() => ({ ...userMe }))
  }, [userMe, id])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await UserAPI.show(id)
        setUser(userRes)
      } catch (error) {
        throw new Error(error)
      }
    }

    const fetchBlogsUser = async () => {
      try {
        const blogsData = await BlogAPI.getBlogsUser(id)
        setBlogs(blogsData)
      } catch (error) {
        throw new Error(error)
      }
    }
    const fetchPosts = () => dispatch({ type: types.S_FETCH_POSTS_USER, payload: id })
    const getPostsVoted = () => dispatch({ type: types.S_FETCH_POSTS_VOTED })

    userMe.id !== id && fetchUser()
    fetchBlogsUser()
    fetchPosts()
    if (isAuth) {
      getPostsVoted()
    }
  }, [id])

  const moveTab = tab => {
    setTabs({ ...initialTabs, [tab]: true })
  }

  const handleChangeAvatar = () => {
    setIsShowUploadAvatar(prev => !prev)
  }

  return (
    <LayoutBg>
      <LayoutUser>
        {user && Object.keys(user).length > 0 && (
          <div className="flex items-center mx-8 pt-5">
            <div className="rounded-full bg-white" style={{ padding: 2 }}>
              <AvatarWrapper className="w-16 h-16 rounded-full relative ">
                {user.avatarUrl ? (
                  <Avatar style={{ width: 64, height: 64 }} src={getAvatar(user.avatarUrl)} alt={user.username} />
                ) : (
                  <Avatar style={{ width: 64, height: 64 }}>{user.fullName[0].toUpperCase()}</Avatar>
                )}
                {isAuth && userMe.id === id && (
                  <div
                    className="avatar-upload hidden absolute top-0 left-0 bottom-0 right-0 bg-gray-900 bg-opacity-50 rounded-full flex justify-center cursor-pointer"
                    onClick={handleChangeAvatar}
                    aria-hidden="true"
                  >
                    <div className="text-white self-center mr-1">
                      <i className="far fa-image" />
                    </div>
                    <div className="self-center text-white">Đổi</div>
                  </div>
                )}
              </AvatarWrapper>
            </div>
            <div className="ml-3">
              <div className="font-medium text-black text-xl mb-2">
                {user.fullName} <span className="text-sm text-gray-600"> ({user.username})</span>
              </div>
              <div className="font-light">{user.introduction}</div>
              <div className="text-sm text-gray-600">Đã tham gia {timeSince(user.createdAt)}</div>
            </div>
          </div>
        )}
        <div className="flex mt-2 items-center">
          <div
            className={`ml-5 cursor-pointer py-2 px-1 hover:text-black border-b-2 text-gray-700 ${
              tabs.forum && 'border-green-700 text-black'
            }`}
            onClick={() => moveTab('forum')}
            aria-hidden="true"
          >
            Diễn đàn
          </div>
          <div
            className={`ml-8 cursor-pointer py-2 px-1 hover:text-black border-b-2 ${
              tabs.blogs && 'border-green-700 text-black'
            }`}
            onClick={() => moveTab('blogs')}
            aria-hidden="true"
          >
            Blog
          </div>
          {userMe && user && userMe.id === user.id && (
            <div
              className="ml-5 cursor-pointer px-2 py-1 bg-gray-300 hover:bg-gray-500 rounded-md text-gray-900"
              onClick={() => setIsShowUpdateInfo(true)}
              aria-hidden="true"
            >
              <span className="ml-1">Sửa thông tin</span>
            </div>
          )}
        </div>
        <div className="mx-8">
          {tabs.blogs && (
            <>
              {isAuth && (
                <div className="flex items-center justify-between mt-1 mb-5">
                  <div className="mt-1 rounded cursor-pointer shadow-box bg-linear-1" style={{ padding: '5px 10px' }}>
                    <Link to="/blogs/add" className="text-white">
                      Tạo blog mới
                    </Link>
                  </div>
                </div>
              )}
              <Blogs blogs={blogs} />
            </>
          )}
        </div>
        <div className="mx-2">
          <div className="py-2 md:py-5 md:pl-5 md:pr-3 min-w-0 w-full">{tabs.forum && <Posts posts={posts} />}</div>
        </div>
        {isAuth && isShowUploadAvatar && (
          <Modal3 title="Đổi ảnh đại diện" setIsShowModal={setIsShowUploadAvatar} component={UploadAvatar} />
        )}
        {isAuth && isShowUpdateInfo && (
          <Modal3 title="Chỉnh sửa hồ sơ" setIsShowModal={setIsShowUpdateInfo} component={UpdateInfo} data={user} />
        )}
      </LayoutUser>
    </LayoutBg>
  )
}

export default UserView

const AvatarWrapper = styled.div`
  :hover {
    .avatar-upload {
      display: inline-flex;
    }
  }
`
