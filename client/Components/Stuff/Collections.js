import React from 'react'
import { Link } from 'react-router-dom'

function Collections(props) {
  const {name, link} = props.collectionInfo

  return (
    <div className='collections'>
      <h2>My {name}</h2>
      <h3>4 saved {link}</h3>
      <button className='collections-buttons'>
        <Link to={`/stuff/${link}`}>View All {name}</Link>
      </button>
      <button className='collections-buttons'>
        <Link to={`/stuff/${link}/new`}>Create New</Link>
      </button>
    </div>
  )
}

export default Collections