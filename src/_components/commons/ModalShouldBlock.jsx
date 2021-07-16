import React from 'react'

function ShouldBlock({ setIsShowModal }) {
  return (
    <div className="py-5 px-5">
      <div>Tài khoản của bạn bị khóa</div>
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="px-3 py-1 rounded text-white text-sm font-medium bg-gray-500 hover:bg-gray-600 focus:outline-none font-sans mr-3"
          onClick={setIsShowModal}
        >
          Hủy
        </button>
      </div>
    </div>
  )
}

export default ShouldBlock
