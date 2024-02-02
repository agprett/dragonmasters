import { useState } from "react"

import QuickMonster from "./QuickMonster.js"
import QuickPlayer from "./QuickPlayer.js"

function QuickAdd({combatants, setAddPopup}) {
  const [type, setType] = useState('none')
  console.log(combatants)

  const closePopup = () => {
    setType('none')
    setAddPopup(false)
  }

  return (
    <div className="quick-add">
      <button className="btn btn-type-3 btn-color-4 close-btn" onClick={closePopup}>Cancel</button>
      <h2 className="dashboard-head">Quick Add</h2>
      {type === 'none' && (
        <div className="type-selection">
          <div className="quick-options">
            <h2>Player</h2>
            <button className="btn btn-type-2 btn-color-2" onClick={() => setType('player')}>Select</button>
          </div>
          <h3>- or -</h3>
          <div className="quick-options">
            <h2>Monster</h2>
            <button className="btn btn-type-2 btn-color-2" onClick={() => setType('monster')}>Select</button>
          </div>
        </div>
      )}
      {type === 'player' && <QuickPlayer closePopup={closePopup} />}
      {type === 'monster' && <QuickMonster closePopup={closePopup} />}
    </div>
  )
}

export default QuickAdd