import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

import bossBattle from '../../images/boss-battle.jpg'
import stuffImg from '../../images/stuff-background.png'
import guidesImg from '../../images/guides-background.png'

function Home() {
  return (
    <div className='page-layout-1'>
      <section id="opener">
        <h1 className="opac-box">DragonMaster's Codex</h1>
        <h2 className='opener-desc'>If you see this somethings wrong</h2>
        <img src={bossBattle} alt="boss-battle-image" id="opener-img"/>
      </section>

      <section id='home-site-description'>
        <p>
          This application is meant to be an assisstant for Dungeon Masters as they run campaigns. There are two main pieces to this site: a guide section and a "stuff" section.
        </p>
        <p>
          The guide contains all available <a className="plaintext-link-dark" href='https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf' target='_blank'>open source data</a> as well as any user creations! The data is sectioned into related sets of data for ease of viewing(monsters, spells, etc.). There are is a search/filter section for each of the sections. The goal of this section is to provide quick access to the stats and info of different things for players and dm's for in-game reference and study.
        </p>
        <p>
          The "Stuff" section can only be used if signed in. The goal of this section is to help track created campaigns, encounters, characters and more! Inside of this section is all of your specific creations, from campaigns to spells to items!
        </p>
        <p>
          This is a work in progress and as new things get added, there may be bugs. Feel free to notify us of bugs or suggestions for updates!
        </p>
      </section>

      <section className='collections-display'>
        <div className="collections">
            <h5>Codex</h5>
            <Link to="/codex" className="btn btn-type-1 btn-color-1">View</Link>
            <img src={guidesImg} alt='guides-img' className='collections-img'/>
          </div>
  
          <div className="collections">
            <h5>Stuff<br/>(Must be signed in)</h5>
            <Link to="/stuff" className="btn btn-type-1 btn-color-1">View</Link>
            <img src={stuffImg} alt='stuff-img' className='collections-img'/>
          </div>
      </section>
    </div>
  )
}

export default Home