import { useEffect, useState } from "react"
import axios from 'axios'

function QuickPlayer({players, closePopup, addCombatant, setType}) {
  const [addable, setAddable] = useState([])

  useEffect(() => {
    axios.get('/api/characters')
      .then(res => {
        setAddable(res.data)
      })
  }, [])

  let playersDisplay = addable.filter(player => !players.includes(player.name)).map(player => {
    return (
      <div key={player.name}>
        {player.name} 
        <button onClick={() => {
          addCombatant(player, 'player')
          closePopup()
        }}>Add</button>
      </div>
    )
  })

  return (
    <div>
      <button className="btn btn-type-3 btn-color-4 close-btn" onClick={closePopup}>Cancel</button>
      <button className="btn btn-type-3 btn-color-4" onClick={() => setType('none')}>Back</button>
      {playersDisplay}
    </div>
  )
}

export default QuickPlayer