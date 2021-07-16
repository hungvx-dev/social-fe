import React, { useCallback, useRef, useState } from 'react'
import { Icon } from 'Templates/icon/Icon'

import useClickOutside from '@/hooks/useClickOutside'

export const Dropdown = ({ icon, render, title, className }) => {
  const [showDropdown, setDropdownState] = useState(false)
  const dropdown = useRef(null)

  const dismissDropdown = useCallback(() => {
    setDropdownState(false)
  }, [setDropdownState])

  useClickOutside(dropdown, dismissDropdown)

  const toggleDropdown = () => {
    setDropdownState(!showDropdown)
  }

  return (
    <div ref={dropdown} className={className}>
      <Icon onClick={toggleDropdown} icon={icon} title={title} width={18} />
      {showDropdown && render(dismissDropdown)}
    </div>
  )
}
