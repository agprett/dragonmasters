import React from 'react'
import { Link } from 'react-router-dom'

function GuideHome () {
  return (
    <section className='page-layout-2'>
      <h1>Guides</h1>
      <section className='collections-display'>
        <div className="collections">
          <h3>Monsters</h3>
<<<<<<< HEAD
          <Link className='btn btn-type-2 btn-type-2-hover' to='monsters'>View</Link>
        </div> 
        <div className="collections">
          <h3>Spells</h3>
          <Link className='btn btn-type-2 btn-type-2-hover' to='spells'>View</Link>
=======
          <Link className='btn btn-type-1 btn-color-1' to='monsters'>View</Link>
        </div> 
        <div className="collections">
          <h3>Spells</h3>
          <Link className='btn btn-type-1 btn-color-1' to='spells'>View</Link>
>>>>>>> dev
        </div>
      </section>
    </section>
  )
}

export default GuideHome