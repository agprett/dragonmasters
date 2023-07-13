import React from 'react'
import { Link } from 'react-router-dom'

import './GuideHome.css'

function GuideHome () {
  return (
    <section id='guide-home'>
      <h1>Guides</h1>
      {/* <form>
        <p>Search a name to query all guides</p>
        <input placeholder='Name'/>
        <button type='submit'>Search</button>
      </form> */}
      <section id='guide-display'>
        <Link className='guide-div' to='/guide/monsters'>Monsters</Link>
        <Link className='guide-div' to='/guide/spells'>Spells</Link>
      </section>
    </section>
  )
}

export default GuideHome