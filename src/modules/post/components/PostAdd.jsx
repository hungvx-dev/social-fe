import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import styled from 'styled-components'
import ReactQuill from 'react-quill'
import { FastField, Formik, Form } from 'formik'
import { Link, useHistory, useLocation } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'

import { InputEmoji } from 'Templates/form'
import SelectTopic from 'Templates/form/SelectTopic'
import http from '@/helpers/axios'
import { BlogAPI, PostAPI } from '@/services'
import { LayoutBg } from '@/_layouts'
import { topicsSelect } from '@/_constants/data'
import { getFirstTagImg, getImages, replaceSrcImg } from '@/helpers/common'

const formats = [
  'bold',
  'italic',
  'underline',
  'blockquote',
  'color',
  'background',
  'list',
  'bullet',
  'indent',
  'align',
  'link',
  'image',
]
const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean'],
  ],
  history: {
    delay: 500,
    maxStack: 500,
  },
}

function PostAdd() {
  const location = useLocation()
  const history = useHistory()
  const { classify, blogSlug } = queryString.parse(location.search)
  const [content, setContent] = useState('')
  const [topicSelected, setTopicSelected] = useState({})
  const [blog, setBlog] = useState({})
  const [errors, setErrors] = useState({})

  const handleChange = value => {
    if (errors.content) {
      setErrors({ ...errors, content: '' })
    }
    setContent(value)
  }

  const handleChangeSelect = value => {
    if (classify === 'forum' && errors.select) {
      setErrors({ ...errors, select: '' })
    }
    setTopicSelected(value)
  }

  const saveImages = async _content => {
    const imagesContent = getImages(_content)

    const formData = new FormData()
    imagesContent.forEach(img => {
      formData.append('imgs', img)
    })
    const data = await http.post('/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  }

  const replaceImgSrc = (imgs, _content) => {
    if (imgs.length > 0) {
      const doc = replaceSrcImg(_content, imgs)
      return doc.firstChild.outerHTML
    }
    return _content
  }

  const verifyPost = title => {
    const errorsRes = {}
    if (title === '') {
      errorsRes.title = 'Vui lòng nhập tiêu đề'
    }
    if (content === '') {
      errorsRes.content = 'Vui lòng nhập nội dung'
    }
    if (classify === 'forum' && !Object.keys(topicSelected).length) {
      errorsRes.select = 'Vui lòng chọn chủ đề'
    }
    return errorsRes
  }

  const onSubmitPost = async values => {
    const errorsRes = verifyPost(values.title)
    if (Object.keys(errorsRes).length) return setErrors(errorsRes)

    const imgs = await saveImages(content)
    const contentNew = replaceImgSrc(imgs, content)
    const elImgFirst = getFirstTagImg(contentNew)

    const data = {
      classify,
      title: values.title,
      content: contentNew,
      avatar: elImgFirst ? elImgFirst.getAttribute('src') : '',
    }
    classify === 'forum' ? (data.topic = topicSelected.slug) : (data.blog = blog.id)
    try {
      await PostAPI.create(data)
      history.push(classify === 'forum' ? '/' : `/blogs/${blog.slug}`)
      return null
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    if (blogSlug) {
      const getBlog = async () => {
        try {
          const blogRes = await BlogAPI.getBlogById(blogSlug)
          setBlog(blogRes)
        } catch (error) {
          throw new Error(error)
        }
      }

      getBlog()
    }
  }, [blogSlug])

  return (
    <LayoutBg>
      <div className="m-auto md:max-w-3xl" style={{ paddingTop: 16 }}>
        {classify === 'forum' ? (
          <>
            <SelectTopic topics={topicsSelect} topicSelected={topicSelected} onChange={handleChangeSelect} />
            {errors.select && (
              <div className="MuiFormHelperText-root" style={{ color: 'red', fontSize: '0.75rem' }}>
                {errors.select}
              </div>
            )}
          </>
        ) : (
          <Link
            to={`/blogs/${blogSlug}`}
            className="rounded-sm font-light py-2 text-lg px-3 hover:underline hover:text-blue-600 text-green-500 bg-white no-underline"
            style={{ display: 'inline-block', width: '100%' }}
          >
            Blog / {blog.title}
          </Link>
        )}

        <Formik initialValues={{ title: '' }} onSubmit={(values, action) => onSubmitPost(values, action)}>
          {() => (
            <Form>
              <div className="rounded-lg px-2 md:px-4 mt-2 p-2 border border-gray-200 bg-white rounded-lg border">
                <S_InputTitle name="title" component={InputEmoji} placeholder="Tiêu đề" />
                {errors.title && (
                  <div className="MuiFormHelperText-root" style={{ color: 'red', fontSize: '0.75rem' }}>
                    {errors.title}
                  </div>
                )}

                <S_Editor value={content} modules={modules} formats={formats} onChange={handleChange}>
                  {/* <S_EditingArea /> */}
                </S_Editor>
                {errors.content && (
                  <div className="MuiFormHelperText-root" style={{ color: 'red', fontSize: '0.75rem' }}>
                    {errors.content}
                  </div>
                )}
                <div className="flex justify-between">
                  <div className="flex mt-2">
                    <button
                      type="button"
                      className="mr-3 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-1 px-2 rounded focus:outline-none"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-700 text-sm font-medium text-white py-1 px-2 rounded focus:outline-none"
                    >
                      {classify === 'forum' ? 'Đăng bài diễn đàn' : 'Tạo bài viết'}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </LayoutBg>
  )
}

export default PostAdd

const S_Editor = styled(ReactQuill)`
  .ql-editor {
    min-height: 200px;
  }
`
const S_InputTitle = styled(FastField)`
  display: flex;
  position: relative;
  border-width: 1px;
  padding: 8px;
  padding-left: 10px;
  background: #fff;
  .textarea {
    outline: none;
    font-family: 'Roboto';
    border: none;
    overflow: hidden;
    text-align: justify;
  }
  .emoji {
    height: 18px;
    margin-left: 5px;
    text-align: end;
    position: relative;
    cursor: pointer;
  }
`
