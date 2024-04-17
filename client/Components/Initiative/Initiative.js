import { useState } from "react"

import FightTracker from "./FightTracker.js"
import AddCombatant from "./AddCombatant.js"

function Initiative() {
  const [combatants, setCombatants] = useState([])
  const [display, setDisplay] = useState(false)

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
  
  const clearInitiative = () => {
    setCombatants([])
  }
  
  const addName = (name, count) => {
    if(count > 1) {
      for(let i = 1; i <= count; i++) {
        setCombatants(state => [...state, {name: `${name} ${i}`, initiative: 0, i: combatants.length + i - 1}])
      }
    } else {
      setCombatants([...combatants, {name: name, initiative: 0, i: combatants.length}])
    }
  }

  const removeName = (i) => {
    let arr = [...combatants]

    let remove = arr.findIndex(ele => ele.i === i)

    arr.splice(remove, 1)

    setCombatants(arr)
  }

  const setInitiative = (initiative, i) => {
    let arr = [...combatants]

    let index = arr.findIndex(ele => ele.i === i)

    arr[index].initiative = initiative

    setCombatants(arr)
  }

  const initiative = combatants.map(combatant => <FightTracker info={combatant} key={`${combatant.name}-${combatant.i}`} setInitiative={setInitiative} removeName={removeName} />)

  return (
    <div id="initiative-page">
      {display && <AddCombatant addName={addName} setDisplay={setDisplay} />}
      <h1>Initiative</h1>
      <button className="btn btn-type-2 btn-color-2" onClick={() => orderCombatants()}>Order Combatants</button>
      <table className="initiative-table">
        <thead>
          <tr id="initiative-head" className="initiative">
            <th>Initiative</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {combatants[0] ? (
            initiative
          ) : (
            <tr className="initiative empty-initiative" >
                <td>No Combatants Added</td>
              </tr>
            )
          }
        </tbody>
      </table>
      <button className="btn btn-type-2 btn-color-3" onClick={() => setDisplay(true)}>Add Combatant</button>
      <button className="btn btn-type-2 btn-color-4" onClick={clearInitiative}>Clear List</button>
    </div>
  )
}

export default Initiative