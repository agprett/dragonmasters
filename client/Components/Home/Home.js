import React from 'react'
import './Home.css'

import bossBattle from '../../images/boss-battle.jpeg'

function Home() {
  return (
    <div id='home-page'>
      <section id="opener">
        <h1 className="opac-box">DragonMasters</h1>
        <img src={bossBattle} alt="boss-battle-image" id="opener-img"/>
      </section>

      <section id='home-site-description'>
        <p>
          This application is meant to be an assisstant for Dungeon Masters as they run campaigns. There are two main pieces to this site: a guide section and a "stuff" section. Both have links further down as well as in the nav bar at the top.
        </p>
        <p>
          The guide contains all available <a href='https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf' target='_blank'>OGL data</a> as well as any user creations! The data is sectioned into related sets of data for ease of viewing(monsters, spells, etc.). There are is a search/filter section for each of the sections. The goal of this section is to provide quick access to the stats and info of different things for players and dm's for in-game reference and study.
        </p>
        <p>
          The "Stuff" section can only be used if signed in. The goal of this section is to help track created campaigns, encounters, characters and more! Inside of this section is all of your specific creations, from campaigns to spells to items!
        </p>
        <p>
          This is a work in progress and as new things get added, there may be bugs. Feel free to notify us of bugs or suggestions for updates!
        </p>
      </section>

      <section id='home-quick-sections'>
        <div>
          <p>Guides</p>
        </div>

        <div>
          <p>Stuff(Must be signed in)</p>
        </div>
      </section>
    </div>
  )
}

export default Home