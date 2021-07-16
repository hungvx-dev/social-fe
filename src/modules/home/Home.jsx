import React, { useEffect } from 'react'
import styled from 'styled-components'
import { topics } from '@/_constants/data'
import { LayoutBg } from '@/_layouts'
import { makeGetSocketWithType } from '@/_layouts/Socket'
import Forum from './Forum'
import Topics from './Topics'
// import { makeGetIsAuthenticated } from '../auth/store/selector'

function Home() {
  // const isAuth = makeGetIsAuthenticated()
  const socket = makeGetSocketWithType()

  useEffect(() => {
    socket.emit('JoiningRoom', 'home')
    return () => socket.emit('LeavingRoom')
  }, [])
  // console.log(isAuth)
  return (
    <LayoutBg>
      <S_Layout>
        <S_Topics topics={topics} />
        <S_Forum />
      </S_Layout>
    </LayoutBg>
  )
}

export default Home

const S_Layout = styled.div`
  display: flex;
  /* width: 90%; */
  justify-content: center;
  margin: 0 auto;
`

const S_Topics = styled(Topics)`
  position: sticky;
  top: 65px;
  padding-right: 4px;
  width: 300px;
  max-height: calc(100vh - 50px);
  overflow-y: scroll;
  transition: 0.7s;
  margin-top: 16px;
  :hover {
    ::-webkit-scrollbar {
      width: 4px;
      display: block;
    }
  }
  ::-webkit-scrollbar {
    width: 4px;
    display: none;
    /* background-color: #f5f5f5; */
  }
  ::-webkit-scrollbar-thumb {
    width: 4px;
    border-radius: 3px;
    background-color: #b2b2b26b;
  }
`
const S_Forum = styled(Forum)`
  /* width: 100%; */
  width: 900px;
  max-width: 900px;
  margin-top: 8px;
  margin-left: 16px;
  margin-right: 16px;
`
