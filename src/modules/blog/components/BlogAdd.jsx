import React, { useRef } from 'react'
import { FastField, Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { BlogAPI } from '@/services'
import http from '@/helpers/axios'
import { LayoutBg } from '@/_layouts'
import { InputFile } from 'Templates/form'

import { ENV } from '@/_constants/common'
import { S_Close, S_InputField, S_InputFile, S_InputTextArea } from './Blog.style'
import { makeGetErrorWithType } from '../store/selector'
import * as types from '../store/action_types'

const initialForm = {
  avatar: '',
  cover: '',
  title: '',
  description: '',
  slug: '',
  info: {
    email: '',
    facebook: '',
  },
}

function BlogAdd() {
  const history = useHistory()
  const rInputAvatar = useRef(null)
  const rInputCover = useRef(null)

  const dispatch = useDispatch()

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
      // .trim()
      .min(3, 'Tên blog có ít nhất 6 ký tự')
      .max(50, 'Tên blog không vượt quá 60 ký tự')
      .matches(/^([a-z\d]|-)+$/, 'Không đúng định dạng'),

    avatar: Yup.mixed().required('Vui lòng chọn ảnh đại diện'),
  })

  const saveAvatar = async (avatar, cover) => {
    const formData = new FormData()
    formData.append('imgs', avatar)
    cover && formData.append('imgs', cover)

    const data = await http.post('/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  }

  const handleCreateBlog = async ({ avatar, cover, title, description, slug, info }) => {
    const avatarObj = await saveAvatar(avatar, cover)
    const data = {
      slug,
      title,
      description,
      info: JSON.stringify(info),
      avatar: avatarObj[0].path,
      cover: avatarObj[1] ? avatarObj[1].path : '',
    }
    try {
      await BlogAPI.create(data)
      history.push('/blogs?tab=me')
    } catch (error) {
      dispatch({ type: types.SET_ERRORS_BLOG, payload: error.errors })
      throw new Error(error)
    }
  }

  const handleUploadAvatar = () => {
    rInputAvatar.current.focus()
    rInputAvatar.current.click()
  }

  return (
    <LayoutBg>
      <Formik initialValues={initialForm} onSubmit={handleCreateBlog} validationSchema={validationSchema}>
        {({ values, setFieldValue }) => (
          <div className="relative bg-white w-11/12 md:max-w-xl mx-auto my-3 p-2  rounded-md">
            <div className="flex items-center">
              <div className="font-medium text-3xl justify-center">Tạo blog</div>
            </div>

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
                <span className="text-green-500">
                  {ENV.HOST}
                  {values.slug}
                </span>
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
                    <img className="img-full rounded-md" src={URL.createObjectURL(values.avatar)} alt="blogs" />
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
                      <img className="img-full rounded-md" src={URL.createObjectURL(values.cover)} alt="blogs" />
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
                  onClick={() => history.push('/blogs?tab=me')}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-1 rounded text-white font-medium bg-green-500 hover:bg-green-700 focus:outline-none"
                >
                  Tạo blog
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </LayoutBg>
  )
}

export default BlogAdd
