import React from 'react'
import './Home.css'

import bossBattle from '../../images/boss-battle.jpeg'

function Home() {
  return (
    <div id='home-page'>
      <div id="opener">
        <h1 className="opac-box">DragonMasters</h1>
        <p className="opac-box">A guide and notebook for Dungeons and Dragons</p>
        <img src={bossBattle} alt="boss-battle-image" id="opener-img"/>
      </div>
    </div>
  )
}

export default Home