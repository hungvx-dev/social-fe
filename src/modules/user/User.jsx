import { getAvatar } from '@/helpers/common'
import { Avatar } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

function User({ user }) {
  return (
    <div className="my-3 flex">
      <Link key={user.id} to={`/users/${user.id}`} className="items-center  text-black inline-block">
        <div id="like_matrix" className="rounded-full">
          {user.avatarUrl ? (
            <Avatar alt="" src={getAvatar(user.avatarUrl)} style={{ width: '3rem', height: '3rem' }} />
          ) : (
            <Avatar style={{ width: '3rem', height: '3rem' }}>{user.fullName[0].toUpperCase()}</Avatar>
          )}
        </div>
      </Link>
      <Link to={`/users/${user.id}`}>
        <div className="ml-5 hover:underline" style={{ fontWeight: 500, marginBottom: 3 }}>
          {user.fullName}
        </div>
        <div className="ml-5 italic">{user.introduction || '(Thông tin giới thiệu)'}</div>
      </Link>
    </div>
  )
}

export default User
