import 'emoji-mart/css/emoji-mart.css'
import React from 'react'
import { Picker as EmojiPicker } from 'emoji-mart'
import styled from 'styled-components'

import { Dropdown } from 'Templates/commons/Dropdown'
import { Icons } from 'Templates/icon/Icon'

const S_EmojiBox = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  .emoji-mart-emoji span {
    cursor: pointer;
  }
`

const EmojiInput = ({ value, className, onSelection }) => (
  <Dropdown
    icon={Icons.Emoji}
    className={className}
    title="Open emoji selector"
    render={dismiss => {
      const addEmoji = emoji => {
        if ('native' in emoji) {
          onSelection(`${value}${emoji.native}`)
          dismiss()
        }
      }
      return (
        <S_EmojiBox>
          <EmojiPicker
            set="google"
            native
            emoji=""
            title=""
            onSelect={addEmoji}
          />
        </S_EmojiBox>
      )
    }}
  />
)

export { EmojiInput }
