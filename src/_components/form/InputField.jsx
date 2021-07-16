import React from 'react'
import { ErrorMessage } from 'formik'
import { FormHelperText, TextField } from '@material-ui/core'

function InputField(props) {
  const {
    form,
    type,
    label,
    field,
    classes,
    maxLength,
    disabled,
    errorText,
    className,
    helperText,
    placeholder,
    autoComplete,
    resetErrorsServer,
  } = props

  const { name } = field
  const { errors, touched } = form

  const showError = (errors[name] && touched[name]) || !!errorText
  const handleChange = eventChange => {
    if (resetErrorsServer && eventChange.target.value && errorText) {
      resetErrorsServer()
    }
    field.onChange(eventChange)
  }

  return (
    <div className={className}>
      <TextField
        {...field}
        id={name}
        label={label}
        inputProps={{
          maxLength,
        }}
        error={showError}
        onChange={handleChange}
        className={classes}
        type={type || 'text'}
        helperText={helperText}
        placeholder={placeholder}
        fullWidth
        disabled={disabled || false}
        autoComplete={autoComplete || 'off'}
        aria-describedby={`${name}-error`}
      />

      {showError && (
        <div className="MuiFormHelperText-root" style={{ color: 'red', fontSize: '0.75rem' }}>
          {errorText}
        </div>
      )}

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

export default InputField
