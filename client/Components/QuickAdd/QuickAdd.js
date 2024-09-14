import { useEffect, useState } from "react"

import './QuickAdd.css'
import QuickMonster from "./QuickMonster.js"
import QuickPlayer from "./QuickPlayer.js"

function QuickAdd({combatants, setAddPopup, addCombatant}) {
  const [type, setType] = useState('none')
  const [players, setPlayers] = useState([])
  const [monsters, setMonsters] = useState([])
  
  useEffect(() => {
    const tempPlayers = []
    const tempMonsters = []

    combatants.forEach(element => {
      if(element.type === 'player') {
        tempPlayers.push(element.name)
      } else {
        if(!tempMonsters[element.index]) {
          tempMonsters[element.index] = {
            ...element,
            name: element.name.split(' - ')[0]
          }
        }
      }
    });

    setPlayers(tempPlayers)
    setMonsters(Object.values(tempMonsters))
  }, [])

  const closePopup = () => {
    setType('none')
    setAddPopup(false)
  }

  return (
    <div className="quick-add-wrapper">
      <div className="quick-add">
        <h4 className="dashboard-head">Quick Add</h4>
        <button className="btn btn-type-3 btn-color-4 close-btn" onClick={closePopup}>Cancel</button>
        {type === 'none' && (
          <div className="type-selection">
            <div className="quick-options">
              <h4>Player</h4>
              <button className="btn btn-type-2 btn-color-1" onClick={() => setType('player')}>Select</button>
            </div>
            <h4>- or -</h4>
            <div className="quick-options">
              <h4>Monster</h4>
              <button className="btn btn-type-2 btn-color-1" onClick={() => setType('monster')}>Select</button>
            </div>
          </div>
        )}
        {type === 'player' && <QuickPlayer players={players} closePopup={closePopup} addCombatant={addCombatant} setType={setType} />}
        {type === 'monster' && <QuickMonster monsters={monsters} closePopup={closePopup} addCombatant={addCombatant} setType={setType} />}
      </div>
    </div>
  )
}

export default QuickAdd