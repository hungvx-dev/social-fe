import React from 'react'
import { FastField, Formik, Form } from 'formik'
import styled from 'styled-components'

import { InputEmoji } from 'Templates/form'

const S_InputComment = styled(FastField)`
  display: flex;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 16px;
  padding: 8px;
  padding-left: 10px;
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

function InputComment({ placeholder, onSubmitComment, comment }) {
  const handlePressEnter = (event, submitCallback) => {
    if (!event.shiftKey && event.key === 'Enter' && event.target.value.trim() !== '') {
      submitCallback()
    }
  }

  return (
    <Formik
      initialValues={{ content: comment ? comment.content : '' }}
      onSubmit={(values, action) => onSubmitComment(values, action)}
    >
      {({ handleSubmit }) => (
        <Form onKeyUp={e => handlePressEnter(e, handleSubmit)}>
          <S_InputComment name="content" component={InputEmoji} placeholder={placeholder} />
        </Form>
      )}
    </Formik>
  )
}

export default InputComment
