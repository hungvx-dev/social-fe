import React from 'react'
import Topic from './Topic'

function Topics({ className, topics }) {
  return (
    <ul className={className}>{!!topics?.length > 0 && topics.map((topic, i) => <Topic key={i} topic={topic} />)}</ul>
  )
}

export default Topics
