import { BlogAPI } from '@/services'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Modal from 'Templates/commons/Modal'
import Modal3 from 'Templates/commons/Modal3'
import { Avatar } from '@material-ui/core'
import { getAvatar } from '@/helpers/common'
import { makeGetIsAuthenticated, makeGetMe } from '../auth/store/selector'
import InfoUser from './components/InfoBlog'
import UserFollower from './components/UserFollower'
import StatusBlogView from './containers/StatusBlogView'
import PostsBlogs from './PostsBlogs'
import { makeGetBlog, makeGetPostsBlog } from './store/selector'
import * as types from './store/action_types'
import BlogUpdate from './components/BlogUpdate'
import { S_Description } from './components/Blog.style'

function BlogView() {
  const { slug } = useParams()
  const dispatch = useDispatch()

  const user = makeGetMe()
  const isAuth = makeGetIsAuthenticated()
  const posts = makeGetPostsBlog()
  const blog = makeGetBlog({})

  const [isShowModalFollower, setIsShowModalFollower] = useState(false)
  const [isShowModalInfoUser, setIsShowModalInfoUser] = useState(false)
  const [isShowModalUpdateBlog, setIsShowModalUpdateBlog] = useState(false)

  const [usersFollowed, setUsersFollowed] = useState([])

  const isAuthorBlog = isAuth && blog.author?.id === user.id

  useEffect(() => {
    dispatch({ type: types.S_GET_BLOG, payload: slug })
  }, [])

  const fetchUserFollowed = async () => {
    try {
      const usersFollowedRes = await BlogAPI.getUserFollowed(blog.id)
      setUsersFollowed(usersFollowedRes)
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleShowFollower = () => {
    fetchUserFollowed()
    setIsShowModalFollower(prev => !prev)
  }

  const handleShowInfoUser = () => {
    setIsShowModalInfoUser(prev => !prev)
  }
  const handleShowUpdateBlog = () => {
    setIsShowModalUpdateBlog(prev => !prev)
  }

  return (
    <div className="bg-white m-auto lg:max-w-2xl">
      <div>
        <div className="mt-3">
          <img src={getAvatar(blog.cover)} alt={blog.slug} className="h-56 w-full object-cover" />
        </div>

        <div className="flex my-3 mx-2 md:mx-0">
          <img
            src={getAvatar(blog.avatar)}
            alt={blog.title}
            className="w-16 h-16 rounded-sm flex-shrink-0 object-cover"
          />

          <div className="ml-4 break-words min-w-0">
            <div className="font-medium text-2xl">{blog.title}</div>
            <S_Description className="font-light">{blog.description}</S_Description>
            <Link className="flex mt-1 items-center no-underline" to={`/users/${blog.author?.id}`}>
              {/* <img
                src={`${ENV.API_SERVER}${blog.author?.avatarUrl}`}
                alt={blog.title}
                className="rounded-full w-6 h-6"
              /> */}
              {blog.author?.avatarUrl ? (
                <Avatar
                  style={{ width: 28, height: 28 }}
                  src={getAvatar(blog.author?.avatarUrl)}
                  alt={blog.author?.fullName}
                />
              ) : (
                <Avatar style={{ width: 28, height: 28 }}>{blog.author?.fullName[0].toUpperCase()}</Avatar>
              )}
              <span className="text-gray-800 mr-3 text-sm ml-1 hover:underline">{blog.author?.fullName}</span>
            </Link>
          </div>
        </div>
        <div className="h-px bg-gray-300 mt-1" />
        <div className="flex items-center my-1 mx-2 md:mx-0 ">
          {isAuthorBlog ? (
            <>
              <Link
                className="hover:bg-green-500 text-sm bg-green-600 px-3 py-1 rounded cursor-pointer text-white font-light mr-3 no-underline"
                to={`/posts/add?classify=blog&blogSlug=${blog.slug}`}
              >
                Viết bài
              </Link>
              <div className="flex items-center text-sm mr-2">
                <div
                  className="font-light cursor-pointer hover:bg-gray-200 rounded p-1"
                  onClick={handleShowUpdateBlog}
                  aria-hidden="true"
                >
                  Chỉnh sửa
                </div>
              </div>
            </>
          ) : (
            <StatusBlogView blogId={blog?.id} authorId={blog?.author?.id} />
          )}
          <div
            className="font-light text-sm mr-2 cursor-pointer rounded hover:bg-gray-200 p-1 ml-2"
            onClick={handleShowInfoUser}
            aria-hidden="true"
          >
            Thông tin
          </div>
          <div
            className="font-light text-sm cursor-pointer rounded hover:bg-gray-200 p-1"
            onClick={handleShowFollower}
            aria-hidden="true"
          >
            {blog.followNum} người theo dõi
          </div>
        </div>
        <div className="h-px bg-gray-300 mb-3" />
      </div>
      {isShowModalFollower && (
        <Modal
          title="Lượt theo dõi"
          setIsShowModal={setIsShowModalFollower}
          component={UserFollower}
          users={usersFollowed}
        />
      )}

      {isShowModalInfoUser && (
        <Modal title="Thông tin blog" setIsShowModal={setIsShowModalInfoUser} component={InfoUser} blog={blog} />
      )}

      {isShowModalUpdateBlog && (
        <Modal3
          title="Chỉnh sửa blog"
          setIsShowModal={setIsShowModalUpdateBlog}
          component={BlogUpdate}
          dataBlog={blog}
        />
      )}

      <div>
        <PostsBlogs posts={posts} type="postsBlog" />
      </div>
    </div>
  )
}

export default BlogView
