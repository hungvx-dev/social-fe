import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Avatar } from '@material-ui/core'

import { PostAPI } from '@/services'
import { getAvatar, replaceImg, timeSince } from '@/helpers/common'
import { LayoutContainer } from '@/_layouts'
import { Visibility } from 'Templates/icon/IconsSvg'

import { useShouldShowModal } from '@/hooks/useShowModalLogin'
import { makeGetSocketWithType } from '@/_layouts/Socket'
import Comments from '../comment/Comments'
import InputComment from '../comment/InputComment'
import * as types from '../comment/store/action_types'
import { S_NameAuthorLink } from '../comment/Comment.style'
import { makeGetCommentsPost } from '../comment/store/selector'
import PostViewFooterBlog from './components/PostViewFooterBlog'
import { makeGetIsAuthenticated, makeGetMe } from '../auth/store/selector'
import { S_InfoUser, S_PostInfo, S_PostMainView, S_PostMainContent, S_PostMainForum } from '../home/Post.style'
import StatusBlogView from '../blog/containers/StatusBlogView'
import * as typesHome from '../home/store/action_types'
import { makeGetPost } from '../home/store/selector'

function PostViewBlog() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const user = makeGetMe()
  const comments = makeGetCommentsPost()
  const isAuth = makeGetIsAuthenticated()
  const socket = makeGetSocketWithType()
  const post = makeGetPost()

  const [loading, setLoading] = useState(true)
  const [commentsUserVote, setCommentsUserVote] = useState({})
  const [postUserVote, setPostUserVote] = useState({})

  useEffect(() => {
    dispatch({ type: types.S_FETCH_COMMENTS_POST, payload: id })
    dispatch({ type: typesHome.S_GET_POST, payload: { id, socket } })
    socket.on('DeletePost', () => history.push('/'))

    const fetchPost = async () => {
      try {
        if (isAuth) {
          const postsUserVoted = await PostAPI.getPostsUserLiked()
          const commentsVoted = await PostAPI.getCommentsLiked(id)

          setCommentsUserVote(commentsVoted)
          setPostUserVote(postsUserVoted)
        }
      } catch (error) {
        throw new Error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()

    return () => {
      socket.off('DeletePost')
      socket.emit('LeavingRoom')
      dispatch({ type: typesHome.RESET_POST })
    }
  }, [])

  const handleSubmitComment = async ({ content }, { resetForm }) => {
    if (await useShouldShowModal({ dispatch, isAuth, type: 'login' })) {
      resetForm()
      return
    }

    const data = { content: content.slice(0, -1), postId: post.id }
    dispatch({ type: types.S_CREATE_COMMENT_POST, payload: { data, socket } })
    resetForm()
  }
  console.log(post)

  if (!loading && post && post.isBlock) {
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        {' '}
        <span style={{ color: 'red', fontSize: '20px' }}>Bài viết đã bị khóa</span>
      </div>
    )
  }

  return (
    <LayoutContainer style={{ padding: '8px 6px' }}>
      {!loading && post && (
        <S_PostMainForum style={{ paddingBottom: 200 }}>
          <S_PostInfo>
            <S_PostMainView>
              <div className="flex items-center">
                <Link to={`/blogs/${post.blog?.slug}`} className="text-sm font-medium break-words block no-underline">
                  Blog / <span style={{ marginRight: 8 }}> {post.blog?.title} </span>
                </Link>

                <StatusBlogView blogId={post.blog?.id} authorId={post.blog?.author?.id} />
              </div>
              <h1 style={{ marginTop: 24 }}>{post.title}</h1>

              <S_InfoUser>
                <div>
                  {post.author?.avatarUrl ? (
                    <Avatar alt={post.author?.fullName} src={getAvatar(post.author?.avatarUrl)} />
                  ) : (
                    <Avatar>{post.author?.fullName[0].toUpperCase()}</Avatar>
                  )}
                </div>

                <div style={{ marginLeft: '16px' }}>
                  <S_NameAuthorLink style={{ fontSize: '1rem', fontWeight: 400 }} to={`/users/${post.author?.id}`}>
                    {post.author.fullName}
                  </S_NameAuthorLink>
                  {/* <p>{post.author?.fullName}</p> */}
                  <p
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#718096',
                      fontSize: 14,
                    }}
                  >
                    {timeSince(post.createdAt)},
                    <Visibility width={18} style={{ margin: '0 6px' }} />
                    {post.viewNum}
                  </p>
                </div>
              </S_InfoUser>

              <S_PostMainContent dangerouslySetInnerHTML={{ __html: replaceImg(post.content) }} className="post-view" />
            </S_PostMainView>

            <PostViewFooterBlog
              post={post}
              socket={socket}
              isAuth={isAuth}
              userId={user.id}
              isVote={isAuth && postUserVote[post.id]}
            />
            <div className="h-px bg-gray-200 mt-5" />

            <Comments type="blog" comments={comments} commentsUserVote={isAuth ? commentsUserVote : {}} />

            <InputComment placeholder="Viết bình luận..." onSubmitComment={handleSubmitComment} />
          </S_PostInfo>
        </S_PostMainForum>
      )}
    </LayoutContainer>
  )
}

export default PostViewBlog
