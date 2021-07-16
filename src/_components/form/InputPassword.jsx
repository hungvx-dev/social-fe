import React, { useState } from 'react'
import { ErrorMessage } from 'formik'
import { FormHelperText, TextField, InputAdornment, IconButton } from '@material-ui/core'

import { Visibility, VisibilityOff } from 'Templates/icon/IconsSvg'

function InputField(props) {
  const { field, form, label, disabled, placeholder, autoComplete, helperText, errorText, className } = props

  const { name } = field
  const { errors, touched } = form
  const showError = (errors[name] && touched[name]) || !!errorText

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(pre => !pre)

  return (
    <div className={className}>
      <TextField
        {...field}
        id={name}
        label={label}
        error={showError}
        type={showPassword ? 'text' : 'password'}
        helperText={helperText}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                {showPassword ? (
                  <Visibility style={{ width: '16px', height: '16px' }} />
                ) : (
                  <VisibilityOff style={{ width: '16px', height: '16px' }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        placeholder={placeholder}
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
            {errors[name] || errorText}
          </FormHelperText>
        )}
      />
    </div>
  )
}

export default InputField
