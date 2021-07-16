import React, { useState } from 'react'
import { toast } from 'react-toastify'

import { useDispatch } from 'react-redux'
import * as types from '@/modules/auth/store/action_types'
import { UserAPI } from '@/services'

function UpdateInfo({ data, setIsShowModal }) {
  const dispatch = useDispatch()

  const [info, setInfo] = useState({ fullName: data.fullName, introduction: data.introduction })

  const handleUpdateInfo = async () => {
    try {
      const user = await UserAPI.updateInfo(info)
      toast.success('Cập nhật thông tin thành công')

      dispatch({
        type: types.UPDATE_USER_INFO,
        payload: {
          fullName: user.fullName,
          introduction: user.introduction,
        },
      })
      setIsShowModal(false)
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleChangeInfo = event => {
    setInfo({ ...info, [event.target.name]: event.target.value })
  }
  return (
    <div className="py-5 px-5">
      <div className="font-medium">Họ tên</div>
      <div className="flex items-center mt-1">
        <input
          type="text"
          name="fullName"
          value={info.fullName}
          placeholder="Nhập họ tên"
          className="py-1 outline-none w-full border-b border-gray-200"
          onChange={handleChangeInfo}
        />
        <span className="text-xs text-gray-500 px-1 ">0/50</span>
      </div>
      <div className="font-medium mt-8">Giới thiệu bản thân</div>
      <div className="flex items-center mt-1 ">
        <textarea
          placeholder="Nhập giới thiệu bản thân"
          rows={5}
          name="introduction"
          value={info.introduction}
          id="inputEditProfileBio"
          className="py-1 outline-none resize-none w-full border-b border-gray-200 "
          onChange={handleChangeInfo}
        />
        <span className="text-xs text-gray-500 px-1">0/150</span>
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
          onClick={handleUpdateInfo}
        >
          Lưu
        </button>
      </div>
    </div>
  )
}

export default UpdateInfo
