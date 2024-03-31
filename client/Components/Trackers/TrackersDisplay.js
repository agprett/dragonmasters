import React, {useEffect, useState} from 'react'

import './TrackersDisplay.css'
import Tracker from './Tracker.js'
import QuickAdd from '../QuickAdd/QuickAdd.js'

function TrackersDisplay({combatants, setPopoutInfo}) {
  const [mapCombatants, setMapCombatants] = useState([])
  const [addPopup, setAddPopup] =  useState(false)

  useEffect(() => {
    setMapCombatants(combatants.map((ind, i) => {
      return {...ind, i, initiative: 0, type: (ind.player ? 'player' : 'monster')}
    }))
  }, [])

  const addCombatant = (info, type, one) => {
    console.log(info)

    if(one) {
      mapCombatants[one].name += ' - 1'
    }

    let newCombatant = {...info, type, initiative: 0, i: info.i ? mapCombatants.length + info.i : mapCombatants.length}

    console.log(newCombatant)
    setMapCombatants(mapCombatants => [...mapCombatants, newCombatant])
  }

  const setInitiative = (initiative, i) => {
    let arr = [...mapCombatants]

    arr[i].initiative = initiative

    setMapCombatants(arr)
  }

  const orderCombatants = () => {
    let arr = [...mapCombatants]

    arr.sort((a, b) => {
      if(a.initiative === b.initiative) {
        if(a.type === b.type) {
          return 1
        } else if(a.type === 'player') {
          return -1
        } else {
          return 1
        }
      } else {
        return b.initiative - a.initiative
      }
    })

    let newI = arr.map((e, i) => {return {...e, i}})

    setMapCombatants(newI)
  }

  const displayInitiativeOrder = () => {
    window.open('http://localhost:6789/stuff/encounters/27/run', 'chromeWindow', 'popup=true')
  } 

  const trackers = mapCombatants.map(ind => {
    return <Tracker key={`${ind.name}-${ind.i}`} type={ind.type} baseInfo={ind} setInitiative={setInitiative} setPopoutInfo={setPopoutInfo} />
  })

  return (
    <div className='tracker-display'>
      {addPopup && <QuickAdd combatants={mapCombatants} setAddPopup={setAddPopup} addCombatant={addCombatant} />}
      <button className='btn btn-type-2 btn-color-3 create-btn' onClick={() => setAddPopup(true)}>+ Quick Add</button>
      <button className='btn btn-type-2 btn-color-1' onClick={orderCombatants}>Order by Initiative</button>
      {/* <button className='btn btn-type-2 btn-color-1' onClick={displayInitiativeOrder}>View Initiative</button> */}
      <table className='tracker-table'>
        <thead>
          <tr className='tracker' id='tracker-head'>
            <th>Initiative</th>
            <th>Name</th>
            <th>HP</th>
            <th>AC</th>
          </tr>
        </thead>
        <tbody>
          {trackers}
        </tbody>
      </table>
    </div>
  )
}

export default TrackersDisplay