import React from 'react'
import { useHistory } from 'react-router-dom'

function ShouldLogin({ setIsShowModal }) {
  const history = useHistory()
  return (
    <div className="py-5 px-5">
      <div>
        Vui lòng{' '}
        <span
          className="text-green-500 hover:underline cursor-pointer"
          onClick={() => {
            history.push('/login')
            setIsShowModal()
          }}
          aria-hidden="true"
        >
          Đăng nhập
        </span>{' '}
        hoặc{' '}
        <span
          className="text-green-500 hover:underline cursor-pointer"
          onClick={() => {
            history.push('/register')
            setIsShowModal()
          }}
          aria-hidden="true"
        >
          Đăng ký thành viên
        </span>{' '}
        để thực hiện.
      </div>
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="px-3 py-1 rounded text-white text-sm font-medium bg-gray-500 hover:bg-gray-600 focus:outline-none font-sans mr-3"
          onClick={setIsShowModal}
        >
          Hủy
        </button>
        <button
          type="button"
          className="px-3 py-1 rounded text-white text-sm font-medium bg-green-500 hover:bg-green-700 focus:outline-none font-sans"
          onClick={() => {
            history.push('/login')
            setIsShowModal()
          }}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  )
}

export default ShouldLogin
