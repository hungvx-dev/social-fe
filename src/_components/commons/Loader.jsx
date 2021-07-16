import React from 'react'
import PropTypes from 'prop-types'

const Loading = ({ error, size = 50 }) => {
  if (error) {
    return (
      <section>
        <div>Sorry, there was a problem loading the page.</div>
      </section>
    )
  }

  return (
    <section className="loader">
      <div className="loader__body" style={{ width: size, height: size }} />
    </section>
  )
}

Loading.displayName = 'Loader'

Loading.propTypes = {
  error: PropTypes.bool,
  size: PropTypes.number,
}

Loading.defaultProps = {
  error: false,
  size: 50,
}
export default Loading
