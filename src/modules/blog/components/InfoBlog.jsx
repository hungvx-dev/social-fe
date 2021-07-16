import { formatDate } from '@/helpers/common'
import React from 'react'

function InfoBlog({ blog }) {
  const info = JSON.parse(blog.info)
  return (
    <div className="py-3 px-5 font-light">
      <div>Ngày tạo: {formatDate(blog.createdAt)}</div>
      <div className="mt-2">Bài viết: {blog.postNum}</div>
      <div className="mt-5">Liên hệ</div>
      <div className="h-px bg-gray-300" />
      <div className="mt-3 flex align-center">
        <svg width="1.2em" height="1.2em" viewBox="0 0 36 36" style={{ display: 'inline-block' }}>
          <path
            className="clr-i-solid clr-i-solid-path-1"
            d="M32.33 6a2 2 0 0 0-.41 0h-28a2 2 0 0 0-.53.08l14.45 14.39z"
            fill="#fc8181"
          />
          <path
            className="clr-i-solid clr-i-solid-path-2"
            d="M33.81 7.39l-14.56 14.5a2 2 0 0 1-2.82 0L2 7.5a2 2 0 0 0-.07.5v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-.12-.61zM5.3 28H3.91v-1.43l7.27-7.21l1.41 1.41zm26.61 0h-1.4l-7.29-7.23l1.41-1.41l7.27 7.21z"
            fill="#fc8181"
          />
        </svg>

        <span className="ml-3">{info?.email}</span>
      </div>
      <div className="mt-3 flex align-center">
        <svg
          aria-hidden="true"
          width="1.2em"
          height="1.2em"
          viewBox="0 0 1024 1024"
          style={{ display: 'inline-block' }}
        >
          <path
            d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-92.4 233.5h-63.9c-50.1 0-59.8 23.8-59.8 58.8v77.1h119.6l-15.6 120.7h-104V912H539.2V602.2H434.9V481.4h104.3v-89c0-103.3 63.1-159.6 155.3-159.6c44.2 0 82.1 3.3 93.2 4.8v107.9z"
            fill="#2c6cb0"
          />
        </svg>
        <span className="ml-3">{info?.facebook}</span>
      </div>
    </div>
  )
}

export default InfoBlog
