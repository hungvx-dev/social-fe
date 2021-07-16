import { FormHelperText, TextareaAutosize } from '@material-ui/core'
import { ErrorMessage } from 'formik'
import React from 'react'

function InputEmoji(props) {
  const { row, form, field, label, rowsMax, classes, disabled, className, maxLength, placeholder, autoComplete } = props
  const { name } = field
  const { errors } = form

  return (
    <div className={className}>
      {label && <label htmlFor={name}>{label}</label>}
      <TextareaAutosize
        {...field}
        rows={1}
        id={name}
        maxLength={maxLength}
        rowsMin={row || 3}
        className={classes}
        rowsMax={rowsMax || 6}
        placeholder={placeholder}
        disabled={disabled || false}
        autoComplete={autoComplete || 'off'}
        style={{ width: '100%', resize: 'none' }}
      />

      <ErrorMessage
        name={name}
        component={() => (
          <FormHelperText id={`${name}-error`} style={{ color: 'red' }}>
            {errors[name]}
          </FormHelperText>
        )}
      />
    </div>
  )
}

export default InputEmoji
