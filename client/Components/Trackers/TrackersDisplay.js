import React from 'react'

import './TrackersDisplay.css'
import Tracker from './Tracker.js'

function TrackersDisplay(props) {
  const {type, monster} = props

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
          <h2>{monster.name}</h2>
          {trackerBuilder(monster.count)}
          <button className='info-button'>i</button>
        </div>
      ) : (
        <p>x</p>
      )}
    </>
  )
}

export default TrackersDisplay