import React from 'react'
import { Link } from 'react-router-dom'

import monstersImg from '../../images/monsters-background.jpg'
import spellsImg from '../../images/spells-background.jpg'

function GuideHome () {
  return (
    <section className='page-layout-2'>
      <h1>Guides</h1>
      <section className='collections-display'>
        <div className="collections">
          <h3>Monsters</h3>
          <Link className='btn btn-type-1 btn-color-1' to='monsters'>View</Link>
          <img src={monstersImg} alt='monsters-img' className='collections-img'/>
        </div> 
        <div className="collections">
          <h3>Spells</h3>
          <Link className='btn btn-type-1 btn-color-1' to='spells'>View</Link>
          <img src={spellsImg} alt='spells-img' className='collections-img'/>
        </div>
      </section>
    </section>
  )
}

export default GuideHome