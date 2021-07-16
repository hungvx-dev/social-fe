import React, { useEffect, useState } from 'react'

import { DownVote, UpVote, Heart, HeartLine } from 'Templates/icon/IconsSvg'
import { CommentAPI } from '@/services'

import { useShouldShowModal } from '@/hooks/useShowModalLogin'
import { useDispatch } from 'react-redux'
import { makeGetSocketWithType } from '@/_layouts/Socket'
import { S_DownVote, S_Like, S_UpVote, S_Vote, S_HeartLike } from '../Comment.style'

function CommentVote({ isAuth, type, isVote, commentId, commentVoteTotal, userId }) {
  const dispatch = useDispatch()
  const socket = makeGetSocketWithType()

  const [vote, setVote] = useState({
    voteTotal: commentVoteTotal,
    vote: isVote || 0,
  })

  useEffect(() => {
    const handleVote = ({ _vote, _commentId, _userId }) => {
      if (_commentId === commentId) {
        setVote(prev =>
          userId === _userId
            ? _vote
            : {
                voteTotal: _vote.voteTotal,
                vote: prev.vote,
              }
        )
      }
    }

    type === 'forum' ? socket.on('VoteComment', handleVote) : socket.on('LikeComment', handleVote)
    return () => {
      type === 'forum' ? socket.off('VoteComment', handleVote) : socket.off('LikeComment', handleVote)
    }
  }, [])

  const handleVoteComment = async (_commentId, voteNum) => {
    if (await useShouldShowModal({ dispatch, isAuth, type: 'login' })) return

    try {
      const voteData = await CommentAPI.voteComment(_commentId, voteNum)
      const voteNew = {
        voteTotal: voteData.vote,
        vote: vote.vote === voteNum ? 0 : voteNum,
      }
      setVote(voteNew)

      socket.emit('VoteComment', { vote: voteNew, commentId, userId })
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleLikeComment = async _commentId => {
    if (await useShouldShowModal({ dispatch, isAuth, type: 'login' })) return

    const voteData = await CommentAPI.likeComment(_commentId)
    const likeNew = {
      voteTotal: voteData.vote,
      vote: !vote.vote,
    }
    socket.emit('LikeComment', { vote: likeNew, commentId, userId })
    setVote(likeNew)
  }

  return (
    <>
      {type === 'forum' ? (
        <S_Vote>
          <S_UpVote onClick={() => handleVoteComment(commentId, 1)} isVoted={vote?.vote === 1}>
            <UpVote width={14} />
          </S_UpVote>
          <span style={{ fontSize: 16, margin: '0 3px', color: '#718096' }}>{vote.voteTotal}</span>
          <S_DownVote onClick={() => handleVoteComment(commentId, -1)} isVoted={vote?.vote === -1}>
            <DownVote width={14} />
          </S_DownVote>
        </S_Vote>
      ) : (
        <S_Like>
          <S_HeartLike onClick={() => handleLikeComment(commentId)}>
            {vote.vote ? (
              <Heart width={14} style={{ color: '#f56565' }} />
            ) : (
              <HeartLine width={14} style={{ color: '#f56565' }} />
            )}
          </S_HeartLike>

          <span style={{ fontSize: 14, margin: '0 3px', color: '#718096' }}>{vote.voteTotal} lượt thích</span>
        </S_Like>
      )}
    </>
  )
}

export default CommentVote
