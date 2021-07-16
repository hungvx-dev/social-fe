import React, { useEffect, useState } from 'react'

import { CommentSquareLine, Heart, HeartLine, ShareLine } from 'Templates/icon/IconsSvg'
import { S_FooterMainLink, S_SHARE, S_PostViewFooter, S_FooterText } from '@/modules/home/Post.style'
import { S_HeartLike, S_Like, S_ThreeDotMenu } from '@/modules/comment/Comment.style'
import { PostAPI } from '@/services'
import * as typesHome from '@/modules/home/store/action_types'
import { useDispatch } from 'react-redux'
import { useShouldShowModal } from '@/hooks/useShowModalLogin'
import { useHistory } from 'react-router-dom'
import Modal3 from 'Templates/commons/Modal3'
import { toast } from 'react-toastify'
import DropdownComponent from 'Templates/dropDown/DropdownComponent'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { ENV } from '@/_constants/common'
import PostUpdate from './PostUpdate'

function PostViewFooterBlog({ isAuth, isVote, userId, post, socket }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const handleCopy = useCopyToClipboard()[1]

  const [isShowUpdatePost, setIsShowUpdatePost] = useState(false)
  const [vote, setVote] = useState({
    voteTotal: post.voteNum,
    vote: isVote,
  })

  useEffect(() => {
    const handleLike = ({ _vote, _userId }) => {
      setVote(prev =>
        userId === _userId
          ? _vote
          : {
              voteTotal: _vote.voteTotal,
              vote: prev.vote,
            }
      )
    }

    socket.on('LikePost', handleLike)
    return () => socket.off('LikePost', handleLike)
  }, [])

  const handleLikePost = async _postId => {
    if (await useShouldShowModal({ dispatch, isAuth, type: 'login' })) return

    const likeData = await PostAPI.likePost(_postId)
    const likeNew = {
      voteTotal: likeData.vote,
      vote: !vote.vote,
    }
    socket.emit('LikePost', { vote: likeNew, userId })
    setVote(likeNew)
  }

  const handleDelete = async id => {
    try {
      await PostAPI.destroy(id)
      socket.emit('DeletePost', id)
      toast.success('Xóa bài viết thành công')
      history.push('/')
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleUpdate = () => {
    setIsShowUpdatePost(prev => !prev)
  }

  const handleReport = async () => {
    if (await useShouldShowModal({ dispatch, isAuth, type: 'login' })) return
    dispatch({ type: typesHome.APP_UPDATE_IS_REPORT, payload: { type: 'post', id: post.id } })
  }

  return (
    <>
      {post && (
        <S_PostViewFooter>
          <S_Like style={{ marginRight: 18 }}>
            <S_HeartLike onClick={() => handleLikePost(post.id)}>
              {vote.vote ? (
                <Heart width={16} style={{ color: '#f56565' }} />
              ) : (
                <HeartLine width={16} style={{ color: '#f56565' }} />
              )}
            </S_HeartLike>

            <S_FooterText>{vote.voteTotal} lượt thích</S_FooterText>
          </S_Like>

          <S_FooterMainLink>
            <CommentSquareLine width={16} />
            <S_FooterText>{post.commentNum} Bình luận</S_FooterText>
          </S_FooterMainLink>

          <DropdownComponent
            component={() => (
              <S_SHARE>
                <ShareLine width={16} />
                <S_FooterText>Chia sẽ</S_FooterText>
              </S_SHARE>
            )}
            options={[
              {
                title: 'Copy Link',
                onClick: () => {
                  handleCopy(`${ENV.HOST}blogs/posts/${post.id}`)
                  toast.success('Copied thành công')
                },
              },
            ]}
          />

          <S_ThreeDotMenu
            options={
              userId === post.author?.id
                ? [
                    { title: 'Xóa', onClick: () => handleDelete(post.id) },
                    { title: 'Chỉnh sửa', onClick: handleUpdate },
                  ]
                : [{ title: 'Báo xấu', onClick: handleReport }]
            }
          />
        </S_PostViewFooter>
      )}
      {isShowUpdatePost && (
        <Modal3
          title="Chỉnh sửa bài viết"
          setIsShowModal={setIsShowUpdatePost}
          component={PostUpdate}
          dataPost={post}
          classify="blog"
          type="post"
        />
      )}
    </>
  )
}

export default PostViewFooterBlog
