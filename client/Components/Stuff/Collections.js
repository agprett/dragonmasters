import React from 'react'
import { Link } from 'react-router-dom'

function Collections({collectionInfo}) {
  const {name, link, backgroundImg} = collectionInfo

  return (
    <div className='collections'>
      <h3>My {name}</h3>
      <Link className='btn btn-type-2 btn-color-1' to={`/stuff/${link}`}>View All {name}</Link>
      <Link className='btn btn-type-3 btn-color-3 create-btn-2' to={`/stuff/${link}/new`}>+Create New</Link>
      <img src={backgroundImg} alt={name + '-img'} className='collections-img'/>
    </div>
  )
}

export default Collections