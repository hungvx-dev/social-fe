import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { makeGetIsAuthenticated } from '../auth/store/selector'
import Blog from './Blog'

function Blogs({ blogs }) {
  const location = useLocation()
  const isAuth = makeGetIsAuthenticated()

  return (
    <>
      {isAuth && location.search === '?tab=me' && (
        <div className="flex items-center justify-between mt-1 mb-5">
          <div className="mt-1 rounded cursor-pointer shadow-box bg-linear-1" style={{ padding: '5px 10px' }}>
            <Link to="/blogs/add" className="text-white">
              Tạo blog mới
            </Link>
          </div>
        </div>
      )}
      <ul>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </>
  )
}

export default Blogs
