import styled from 'styled-components'

import { InputTextArea, InputFile } from 'Templates/form'
import InputField from 'Templates/form/InputField'
import { Close } from 'Templates/icon/IconsSvg'

export const S_InputField = styled(InputField)`
  width: 100%;
`
export const S_InputTextArea = styled(InputTextArea)`
  width: 100%;
`
export const S_InputFile = styled(InputFile)`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 10;
`

export const S_Close = styled(Close)`
  position: absolute;
  top: -12px;
  right: -12px;
  background: white;
  border-radius: 50%;
  color: red;
  z-index: 10;
  cursor: pointer;
`

export const S_Description = styled.div`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  line-height: 1.2rem;
  -webkit-line-clamp: 3;
  /* text-align: justify; */
  font-style: italic;
`
