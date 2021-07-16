import React from 'react'
import { ErrorMessage } from 'formik'
import { FormHelperText } from '@material-ui/core'

function InputFile(props) {
  const { form, field, style, disabled, className, placeholder, refInputFile, handlePreviewImg } = props

  const { name, onBlur } = field
  const { errors } = form

  const handleChangeUpload = event => {
    handlePreviewImg && handlePreviewImg(event.target.files[0])
    form.setFieldValue(name, event.target.files[0])
  }

  return (
    <>
      <input
        id={name}
        name={name}
        type="file"
        style={style}
        onBlur={onBlur}
        accept="image/*"
        ref={refInputFile}
        className={className}
        placeholder={placeholder}
        disabled={disabled || false}
        onChange={handleChangeUpload}
        aria-describedby={`${name}-error`}
      />

      <ErrorMessage
        name={name}
        component={() => (
          <FormHelperText id={`${name}-error`} style={{ color: 'red' }}>
            {errors[name]}
          </FormHelperText>
        )}
      />
    </>
  )
}

export default InputFile
