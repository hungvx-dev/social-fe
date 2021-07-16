import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { CommentLine } from 'Templates/icon/IconsSvg'
import * as typesHome from '@/modules/home/store/action_types'
import { useShouldShowModal } from '@/hooks/useShowModalLogin'
import { makeGetSocketWithType } from '@/_layouts/Socket'
import { getAvatar } from '@/helpers/common'
import { getStorage, removeStorage } from '@/helpers/storage'
import {
  S_Footer,
  S_FooterLink,
  S_Avatar,
  S_CommentMain,
  S_Comment,
  S_CommentContent,
  S_NameAuthorLink,
  S_TitleReply,
  S_ThreeDotMenu,
  S_LineCurves,
  S_LineStraight,
  S_EditComment,
} from './Comment.style'
import InputComment from './InputComment'
import CommentVote from './components/CommentVote'
import * as types from './store/action_types'

function Comment({ i, type, comment, userId, handleReplyCommentChild, commentsUserVote, isLasts, isAuth }) {
  const dispatch = useDispatch()
  const socket = makeGetSocketWithType()

  const [isReply, setIsReply] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [commentReply, setCommentReply] = useState(comment)

  useEffect(() => () => removeStorage(comment.id), [])

  const handleSubmitComment = async ({ content }) => {
    if (await useShouldShowModal({ dispatch, isAuth, type: 'login' })) return

    const data = {
      content: content.slice(0, -1),
      postId: commentReply.post.id,
      parentId: commentReply.id,
    }
    dispatch({ type: types.S_CREATE_CHILD_COMMENT, payload: { data, socket } })
    setIsReply(prev => !prev)
  }

  const handleEditComment = async ({ content }) => {
    dispatch({ type: types.S_UPDATE_COMMENT, payload: { comment, content: content.slice(0, -1), socket } })
    setIsEdit(prev => !prev)
  }

  const onReplyCommentChild = async _comment => {
    if (await useShouldShowModal({ dispatch, isAuth, type: 'login' })) return

    setIsReply(true)
    setCommentReply(_comment)
  }

  const cancelReply = e => {
    if (e.key === 'Escape') {
      setIsReply(false)
      document.body.removeEventListener('keydown', cancelReply)
    }
  }

  const handleReplyComment = async () => {
    if (await useShouldShowModal({ dispatch, isAuth, type: 'login' })) return

    if (handleReplyCommentChild) {
      handleReplyCommentChild()
    }
    document.body.addEventListener('keydown', cancelReply)
    setIsReply(true)
  }

  const handleDelete = () => {
    dispatch({ type: types.S_DELETE_COMMENT, payload: { comment, socket } })
  }

  const cancelEdit = e => {
    if (e.key === 'Escape') {
      setIsEdit(false)
      document.body.removeEventListener('keydown', cancelEdit)
    }
  }

  const handleUpdate = () => {
    setIsEdit(true)
    document.body.addEventListener('keydown', cancelEdit)
  }

  const handleReport = async () => {
    if (await useShouldShowModal({ dispatch, isAuth, type: 'login' })) return

    dispatch({ type: typesHome.APP_UPDATE_IS_REPORT, payload: { type: 'comment', id: comment.id } })
  }

  return (
    <S_Comment>
      <S_Avatar style={{ position: 'relative' }}>
        {comment.author?.avatarUrl ? (
          <Avatar alt={comment.author?.fullName} src={getAvatar(comment.author?.avatarUrl)} />
        ) : (
          <Avatar>{comment.author?.fullName[0].toUpperCase()}</Avatar>
        )}
        {handleReplyCommentChild ? (
          <S_LineCurves />
        ) : (
          (!isLasts || i === 0 || (isLasts && comment.commentsChild.length > 0)) && <S_LineStraight />
        )}
      </S_Avatar>
      <S_CommentMain style={{ width: '100%' }}>
        {isEdit ? (
          <S_EditComment>
            <InputComment comment={comment} onSubmitComment={handleEditComment} />
            <span className="edit-text">Nhấn Esc để </span>{' '}
            <span type="button" className="cancel-edit" onClick={() => setIsEdit(false)} aria-hidden="true">
              hủy
            </span>
          </S_EditComment>
        ) : (
          <>
            <S_CommentContent style={{ border: comment.id === getStorage(comment.id) && '1px solid red' }}>
              <div>
                <S_NameAuthorLink to={`/users/${comment.author.id}`}>{comment.author.fullName}</S_NameAuthorLink>
                {comment.userBeingReply && comment.userBeingReply.id !== comment.author.id && (
                  <Link to={`/users/${comment.userBeingReply.id}`} style={{ color: '#38a169', fontSize: '0.875rem' }}>
                    @{comment.userBeingReply.fullName}
                  </Link>
                )}
              </div>
              <div style={{ margin: `6px 0px` }}>{comment.content}</div>
            </S_CommentContent>

            <S_Footer>
              <CommentVote
                type={type}
                isAuth={isAuth}
                userId={userId}
                commentId={comment.id}
                commentVoteTotal={comment.voteNum}
                isVote={commentsUserVote[comment.id]}
              />

              <S_FooterLink type="button" onClick={handleReplyComment} style={{ margin: '0 8px', color: '#718096' }}>
                <CommentLine width={14} style={{ marginRight: '2px' }} />
                Trả lời
              </S_FooterLink>

              <S_ThreeDotMenu
                options={
                  userId === comment.author?.id
                    ? [
                        { title: 'Xóa', onClick: handleDelete },
                        { title: 'Chỉnh sửa', onClick: handleUpdate },
                      ]
                    : [{ title: 'Báo xấu', onClick: handleReport }]
                }
              />
            </S_Footer>
          </>
        )}

        {comment.commentsChild?.length > 0 && (
          <div className="commentChild" style={{ marginTop: '8px' }}>
            {comment.commentsChild.map(commentChild => (
              <Comment
                isAuth={isAuth}
                type={type}
                userId={userId}
                key={commentChild.id}
                comment={commentChild}
                commentsUserVote={commentsUserVote}
                handleReplyCommentChild={() => onReplyCommentChild(commentChild)}
              />
            ))}
          </div>
        )}

        {isReply && !handleReplyCommentChild && (
          <>
            <S_TitleReply>
              Đang trả lời cho &ensp;•&ensp;
              <Link to={`/users/${commentReply.author?.id}`} style={{ color: '#38a169' }}>
                {commentReply.author?.fullName}
              </Link>
            </S_TitleReply>
            <S_EditComment>
              <InputComment placeholder="Viết câu trả lời..." onSubmitComment={handleSubmitComment} />
              <span className="edit-text">Nhấn Esc để </span>{' '}
              <span type="button" className="cancel-edit" onClick={() => setIsReply(false)} aria-hidden="true">
                hủy
              </span>
            </S_EditComment>
          </>
        )}
      </S_CommentMain>
    </S_Comment>
  )
}

export default Comment
