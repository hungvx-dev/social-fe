import React, { useRef, useState } from 'react'
import { FastField, Formik, Form } from 'formik'
import * as Yup from 'yup'

import { BlogAPI } from '@/services'
import http from '@/helpers/axios'
import { useDispatch } from 'react-redux'
import { InputFile } from 'Templates/form'
import { getAvatar } from '@/helpers/common'
import { S_Close, S_InputField, S_InputFile, S_InputTextArea } from './Blog.style'
import * as types from '../store/action_types'
import { makeGetErrorWithType } from '../store/selector'

function BlogUpdate({ dataBlog, setIsShowModal }) {
  const [initialForm] = useState({
    avatar: dataBlog.avatar,
    cover: dataBlog.cover,
    title: dataBlog.title,
    description: dataBlog.description,
    slug: dataBlog.slug,
    info: dataBlog.info
      ? JSON.parse(dataBlog.info)
      : {
          email: '',
          facebook: '',
        },
  })
  const dispatch = useDispatch()
  const rInputAvatar = useRef(null)
  const rInputCover = useRef(null)

  const errors = makeGetErrorWithType('blog')

  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Vui lòng nhập tên blog')
      .min(3, 'Tên blog có ít nhất 6 ký tự')
      .max(150, 'Tên blog không vượt quá 60 ký tự'),

    description: Yup.string()
      .required('Vui lòng nhập mô tả')
      .min(3, 'Tên blog có ít nhất 6 ký tự')
      .max(300, 'Tên blog không vượt quá 60 ký tự'),

    slug: Yup.string()
      .required('Vui lòng nhập định danh')
      .min(3, 'Tên blog có ít nhất 6 ký tự')
      .max(50, 'Tên blog không vượt quá 60 ký tự')
      .matches(/^[a-z-]+$/, 'Không đúng định dạng'),

    avatar: Yup.mixed().required('Vui lòng chọn ảnh đại diện'),
  })

  const saveAvatar = async (avatar, cover) => {
    const formData = new FormData()
    typeof avatar !== 'string' && formData.append('imgs', avatar)
    cover && typeof cover !== 'string' && formData.append('imgs', cover)

    if (formData.has('imgs')) {
      const data = await http.post('/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (typeof avatar !== 'string' && typeof cover !== 'string') return { avatar: data[0].path, cover: data[1].path }
      if (typeof avatar !== 'string' && typeof cover === 'string') return { avatar: data[0].path, cover }
      if (typeof avatar === 'string' && typeof cover !== 'string') return { cover: data[0].path, avatar }
    }
    return { avatar, cover }
  }

  const handleUpdateBlog = async ({ avatar, cover, title, description, slug, info }) => {
    try {
      const avatarObj = await saveAvatar(avatar, cover)
      const data = {
        ...avatarObj,
        slug,
        title,
        description,
        info: JSON.stringify(info),
      }
      const blog = await BlogAPI.update(dataBlog.id, data)
      dispatch({ type: types.SET_BLOG, payload: blog })
      setIsShowModal(false)
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleUploadAvatar = () => {
    rInputAvatar.current.focus()
    rInputAvatar.current.click()
  }

  return (
    <div>
      <Formik initialValues={initialForm} onSubmit={handleUpdateBlog} validationSchema={validationSchema}>
        {({ values, setFieldValue }) => (
          <div className="relative bg-white w-11/12 mx-auto my-3 p-2  rounded-md">
            <Form>
              <div className="flex items-center mt-5">
                <FastField
                  name="title"
                  component={S_InputField}
                  maxLength={150}
                  placeholder="Nhập tên blog"
                  classes="py-1 outline-none w-full border-b border-gray-200"
                  errorText={errors.title}
                />
                <span className="text-xs text-gray-500 px-1 ">{values.title.length}/150</span>
              </div>

              <div className="flex items-center mt-10">
                <FastField
                  name="description"
                  component={S_InputTextArea}
                  placeholder="Nhập mô tả blog"
                  classes="py-1 outline-none w-full border-b border-gray-200 forum_frameIcon__2fNr2 "
                  maxLength={300}
                  errorText={errors.description}
                />
                <span className="text-xs text-gray-500 px-1">{values.description.length}/300</span>
              </div>

              <div className="flex items-center mt-10">
                <FastField
                  name="slug"
                  maxLength={50}
                  component={S_InputField}
                  placeholder="Nhập định danh blog"
                  classes="py-1 outline-none w-full border-b border-gray-200"
                  errorText={errors.slug}
                />
                <span className="text-xs text-gray-500 px-1 ">{values.slug.length}/50</span>
              </div>

              <div className="text-xs mt-2 text-gray-900 mr-8">
                Định danh viết liền không dấu, không ký tự đặc biệt. Định danh tạo thành địa chỉ cho blog tại:{' '}
                <span className="text-green-500">ly-kafe</span>
              </div>

              <div className="flex mt-10 text-gray-800 justify-between">
                <div className="mt-1">
                  <div className="font-medium">Ảnh đại diện blog</div>
                  <div className="mt-2 text-xs">Bấm vào ô vuông để đặt ảnh</div>
                  <FastField
                    type="file"
                    name="avatar"
                    component={InputFile}
                    refInputFile={rInputAvatar}
                    style={{ opacity: 0 }}
                  />
                </div>

                <div
                  aria-hidden="true"
                  className="mt-2 rounded-md bg-green-200 w-24 h-24 ml-5 cursor-pointer hover:bg-green-300 relative"
                  onClick={handleUploadAvatar}
                >
                  {values.avatar && (
                    <img
                      className="img-full rounded-md"
                      src={
                        typeof values.avatar === 'string'
                          ? getAvatar(values.avatar)
                          : URL.createObjectURL(values.avatar)
                      }
                      alt="blogs"
                    />
                  )}
                </div>
              </div>

              <div className="font-medium text-gray-800 mt-5">
                Ảnh bìa blog
                <span className="text-sm font-normal"> (tùy chọn)</span>
              </div>

              <div
                className="relative flex items-center mt-3 rounded bg-green-200"
                style={{ height: 'auto', minHeight: '10rem' }}
              >
                <FastField type="file" name="cover" component={S_InputFile} refInputFile={rInputCover} />
                {values.cover ? (
                  <>
                    <S_Close onClick={() => setFieldValue('cover', '')} />
                    <div style={{ paddingTop: values.cover && '56.25%' }}>
                      <img
                        className="img-full rounded-md"
                        src={
                          typeof values.cover === 'string' ? getAvatar(values.cover) : URL.createObjectURL(values.cover)
                        }
                        alt="blogs"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center mx-auto">
                      <div className="text-gray-800 text-sm">Kéo thả hình ảnh vào đây hoặc &nbsp;</div>
                      <button
                        type="button"
                        className="px-2 py-1 border focus:outline-none border-green-600 text-green-700 rounded-lg z-30 hover:bg-gray-200"
                        onClick={() => rInputCover.current.click()}
                      >
                        Chọn ảnh
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-10 font-medium text-2xl">
                Kết nối xã hội
                <span className="text-sm font-normal text-gray-700"> (tùy chọn)</span>
              </div>
              <div className="flex items-center mt-3 border-b border-gray-200">
                <FastField
                  name="info.email"
                  component={S_InputField}
                  placeholder="Email"
                  classes="py-1 outline-none w-full"
                  maxLength={300}
                />
              </div>
              <div className="flex mt-6 items-center border-b border-gray-200">
                <FastField
                  name="info.facebook"
                  component={S_InputField}
                  placeholder="Facebook"
                  classes="py-1 outline-none w-full"
                  maxLength={300}
                />
              </div>
              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  className="px-2 py-1 rounded text-white font-medium bg-gray-500 hover:bg-gray-600 focus:outline-none mr-3"
                  onClick={() => setIsShowModal(false)}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-1 rounded text-white font-medium bg-green-500 hover:bg-green-700 focus:outline-none"
                >
                  Sửa blog
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default BlogUpdate
