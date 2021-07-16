import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import { ThreeDot } from 'Templates/icon/IconsSvg'
import ThreeDotMenu from 'Templates/features/ThreeDotMenu'

export const S_Comment = styled.div`
  display: flex;
`
export const S_CommentMain = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  margin-top: 6px;
  margin-bottom: 6px;
`
export const S_Avatar = styled.div`
  margin-top: 6px;
`
export const S_CommentContent = styled.div`
  background-color: rgb(245, 245, 245);
  padding: 4px 8px;
  border-radius: 16px;
`
export const S_NameAuthorLink = styled(Link)`
  margin-right: 10px;
  color: #000;
  font-weight: bold;
  font-size: 0.875rem;
  :hover {
    text-decoration: underline;
  }
`
export const S_TitleReply = styled.div`
  margin-top: 4px;
  color: rgb(113, 128, 150);
  font-size: 13px;
  font-style: italic;
`

export const S_Vote = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 0 4px 0 4px;
  height: 22px;
`

export const S_UpVote = styled.button`
  height: 20px;
  padding: 2px;
  background: none;

  color: ${props => (!props.isVoted ? '#a0aec0 !important' : '#63b3ed !important')};
  cursor: pointer;
  :hover {
    border-radius: 4px;
    background: #e2e8f0;
  }
`

export const S_Like = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

export const S_HeartLike = styled.div`
  padding: 2px;
  background: none;

  /* color: ${props => (!props.isVoted ? '#a0aec0 !important' : '#63b3ed !important')}; */
  cursor: pointer;
  :hover {
    border-radius: 4px;
    background: #e2e8f0;
  }
`

export const S_DownVote = styled.button`
  height: 20px;
  padding: 2px;
  background: none;

  color: ${props => (!props.isVoted ? '#a0aec0 !important' : '#e53e3e !important')};
  cursor: pointer;
  :hover {
    border-radius: 4px;
    background: #e2e8f0;
  }
`

export const S_Footer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`

export const S_ResetButton = styled(Button)`
  min-width: none;
  text-transform: none;
  letter-spacing: none;
  font-weight: none;
`

export const M_Button = css`
  display: flex;
  align-items: center;
  color: inherit;
  padding: 4px 4px !important;
  border-radius: 4px;
  font-weight: 500;

  background: none;
  outline: none;
  border: none;

  cursor: pointer;
  :hover {
    background-color: rgba(237, 242, 247, var(--bg-opacity));
  }
`
export const S_FooterLink = styled.button`
  ${M_Button}
`

export const S_ThreeDot = styled(ThreeDot)`
  width: 18px !important;
  color: rgb(113, 128, 150);
`
export const S_ThreeDotMenu = styled(ThreeDotMenu)`
  ${M_Button}
`

export const S_LineCurves = styled.div`
  position: absolute;
  height: 30px;
  margin: 10% auto;
  top: -12px;
  left: -29px;
  width: 25px;
  border: solid 2px #d2d2d2;
  border-color: transparent transparent #d2d2d2 #d2d2d2;
  border-radius: 0 0 0 100%/25px;
`

export const S_LineStraight = styled.div`
  height: calc(100% - 150px);
  width: 2px;
  margin: 10% auto;

  background: #d2d2d2;
`

export const S_EditComment = styled.div`
  font-size: 12px;
  .cancel-edit {
    display: inline-block;
    margin-top: 4px;
    font-size: 12px;
    text-decoration: underline;
    color: #0357ff;
    cursor: pointer;
  }
  .edit-text {
    display: inline-block;
    margin-top: 4px;
  }
`
