import React from 'react'
import { Link } from 'react-router-dom'
import StatusBlog from '@/modules/blog/containers/StatusBlog'
import { getAvatar } from '@/helpers/common'
import { S_Description } from './components/Blog.style'

function Blog({ blog }) {
  return (
    <li>
      <div className="flex items-center justify-between mt-8 ">
        <Link
          className="flex items-center cursor-pointer no-underline"
          style={{ maxWidth: '80%' }}
          to={`/blogs/${blog.slug}`}
        >
          <div className="flex-shrink-0">
            <img
              src={getAvatar(blog.avatar)}
              className="rounded-sm"
              alt={blog.slug}
              style={{
                width: '5rem',
                height: '5rem',
                objectFit: 'cover',
                borderRadius: '5px',
              }}
            />
          </div>

          <div className="ml-5">
            <div className="w-full font-medium text-xl text-black truncate">{blog.title}</div>
            <S_Description className="text-sm font-light text-black overflow-hidden">{blog.description}</S_Description>
          </div>
        </Link>
        <div style={{ minWidth: 100, marginLeft: 15 }}>
          <StatusBlog blogId={blog.id} blogAuthorId={blog.author?.id} blogSlug={blog.slug} />
        </div>
      </div>
      <div className="h-px bg-gray-200 mt-5" />
      {/* <div>
        <div>
          <img src={blog.avatar} alt={blog.slug} />
        </div>
        <div>
          <div>{blog.title}</div>
          <div>{blog.description}</div>
        </div>
      </div> */}
    </li>
  )
}

export default Blog
