import React from 'react'
import axios from 'axios'

import './TrackersDisplay.css'
import Tracker from './Tracker.js'

function TrackersDisplay(props) {
  const {type, monster, displayPopup} = props

  const trackerBuilder = (count) => {
    const trackerArray = []

    for(let i = 1; i <= count; i++){
      let newTracker = <Tracker monster={monster.info} i={i} />

      trackerArray.push(newTracker)
    }

    return trackerArray
  }

  return (
    <>
      {monster.name ? (
        <div className='monster-tracker-display'>
          <h2 className='monster-tp-name'>{monster.name}</h2>
          <button
            className='info-button'
            onClick={() => {
              displayPopup(monster.info)
            }}
          >i</button>
          
          {trackerBuilder(monster.count)}
        </div>
      ) : (
        <p>x</p>
      )}
    </>
  )
}

export default TrackersDisplay