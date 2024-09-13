import React from 'react'

import Collections from './Collections.js'

import campaignImg from '../../images/campaign-background.jpg'
import encounterImg from '../../images/encounter-background.jpg'

function Stuff() {
  return (
    <section id='my-stuff' className='page-layout-2'>
      <h2>DM Stuff</h2>
      <div className='collections-display'>
        <Collections collectionInfo={{name: 'Campaigns', link: 'campaigns', backgroundImg: campaignImg}} />
        <Collections collectionInfo={{name: 'Encounters', link: 'encounters', backgroundImg: encounterImg}} />
      </div>
      {/* <h2>Other Stuff</h2>
      <div className='collections-display'>
        <Collections collectionInfo={{name: 'Characters', link: 'characters'}} />
        <Collections collectionInfo={{name: 'Spells', link: 'spells'}} />
      </div> */}
    </section>
  )
}

export default Stuff