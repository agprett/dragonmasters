import React from 'react'
import { Link } from 'react-router-dom'

function Collections(props) {
  const {name, link} = props.collectionInfo

  return (
    <div className='collections'>
      <h3>My {name}</h3>
      <Link className='btn btn-type-1 btn-color-1' to={`/stuff/${link}`}>View All {name}</Link>
      <Link className='btn btn-type-2 btn-color-3' to={`/stuff/${link}/new`}>+ Create New</Link>
    </div>
  )
}

export default Collections