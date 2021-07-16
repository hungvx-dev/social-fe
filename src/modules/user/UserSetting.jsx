import { UserAPI } from '@/services'
import { LayoutBg, LayoutUser } from '@/_layouts'
import React, { useState } from 'react'
import { makeGetMe } from '../auth/store/selector'

function UserSetting() {
  const user = makeGetMe()
  const [isShowChange, setIsShowChange] = useState({ password: false, fullName: false, introduction: false })
  const [valueForm, setValueForm] = useState({
    password: '',
    passwordNew: '',
    passwordConfirm: '',
    introduction: user.introduction,
    fullName: user.fullName,
  })

  const handleChange = event => {
    setValueForm({ ...valueForm, [event.target.name]: event.target.value })
  }

  const handleResetPassword = async () => {
    const { password, passwordNew, passwordConfirm } = valueForm
    await UserAPI.resetPassword('me', { password, passwordNew, passwordConfirm })
    setIsShowChange({ ...isShowChange, password: false })
  }

  return (
    <LayoutBg>
      <LayoutUser>
        <div className="md:w-1/2 bg-white mx-auto border border-t-0 border-gray-400 rounded-b-lg pb-32 px-3">
          <div className="pt-5 flex items-center text-gray-700">
            <div className="text-gray-600 mr-2">
              <i className="fas fa-cog" />
            </div>
            Cài đặt tài khoản
          </div>
          <div className="text-gray-700 mt-10">Đăng nhập</div>
          <div className="h-px bg-gray-300" />
          <div className="mt-6">
            <div className="font-medium text-gray-800">Tên đăng nhập (username)</div>
            <div className="text-sm text-gray-600">{user.username}</div>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className>
              <div className="font-medium text-gray-800">Mật khẩu</div>
              <div className="text-sm text-gray-600">Ít nhất 6 ký tự</div>
            </div>
            <button
              type="button"
              className="px-2 py-1 rounded-lg text-sm font-medium hover:bg-gray-200 focus:outline-none border border-green-600 text-gray-900"
              onClick={() => setIsShowChange({ ...isShowChange, password: true })}
            >
              Đổi
            </button>
          </div>
          {isShowChange.password && (
            <div className="block rounded-md mt-1 border border-gray-200 p-2 bg-gray-100">
              <div className="flex items-center">
                <input
                  name="password"
                  className="bg-gray-100 mt-2 mr-8 border-b border-gray-300 rounded flex-grow pr-1 py-1 font-roboto outline-none"
                  type="password"
                  value={valueForm.password}
                  placeholder="Mật khẩu cũ"
                  onChange={event => handleChange(event)}
                />
                <span className="text-gray-600 hover:text-black cursor-pointer mx-2">
                  <i className="fas fa-eye-slash " />
                </span>
              </div>
              <div className="flex items-center">
                <input
                  name="passwordNew"
                  className="bg-gray-100 mt-2 mr-8 border-b border-gray-300 rounded flex-grow pr-1 py-1 font-roboto outline-none"
                  type="password"
                  value={valueForm.passwordNew}
                  placeholder="Mật khẩu mới"
                  onChange={event => handleChange(event)}
                />
                <span className="text-gray-600 hover:text-black cursor-pointer mx-2">
                  <i className="fas fa-eye-slash " />
                </span>
              </div>
              <div className="flex items-center ">
                <input
                  name="passwordConfirm"
                  className="flex-grow pr-1 py-1 font-roboto outline-none rounded-l border-b border-gray-300 bg-gray-100"
                  type="password"
                  value={valueForm.passwordConfirm}
                  placeholder="Xác nhận mật khẩu"
                  onChange={event => handleChange(event)}
                />
              </div>
              <div className="flex items-center justify-end mt-2">
                <button
                  type="button"
                  className="bg-gray-300 hover-bg-gray-400 rounded-md text-sm font-medium px-2 py-1 mr-2 focus:outline-none"
                  onClick={() => setIsShowChange({ ...isShowChange, password: false })}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="bg-green-500 hover-bg-gray-400 rounded-md text-sm font-medium px-3 py-1 text-white focus:outline-none"
                  onClick={handleResetPassword}
                >
                  Lưu
                </button>
              </div>
            </div>
          )}

          <div className="text-gray-700 mt-10">Thông tin cá nhân</div>
          <div className="h-px bg-gray-300" />
          <div className="flex items-center justify-between mt-6">
            <div className>
              <div className="font-medium text-gray-800">Họ và tên</div>
              <div className="text-sm text-gray-600">{user.fullName}</div>
            </div>
            <button
              type="button"
              className="px-2 py-1 rounded-lg text-sm font-medium hover:bg-gray-200 focus:outline-none border border-green-600 text-gray-900"
              onClick={() => setIsShowChange({ ...isShowChange, fullName: true })}
            >
              Đổi
            </button>
          </div>

          {isShowChange.fullName && (
            <div className="block rounded-md mt-1 border border-gray-200 p-2 bg-gray-100">
              <input
                name="fullName"
                className="w-full flex-grow pr-1 py-1 font-roboto outline-none rounded-l border-b border-gray-300 bg-gray-100"
                type="text"
                value={valueForm.fullName}
                placeholder="Họ và tên"
                onChange={event => handleChange(event)}
              />
              <div className="flex items-center justify-end mt-2">
                <button
                  type="button"
                  className="bg-gray-300 hover-bg-gray-400 rounded-md text-sm font-medium px-2 py-1 mr-2"
                  onClick={() => setIsShowChange({ ...isShowChange, fullName: false })}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="bg-green-500 hover-bg-gray-400 rounded-md text-sm font-medium px-3 py-1 text-white"
                >
                  Lưu
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-6">
            <div className>
              <div className="font-medium text-gray-800">Giới thiệu bản thân</div>
              <div className="text-sm text-gray-600">{user.introduction}</div>
            </div>
            <button
              type="button"
              className="px-2 py-1 rounded-lg text-sm font-medium hover:bg-gray-200 focus:outline-none border border-green-600 text-gray-900"
              onClick={() => setIsShowChange({ ...isShowChange, introduction: true })}
            >
              Đổi
            </button>
          </div>
          {isShowChange.introduction && (
            <div className="block rounded-md mt-1 border border-gray-200 p-2 bg-gray-100">
              <input
                name="introduction"
                className="w-full flex-grow pr-1 py-1 font-roboto outline-none rounded-l border-b border-gray-300 bg-gray-100"
                type="text"
                value={valueForm.introduction}
                placeholder="Giới thiệu bản thân"
                onChange={event => handleChange(event)}
              />
              <div className="flex items-center justify-end mt-2">
                <button
                  type="button"
                  className="bg-gray-300 hover-bg-gray-400 rounded-md text-sm font-medium px-2 py-1 mr-2"
                  onClick={() => setIsShowChange({ ...isShowChange, introduction: false })}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="bg-green-500 hover-bg-gray-400 rounded-md text-sm font-medium px-3 py-1 text-white"
                >
                  Lưu
                </button>
              </div>
            </div>
          )}
        </div>
      </LayoutUser>
    </LayoutBg>
  )
}

export default UserSetting
