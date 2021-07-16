import React, { useRef, useState } from 'react'

import { S_Close } from '@/modules/blog/components/Blog.style'
import http from '@/helpers/axios'
import { UserAPI } from '@/services'
import * as types from '@/modules/auth/store/action_types'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

function UploadAvatar({ setIsShowModal }) {
  const dispatch = useDispatch()
  const rInputCover = useRef(null)

  const [avatar, setAvatar] = useState('')

  const saveAvatar = async _avatar => {
    const formData = new FormData()
    typeof _avatar !== 'string' && formData.append('imgs', _avatar)

    if (formData.has('imgs')) {
      const data = await http.post('/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return data[0].path
    }
    return _avatar
  }

  const handleUploadAvatar = async () => {
    try {
      const avatarUrl = await saveAvatar(avatar)
      const user = await UserAPI.updateAvatar({ avatarUrl })
      toast.success('Cập nhật Avatar thành công')
      dispatch({
        type: types.UPDATE_USER_AVATAR,
        payload: user.avatarUrl,
      })
      setIsShowModal(false)
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleChangeUpload = event => {
    setAvatar(event.target.files[0])
  }

  return (
    <div className="py-5 px-5">
      <div
        className="relative flex items-center mt-3 rounded-sm border border-gray-400 border-dashed"
        id="dragImageToUpload"
        style={{ minHeight: 160 }}
      >
        {avatar ? (
          <div
            className="relative flex items-center mt-3 rounded-sm border border-gray-400 false mx-auto"
            id="dragImageToUpload"
            style={{ minHeight: 160 }}
          >
            <div className="absolute right-0 top-0 -m-2 z-50 p-px rounded-full w-6 h-6 bg-white">
              <S_Close onClick={() => setAvatar('')} />
            </div>
            <img
              className="w-40 h-40 rounded-full mx-auto object-cover z-40"
              src={typeof avatar === 'string' ? avatar : URL.createObjectURL(avatar)}
              alt="blogs"
            />
          </div>
        ) : (
          <>
            <input
              type="file"
              id="filePhoto"
              accept="image/*"
              title="Kéo thả hình ảnh vào đây"
              className="absolute bg-gray-300 w-full h-full opacity-0"
              ref={rInputCover}
              onChange={handleChangeUpload}
            />
            <div className="flex items-center mx-auto">
              <div className="text-gray-600 text-sm">Kéo thả hình ảnh vào đây hoặc &nbsp;</div>
              <button
                type="button"
                className=" px-2 py-1 border focus:outline-none border-green-500 text-green-600 rounded-lg z-30 hover:bg-gray-200"
                onClick={() => rInputCover.current.click()}
              >
                Chọn ảnh
              </button>
            </div>
          </>
        )}
      </div>
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="px-3 py-1 rounded text-white text-sm font-medium bg-gray-500 hover:bg-gray-600 focus:outline-none font-sans mr-3"
          onClick={() => setIsShowModal(false)}
        >
          Hủy
        </button>
        <button
          type="button"
          className="px-3 py-1 rounded text-white text-sm font-medium bg-green-500 hover:bg-green-700 focus:outline-none font-sans"
          onClick={handleUploadAvatar}
        >
          Lưu
        </button>
      </div>
    </div>
  )
}

export default UploadAvatar
