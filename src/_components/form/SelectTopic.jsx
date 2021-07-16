import React, { useCallback, useRef, useState } from 'react'

import { Icon } from 'Templates/icon/Icon'
import { Circle } from 'Templates/icon/IconsSvg'
import useClickOutside from '@/hooks/useClickOutside'

const SelectTopic = ({ topics, onChange, topicSelected }) => {
  const [isShow, setIsShow] = useState(false)

  const dropdown = useRef(null)

  const dismissDropdown = useCallback(() => {
    setIsShow(false)
  }, [setIsShow])

  useClickOutside(dropdown, dismissDropdown)

  const handleSelected = topic => {
    setIsShow(false)
    onChange(topic)
  }

  return (
    <div className="relative md:max-w-xs" ref={dropdown}>
      <div
        className={`false w-full flex items-center justify-between select-none bg-white cursor-pointer px-3 border-gray-300 border rounded-lg
        ${isShow && ' bg-green-400 border-t border-r border-l rounded-tl-lg rounded-tr-lg shadow-xl'}`}
        style={{ paddingTop: 10, paddingBottom: 10 }}
        onClick={() => {
          setIsShow(prev => !prev)
        }}
        aria-hidden="true"
        // onChange={handleChange}
      >
        <div className="flex items-center">
          {Object.keys(topicSelected).length > 0 ? (
            <>
              <Icon icon={topicSelected.icon} />
              <span className="ml-3 text-sm font-medium" style={{ marginTop: 3 }}>
                {topicSelected.name}
              </span>
            </>
          ) : (
            <>
              <Circle />
              <div className="ml-3 text-sm font-medium">Chọn chủ đề diễn đàn</div>
            </>
          )}
        </div>
      </div>

      {isShow && (
        <div
          className="absolute shadow-xl bg-white block w-full m-0 border-t-0 border rounded-b-sm border-gray-300 z-50"
          style={{ top: '100%' }}
        >
          <div className="forum_frameIcon__2fNr2 overflow-scroll" style={{ maxHeight: '390px' }}>
            {topics &&
              topics.map((topic, i) => (
                <div
                  className="flex items-center py-2 hover:bg-green-400 cursor-pointer pl-3 "
                  value={topic.slug}
                  key={i}
                  onClick={() => handleSelected(topic)}
                  aria-hidden="true"
                >
                  <Icon icon={topic.icon} />
                  <span className="mx-3 text-sm font-medium" style={{ marginTop: 3 }}>
                    {topic.name}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectTopic
