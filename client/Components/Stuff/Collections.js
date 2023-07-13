import React from 'react'
import { Link } from 'react-router-dom'

function Collections(props) {
  const {name, link} = props.collectionInfo

  return (
    <div className='collections'>
      <h2>My {name}</h2>
      <button>
        <Link to={`/stuff/${link}`}>View My {name}</Link>
      </button>
    </div>
  )
}

export default Collections