import React from 'react'

import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { getAvatar } from '@/helpers/common'

function UserFollower({ users }) {
  return (
    <div className="py-5 px-5 mb-2 overflow-y-auto" style={{ maxHeight: '50vh' }}>
      {users &&
        users.map(user => (
          <Link key={user.id} to={`/users/${user.id}`} className="flex items-center my-3  text-black">
            <div id="like_matrix" className="w-8 h-8 rounded-full">
              {user.avatarUrl ? (
                <Avatar alt="" src={getAvatar(user.avatarUrl)} style={{ width: '2rem', height: '2rem' }} />
              ) : (
                <Avatar style={{ width: '2rem', height: '2rem' }}>{user.fullName[0].toUpperCase()}</Avatar>
              )}
            </div>
            <div className="ml-5 hover:underline">{user.fullName}</div>
          </Link>
        ))}
    </div>
  )
}

export default UserFollower
