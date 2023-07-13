import React from 'react'
import { Link } from 'react-router-dom'

import './Stuff.css'
import Collections from './Collections.js'

function Stuff() {
  return (
    <div id='my-stuff'>
      {/* <Collections collectionInfo={{name: 'Campaigns', link: 'campaigns'}} /> */}
      <Collections collectionInfo={{name: 'Encounters', link: 'encounters'}} />
    </div>
  )
}

export default Stuff