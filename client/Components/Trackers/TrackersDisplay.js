import React, {useEffect, useState} from 'react'

import './TrackersDisplay.css'
import Tracker from './Tracker.js'
import QuickAdd from '../QuickAdd/QuickAdd.js'

function TrackersDisplay({initialData, setPopoutInfo}) {
  const [combatants, setCombatants] = useState([])
  const [addPopup, setAddPopup] =  useState(false)

  useEffect(() => {
    setCombatants(initialData.map((ind, i) => {
      return {...ind, i, initiative: 0, type: (ind.player ? 'player' : 'monster')}
    }))
  }, [])

  const addCombatant = (info, type, one) => {
    console.log(info)

    if(one) {
      combatants[one].name += ' - 1'
    }

    let newCombatant = {...info, type, initiative: 0, i: info.i ? combatants.length + info.i : combatants.length}

    console.log(newCombatant)
    setCombatants(combatants => [...combatants, newCombatant])
  }

  const setInitiative = (initiative, i) => {
    let arr = [...combatants]

    arr[i].initiative = initiative

    setCombatants(arr)
  }

  const orderCombatants = () => {
    let arr = [...combatants]

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

    setCombatants(newI)
  }

  const trackers = combatants.map(ind => {
    return <Tracker key={`${ind.name}-${ind.i}`} type={ind.type} baseInfo={ind} setInitiative={setInitiative} setPopoutInfo={setPopoutInfo} />
  })

  return (
    <div className='tracker-display'>
      {addPopup && <QuickAdd combatants={combatants} setAddPopup={setAddPopup} addCombatant={addCombatant} />}
      <button className='btn btn-type-2 btn-color-3 create-btn' onClick={() => setAddPopup(true)}>+ Quick Add</button>
      <button className='btn btn-type-2 btn-color-1' onClick={orderCombatants}>Order by Initiative</button>
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