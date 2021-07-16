import { TextareaAutosize } from '@material-ui/core'
import React, { useRef } from 'react'
import { EmojiInput } from 'Templates/emoji/Emoji'
import { EmojiSuggestion } from 'Templates/emoji/EmojiSuggestion'

function InputEmoji(props) {
  const { field, form, label, disabled, placeholder, autoComplete, row, className } = props
  const { name, value } = field
  const { errors, touched } = form
  const showError = errors[name] && touched[name]
  const textareaRef = useRef(null)

  const emojiInserted = messageWithEmoji => {
    const eventChange = {
      target: {
        name,
        value: messageWithEmoji,
      },
    }
    field.onChange(eventChange)
    textareaRef.current.focus()
  }

  return (
    <div className={className}>
      {label && <label htmlFor={name}>{label}</label>}
      <TextareaAutosize
        {...field}
        id={name}
        // rowsMax={4}
        rows={1}
        ref={textareaRef}
        className="textarea"
        rowsMin={row || 3}
        placeholder={placeholder}
        disabled={disabled || false}
        autoComplete={autoComplete || 'off'}
        style={{ width: '100%', resize: 'none' }}
      />
      <EmojiInput value={value} onSelection={emojiInserted} className="emoji" />
      <EmojiSuggestion value={value} onSelection={emojiInserted} />

      <div className="is-invalid" />
      {showError && <div>{errors[name]}</div>}
    </div>
  )
}

export default InputEmoji
