import React, { useEffect, useState } from 'react'

import { votePost } from '@/services/post'
import { capitalizeFirstLetter, getAvatar, getInnerText, timeSince } from '@/helpers/common'
import { Icons } from 'Templates/icon/Icon'
import { DownVote, UpVote } from 'Templates/icon/IconsSvg'
import { useDispatch } from 'react-redux'
import { PostAPI } from '@/services'
import Modal3 from 'Templates/commons/Modal3'
import { useShouldShowModal } from '@/hooks/useShowModalLogin'
import { makeGetSocketWithType } from '@/_layouts/Socket'
import { toast } from 'react-toastify'
import DropdownComponent from 'Templates/dropDown/DropdownComponent'
import { ENV } from '@/_constants/common'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import {
  S_Avatar,
  S_AvatarDefault,
  S_Comment,
  S_DownVote,
  S_FooterLink,
  S_Icon,
  S_ImageAvatar_2,
  S_ImageDefault,
  S_Post,
  S_PostContent,
  S_PostFooter,
  S_PostInfo,
  S_PostMain,
  S_PostTitle,
  S_PostTop,
  S_Share,
  S_TopLink,
  S_UpVote,
  S_Vote,
} from './Post.style'

import { S_ThreeDotMenu } from '../comment/Comment.style'
import * as types from './store/action_types'
import PostUpdate from '../post/components/PostUpdate'

function Post({ refProp, isAuth, post, isVote, userId, voteSocket }) {
  const dispatch = useDispatch()
  const socket = makeGetSocketWithType()
  const handleCopy = useCopyToClipboard()[1]

  const [isShowUpdatePost, setIsShowUpdatePost] = useState(false)
  const [vote, setVote] = useState({
    voteTotal: post?.voteNum,
    vote: isVote,
  })

  useEffect(() => {
    setVote(prev => ({ ...prev, vote: isVote }))
  }, [isVote])

  useEffect(() => {
    if (voteSocket !== undefined) {
      setVote(prev =>
        userId === voteSocket.userId
          ? voteSocket.vote
          : {
              voteTotal: voteSocket.vote.voteTotal,
              vote: prev.vote,
            }
      )
    }
  }, [voteSocket])

  const handleVotePost = async (postId, voteNum) => {
    if (await useShouldShowModal({ dispatch, isAuth, type: 'login' })) return

    const voteData = await votePost(postId, voteNum)
    const voteNew = {
      voteTotal: voteData.vote,
      vote: vote.vote === voteNum ? 0 : voteNum,
    }
    socket.emit('VotePost', { vote: voteNew, postId, userId })
    setVote(voteNew)
  }

  const handleDelete = async id => {
    try {
      await PostAPI.destroy(id)
      toast.success('Xóa bài viết thành công')
      dispatch({ type: types.REMOVE_POST, payload: id })
    } catch (error) {
      throw new Error(error)
    }
    // dispatch({ type: types.S_DELETE_COMMENT, payload: comment })
  }

  const handleUpdate = () => {
    setIsShowUpdatePost(prev => !prev)
  }

  const handleReport = async () => {
    if (await useShouldShowModal({ dispatch, isAuth, type: 'login' })) return
    dispatch({ type: types.APP_UPDATE_IS_REPORT, payload: { type: 'post', id: post.id } })
  }

  return (
    <S_Post className="shadow-box-2 rounded-lg" style={{ margin: '8px 0' }} ref={refProp}>
      <S_Vote>
        <S_UpVote onClick={() => handleVotePost(post.id, 1)} isVoted={vote?.vote === 1}>
          <UpVote />
        </S_UpVote>
        <span className="p-2">{vote.voteTotal}</span>
        <S_DownVote onClick={() => handleVotePost(post.id, -1)} isVoted={vote?.vote === -1}>
          <DownVote />
        </S_DownVote>
      </S_Vote>

      <S_Avatar to={`/topics/posts/${post.id}`}>
        <S_AvatarDefault>
          {post.avatar ? <S_ImageAvatar_2 src={getAvatar(post.avatar)} alt={post.topic?.slug} /> : <S_ImageDefault />}
        </S_AvatarDefault>
      </S_Avatar>

      <S_PostInfo>
        <S_PostTop>
          <S_TopLink to={`/topics/${post.topic?.slug}`}>
            <S_Icon icon={Icons[capitalizeFirstLetter(post.topic?.slug)]} width={16} />
            {post.topic?.name}
          </S_TopLink>
          &ensp;•&ensp;bởi&ensp;
          <S_TopLink to={`/users/${post.author?.id}`}>{post.author?.fullName}</S_TopLink>
          &ensp;•&ensp;{timeSince(post.createdAt)}
        </S_PostTop>

        <S_PostMain>
          <S_PostTitle to={`/topics/posts/${post.id}`}>{post.title}</S_PostTitle>
          <S_PostContent to={`/topics/posts/${post.id}`}>{getInnerText(post.content)}</S_PostContent>
        </S_PostMain>

        <S_PostFooter>
          <S_FooterLink to={`/topics/posts/${post.id}`}>
            <S_Comment />
            <span style={{ marginLeft: 4, marginRight: 19 }}>{post.commentNum} Bình luận</span>
          </S_FooterLink>

          <DropdownComponent
            component={() => (
              <>
                <S_Share />
                <span style={{ marginLeft: 4, marginRight: 19 }}>Chia sẽ</span>
              </>
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
                    { title: 'Xóa bài viết', onClick: () => handleDelete(post.id) },
                    { title: 'Sửa bài viết', onClick: handleUpdate },
                  ]
                : [{ title: 'Báo xấu', onClick: handleReport }]
            }
          />
        </S_PostFooter>
      </S_PostInfo>
      {isShowUpdatePost && (
        <Modal3
          title="Chỉnh sửa bài viết"
          setIsShowModal={setIsShowUpdatePost}
          component={PostUpdate}
          dataPost={post}
          classify="forum"
          type="topic"
        />
      )}
    </S_Post>
  )
}

export default Post
