import React from 'react'

import Collections from './Collections.js'

import campaignImg from '../../images/campaign-background.jpg'
import encounterImg from '../../images/encounter-background.jpg'
import charactersImg from '../../images/characters-background.jpg'
import npcsImg from '../../images/npcs-background.jpg'

function Stuff() {
  return (
    <section id='my-stuff' className='page-layout-2'>
      <h2>Stuff</h2>
      <div className='collections-display'>
        <Collections collectionInfo={{name: 'Campaigns', link: 'campaigns', backgroundImg: campaignImg}} />
        <Collections collectionInfo={{name: 'Encounters', link: 'encounters', backgroundImg: encounterImg}} />
        <Collections collectionInfo={{name: 'Characters', link: 'characters', backgroundImg: charactersImg}} />
        <Collections collectionInfo={{name: 'NPCs', link: 'npcs', backgroundImg: npcsImg}} />
      </div>
      {/* <h2>Other Stuff</h2>
      <div className='collections-display'>
        <Collections collectionInfo={{name: 'Spells', link: 'spells'}} />
      </div> */}
    </section>
  )
}

export default Stuff