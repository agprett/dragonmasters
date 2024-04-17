import lodash from 'lodash'
import { useState } from 'react'

function FightTracker({ info, setInitiative, removeName }) {
  const [combatant, setCombatant] = useState({...info})

  const rollInitiative = () => {
    let rolled = lodash.random(1, 20)

    setInitiative(rolled, combatant.i)
    setCombatant({...combatant, initiative: rolled})
  }

  return (
    <tr className="initiative">
      <td>
        <div className="inititiative-thing">
          <input
            className='base-input medium-input'
            value={combatant.initiative}
            onChange={e => {
              setInitiative(+e.target.value, combatant.i)
              setCombatant({...combatant, initiative: +e.target.value})
            }}
          />
          <button onClick={rollInitiative} className="btn btn-type-3 btn-color-1">Roll</button>
        </div>
      </td>
      <td>{combatant.name}</td>
      <td>
        <button
          className='btn btn-type-3 btn-color-4'
          onClick={() => {
            removeName(combatant.i)
          }}
        >X</button></td>
    </tr>
  )
}

export default FightTracker
