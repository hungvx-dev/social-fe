import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import { S_Post, S_Vote } from '@/modules/home/Post.style'

function SkeletonPost() {
  return (
    <S_Post className=" flex shadow-box-2 rounded-lg skeleton" style={{ margin: '8px 0' }}>
      <S_Vote style={{ width: 38 }} />
      <Skeleton animation="wave" width={130} height={100} style={{ margin: 8 }} />
      <div className="flex flex-col w-full">
        <Skeleton animation="wave" height={10} width="50%" style={{ margin: '8px 0px' }} />

        <Skeleton animation="wave" height={18} width="95%" style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={25} width="95%" style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={15} width="30%" style={{ marginTop: 6 }} />
      </div>
    </S_Post>
  )
}

export default SkeletonPost
