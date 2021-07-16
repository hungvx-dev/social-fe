import { emojiIndex } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import React, { useRef } from 'react'
import styled from 'styled-components'

import useClickOutside from '../../hooks/useClickOutside'

const S_Box = styled.ul`
  position: absolute;
  top: 40px;
  background: white;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  height: 300px;
  overflow: hidden;
  z-index: 10;
  :hover {
    overflow: auto;
  }
  ::-webkit-scrollbar {
    width: 4px;
    visibility: hidden;
    /* background-color: #f5f5f5; */
  }
  ::-webkit-scrollbar-thumb {
    width: 4px;
    border-radius: 3px;
    background-color: #b2b2b26b;
  }
`
const S_EmojiItem = styled.li`
  cursor: pointer;
  padding: 5px 0px;
  transition: 0.3s;
  border-radius: 4px;
  :hover {
    background: #48bb78;
  }
  button {
    font-size: 16px;
    display: block;
    border: none;
    background: none;
    width: 100%;
  }
`

const getEmojisFromEmojiSearchTerm = emojiSearchTerm =>
  emojiIndex.search(emojiSearchTerm)

const getEmojiSearchTerm = (content, replaceEmoji) => {
  const colons = content.match(/:([a-z_]+)(:)?/)
  if (!colons) return ''

  if (colons[2] !== undefined) {
    const match = emojiIndex.emojis[colons[1]]
    if (match && 'native' in match) {
      replaceEmoji(`${colons[1]}:`, match, content)
    } else {
      const results = emojiIndex.search(colons[1])
      if (results[0] && 'native' in results[0]) {
        replaceEmoji(`${colons[1]}:`, results[0], content)
      }
    }
    return ''
  }

  if (colons[1].length > 1) return colons[1]

  return ''
}

const EmojiSuggestion = ({ value, onSelection }) => {
  const suggestions = useRef(null)

  const replaceEmoji = (search, emoji, content) => {
    if ('native' in emoji) {
      const txt = content.replace(`:${search}`, emoji.native)
      onSelection(txt)
    }
  }

  let displayed = false

  const emojiSearchTerm = getEmojiSearchTerm(value, replaceEmoji)
  const emojis = getEmojisFromEmojiSearchTerm(emojiSearchTerm)

  if (emojiSearchTerm !== '' && emojis.length > 0) {
    displayed = true
  } else {
    displayed = false
  }
  useClickOutside(suggestions, () => {
    displayed = false
  })

  const EmojiResult = ({ emoji }) => (
    <S_EmojiItem className="emoji-item">
      <button
        type="button"
        onClick={() => replaceEmoji(emojiSearchTerm, emoji, value)}
      >
        {'native' in emoji && emoji.native}
        {emoji.colons}
      </button>
    </S_EmojiItem>
  )

  return (
    <>
      {displayed && (
        <S_Box ref={suggestions}>
          Suggestions for <b>{emojiSearchTerm}</b>
          {emojis.map((emoji, i) => (
            <EmojiResult key={i} emoji={emoji} />
          ))}
        </S_Box>
      )}
    </>
  )
}

export { EmojiSuggestion }
