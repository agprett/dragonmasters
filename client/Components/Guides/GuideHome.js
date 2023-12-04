import React from 'react'
import { Link } from 'react-router-dom'

import './Guide.css'

function GuideHome () {
  return (
    <section className='page-layout-2'>
      <h1>Guides</h1>
      {/* <form>
        <p>Search a name to query all guides</p>
        <input placeholder='Name'/>
        <button type='submit'>Search</button>
      </form> */}
      <section className='collections-display'>
        <div class="collections">
          <h3>Monsters</h3>
          <Link class='btn btn-type-2 btn-type-2-hover' to='monsters'>View</Link>
        </div> 
        <div class="collections">
          <h3>Spells</h3>
          <Link class='btn btn-type-2 btn-type-2-hover' to='spells'>View</Link>
        </div>
      </section>
    </section>
  )
}

export default GuideHome