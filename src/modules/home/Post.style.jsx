import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

import {
  ImageDefault,
  Comment,
  Share,
  ThreeDot,
  CommentSquare,
  CommentSquareLine,
  ShareLine,
} from 'Templates/icon/IconsSvg'
import { Icon } from 'Templates/icon/Icon'

export const S_Post = styled.div`
  display: flex;
  /* align-items: flex-start; */
  --border-opacity: 1;
  /* border-top: 1px solid rgba(203, 213, 224, var(--border-opacity)); */
  /* border-right: 1px solid rgba(203, 213, 224, var(--border-opacity)); */
  /* border-left: 1px solid rgba(203, 213, 224, var(--border-opacity)); */
  background-color: white;
`

export const S_Vote = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: rgb(248, 249, 250);
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;

  width: 32px;
  padding: 8px 4px;
`

export const S_VoteRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgb(248, 249, 250);
  margin-right: 18px;
  padding: 2px 6px;
  border: 1px solid #ccc;
  border-radius: 15px;
`

export const S_Avatar = styled(Link)`
  min-width: 110px;
  margin: 8px 0px 8px 4px;
`
export const S_AvatarDefault = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 110px;
  background: #f5f5f5;
  justify-content: center;
  border-radius: 5px;
`
export const S_ImageAvatar = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90%;
  object-fit: cover;
  border-radius: 8px;
`

export const S_ImageAvatar_2 = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`

const M_Comment = css`
  width: 14px !important;
  color: rgb(113, 128, 150);
`

export const S_ImageDefault = styled(ImageDefault)`
  color: #e2e8f0;
  font-size: 50px !important;
`
export const S_Comment = styled(Comment)`
  ${M_Comment}
`
export const S_CommentSquare = styled(CommentSquare)`
  ${M_Comment}
`
export const S_CommentSquareLine = styled(CommentSquareLine)`
  ${M_Comment}
`
export const S_Share = styled(Share)`
  ${M_Comment}
`

export const S_ShareLine = styled(ShareLine)`
  ${M_Comment}
`

export const S_ThreeDot = styled(ThreeDot)`
  width: 18px !important;
  color: rgb(113, 128, 150);
`

export const S_PostMainTop = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0 16px 0;

  color: #718096;
  font-size: 13px !important;
`

export const S_PostTop = styled.div`
  display: flex;
  align-items: center;
  margin: 8px;

  color: #718096;
  font-size: 13px !important;
`

export const S_PostInfo = styled.div`
  width: 100%;
`

export const S_PostFooter = styled.div`
  display: flex;
  align-items: center;
  margin: 0 8px;
  color: rgb(113, 128, 150);
  line-height: 24px;
  font-size: 14px !important;
  font-weight: 500;
`

export const S_PostViewFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 20px;
  color: rgb(113, 128, 150);
  line-height: 24px;
  font-size: 14px !important;
`
export const S_TextFormat = css`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  line-height: 1.2rem;
`

export const S_PostTitle = styled(Link)`
  font-weight: 500;
  color: #1a202c !important;
  font-size: 16px !important;
  cursor: pointer;
  -webkit-line-clamp: 1;

  ${S_TextFormat}
`

export const S_PostContent = styled(Link)`
  padding: 4px 0;
  color: #718096 !important;
  font-weight: 500;
  font-size: 13px !important;
  min-height: 44px;
  cursor: pointer;

  ${S_TextFormat}
  -webkit-line-clamp: 2;
`

export const S_FooterLink = styled(Link)`
  display: flex;
  align-items: center;
  /* color: inherit !important; */
  padding: 4px 4px;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    background-color: rgba(237, 242, 247, var(--bg-opacity));
  }
`
export const S_TopLink = styled(Link)`
  display: flex;
  align-items: center;
  /* color: inherit !important; */
  color: rgba(113, 128, 150, 1);
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`
export const S_Icon = styled(Icon)`
  position: relative;
  top: -3px;
  margin-right: 4px;
`

export const S_UpVote = styled.button`
  height: 24px;
  background: none;
  outline: none;
  border: none;
  color: ${props => (!props.isVoted ? ' rgb(113, 128, 150)!important' : '#63b3ed !important')};
  cursor: pointer;
  :hover {
    border-radius: 4px;
    background: #e2e8f0;
  }
`
export const S_DownVote = styled.button`
  height: 24px;
  background: none;
  outline: none;
  border: none;
  /* color: rgb(113, 128, 150) !important; */
  color: ${props => (!props.isVoted ? ' rgb(113, 128, 150)!important' : '#e53e3e !important')};
  cursor: pointer;
  :hover {
    border-radius: 4px;
    background: #e2e8f0;
  }
`

export const S_FooterText = styled.span`
  font-size: 16px;
  margin-left: 4px;
`

export const S_InfoUser = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`

export const S_PostMain = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin: 0 8px;
  /* font-size: 50px !important;  */
`
export const S_PostMainView = styled.div`
  display: inline-flex;
  flex-direction: column;
  /* margin: 0 8px; */
  /* font-size: 50px !important;  */
`

export const S_PostMainContent = styled.div`
  display: inline-block;
  padding: 4px 0;
  /* color: #718096 !important; */
  /* font-weight: 500; */
  /* font-size: 13px !important; */
  /* cursor: pointer; */

  /* margin-top: px; */
`

export const S_PostMainTitle = styled.div`
  font-weight: 500;
  color: #1a202c !important;
  font-size: 20px !important;
  cursor: pointer;
`

export const S_PostMainForum = styled.div`
  display: flex;
  height: 100%;
  min-height: 100vh;
  padding: 8px;
  /* flex-direction: column; */
  /* margin: 0 8px; */
  /* font-size: 50px !important;  */
`

export const S_FooterMainLink = styled.button`
  display: flex;
  align-items: center;
  /* color: inherit !important; */
  padding: 4px 4px;
  border-radius: 4px;
  margin-right: 18px;
  cursor: pointer;
  :hover {
    background-color: rgba(237, 242, 247, var(--bg-opacity));
  }
`

export const S_SHARE = styled.div`
  display: flex;
  align-items: center;
  /* color: inherit !important; */
  padding: 4px 4px;
  border-radius: 4px;
  margin-right: 18px;
  cursor: pointer;
  :hover {
    background-color: rgba(237, 242, 247, var(--bg-opacity));
  }
`

export const SearchWrapper = styled.div`
  background: white;
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 20px;
`
