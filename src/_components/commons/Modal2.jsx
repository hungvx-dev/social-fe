import React from 'react'

function Modal(props) {
  const { title, setIsShowModal, component: Component, ...rest } = props
  return (
    <div className="z-40 fixed w-full h-full top-0 left-0 pb-64 overflow-scroll">
      <div
        className="fixed w-full bg-gray-800 h-full overflow-y-auto"
        style={{ opacity: '0.35' }}
        onClick={() => setIsShowModal(false)}
        aria-hidden="true"
      />
      <div className="relative bg-white w-11/12 md:w-3/5 mx-auto rounded shadow-lg z-40 mt-10 overflow-y-auto">
        <div className="flex justify-between items-center py-1 px-3 bg-gray-200">
          <p className="text-gray-900 font-medium text-sm w-full pl-1">{title}</p>
          <div className="cursor-pointer z-50" onClick={() => setIsShowModal(false)} aria-hidden="true">
            <svg
              className="fill-current text-gray-600 hover:text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 18 18"
            >
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
            </svg>
          </div>
        </div>
        <div className="h-px bg-gray-300" />

        {Component && <Component {...rest} setIsShowModal={setIsShowModal} />}
      </div>
    </div>
  )
}

export default React.memo(Modal)
