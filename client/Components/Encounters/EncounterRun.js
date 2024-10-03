import React, {useEffect, useState} from "react";
import { useLoaderData, Link } from "react-router-dom";

import './Encounter.css'
import MonsterPopout from "../Popout/MonsterPopout.js";
import Tracker from './Tracker.js'
import QuickAdd from '../QuickAdd/QuickAdd.js'


function EncounterRun() {
  const {initialCombatants, name, encounter_id} = useLoaderData()

  const [popoutInfo, setPopoutInfo] = useState(false)
  const [combatants, setCombatants] = useState([])
  const [addPopup, setAddPopup] =  useState(false)
  const [playerFriendly, setPlayerFriendly] = useState(false)

  useEffect(() => {
    setCombatants(initialCombatants.map((ind, i) => {
      return {...ind, i, initiative: 0, type: (ind.index ? 'monster' : 'player')}
    }))
  }, [])

  const addCombatant = (info, type, first) => {
    if(first) {
      setCombatants(combatants => combatants.map(combatant => {
        if(combatant.i === first) {
          return {...combatant, name: combatant.name + ' - 1'}
        } else {
          return combatant
        }
      }))
    }

    let newCombatant = {...info, type, initiative: 0, i: info.i ? combatants.length + info.i : combatants.length}

    setCombatants(combatants => [...combatants.map(combatant => {
      if(combatant.index === newCombatant.index) {
        return {...combatant, amount: combatant.amount + 1}
      } else {
        return combatant
      }
    }), newCombatant])
  }

  const removeCombatant = (i) => {
    setCombatants(combatants => combatants.filter(combatant => combatant.i !== i))
  }

  const setInitiative = (initiative, i) => {
    setCombatants(combatants.map(combatant => {
      if(combatant.i === i) {
        return {...combatant, initiative}
      } else {
        return combatant
      }
    }))
  }

  const orderCombatants = () => {
    let sortedCombatants = [...combatants]

    sortedCombatants.sort((a, b) => {
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

    setCombatants(sortedCombatants)

    setCombatants(combatants => combatants.map((e, i) => {return {...e, i}}))
  }


  const trackers = combatants.map(ind => {
    return <Tracker key={`${ind.name}-${ind.i}`} type={ind.type} baseInfo={ind} setInitiative={setInitiative} setPopoutInfo={setPopoutInfo} removeCombatant={removeCombatant} />
  })


  return (
    <div className="page-layout-2">
      <Link
        className="btn btn-type-1 btn-color-1 back-btn"
        to={`/stuff/encounters/${encounter_id}`}
      >{'<'} Back</Link>

      <section className="breakdown-top">
        <div className="breakdown-base-info">
          <h2>{name}</h2>
        </div>

        <div className="breakdown-top-buttons">
          <button className='btn btn-type-2 btn-color-1' onClick={orderCombatants}>Order</button>
          <button
            className='btn btn-type-2 btn-color-1'
            onClick={() => setPlayerFriendly(!playerFriendly)}
          >Show {playerFriendly ? 'DM' : 'Players'} Initiative</button>
        </div>
      </section>

      <div className='tracker-display'>
        {addPopup && <QuickAdd combatants={combatants} setAddPopup={setAddPopup} addCombatant={addCombatant} />}
        <table className={`tracker-table${playerFriendly ? ' hidden-columns' : ''}`}>
          <thead>
            <tr className='tracker' id='tracker-head'>
              <th>Initiative</th>
              <th>Name</th>
              <th>HP</th>
              <th>AC</th>
              <th className="tracker-btns">
                <button
                  className='btn btn-type-4 btn-color-3'
                  onClick={() => setAddPopup(true)}
                >Add</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {trackers}
          </tbody>
        </table>
      </div>
      
      {popoutInfo && <MonsterPopout specs={popoutInfo} setPopoutInfo={setPopoutInfo} />}
      
    </div>
  )
}

export default EncounterRun