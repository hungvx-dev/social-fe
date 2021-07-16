import React, { useState } from 'react'
import styled from 'styled-components'
import ReactQuill from 'react-quill'
import { FastField, Formik, Form } from 'formik'
import 'react-quill/dist/quill.snow.css'

import { InputEmoji } from 'Templates/form'
import SelectTopic from 'Templates/form/SelectTopic'
import http from '@/helpers/axios'
import { topicsSelect, topicsObj } from '@/_constants/data'
import { getFirstTagImg, getImages, replaceImg, replaceSrcImg } from '@/helpers/common'
import { PostAPI } from '@/services'
import { useDispatch } from 'react-redux'
import { makeGetSocketWithType } from '@/_layouts/Socket'
import { toast } from 'react-toastify'
import * as types from '../../home/store/action_types'
import * as typesBlog from '../../blog/store/action_types'

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

function PostUpdate({ classify, type, setIsShowModal, dataPost = {} }) {
  const dispatch = useDispatch()
  const socket = makeGetSocketWithType()

  const [content, setContent] = useState(replaceImg(dataPost.content) || '')
  const [topicSelected, setTopicSelected] = useState(topicsObj[dataPost.topic?.slug] || {})

  const handleChange = value => {
    setContent(value)
  }

  const handleChangeSelect = value => {
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
    // if (imgs.length > 0) {
    const doc = replaceSrcImg(_content, imgs)
    return doc.firstChild.outerHTML
    // }
    // return _content
  }

  const handleUpdatePost = (_type, post) => {
    switch (_type) {
      case 'topic':
        return dispatch({ type: types.UPDATE_TOPICS, payload: post })
      case 'postsNew':
        return dispatch({ type: typesBlog.UPDATE_POST_NEW, payload: post })
      case 'postsBlog':
        return dispatch({ type: typesBlog.UPDATE_POST_BLOG, payload: post })
      case 'post':
        return dispatch({ type: types.SET_POST, payload: post })
      default:
        return null
    }
  }

  const onSubmitPost = async values => {
    const imgs = await saveImages(content)
    const contentNew = replaceImgSrc(imgs, content)
    const elImgFirst = getFirstTagImg(contentNew)

    const data = {
      title: values.title,
      content: contentNew,
      avatar: elImgFirst ? elImgFirst.getAttribute('src') : '',
    }
    classify === 'forum' && (data.topic = topicSelected.slug)
    try {
      const post = await PostAPI.update(dataPost.id, data)
      handleUpdatePost(type, post)
      toast.success('Cập nhật bài viết thành công')
      socket.emit('UpdatePost', post)
      setIsShowModal(false)
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <div>
      {classify === 'forum' && (
        <SelectTopic topics={topicsSelect} topicSelected={topicSelected} onChange={handleChangeSelect} />
      )}

      <Formik initialValues={{ title: dataPost.title }} onSubmit={(values, action) => onSubmitPost(values, action)}>
        {() => (
          <Form>
            <div className="rounded-lg px-2 md:px-4 mt-2 p-2 border border-gray-200 bg-white rounded-lg border">
              <S_InputTitle name="title" component={InputEmoji} placeholder="Tiêu đề" />

              <S_Editor value={content} modules={modules} formats={formats} onChange={handleChange}>
                {/* <S_EditingArea /> */}
              </S_Editor>
              <div className="flex justify-between">
                <div className="flex mt-2">
                  <button
                    type="button"
                    className="mr-3 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-1 px-2 rounded focus:outline-none"
                    onClick={() => setIsShowModal(false)}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-sm font-medium text-white py-1 px-2 rounded focus:outline-none"
                  >
                    Sửa bài
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default PostUpdate

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
