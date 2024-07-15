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
      <div className="info-list-item quick-add-char" key={player.name}>
        <h2>{player.name}</h2>
        <button
          className="btn btn-type-3 btn-color-3"
          onClick={() => {
            addCombatant(player, 'player')
            closePopup()
          }}
        >Add</button>
      </div>
    )
  })

  return (
    <div className="quick-add-display">
      <button className="btn btn-type-3 btn-color-4 close-btn" onClick={closePopup}>Cancel</button>
      <button className="btn btn-type-3 btn-color-1 back-btn-2" onClick={() => setType('none')}>{'< Back'}</button>
      <div className="info-list-group">
        <section className="info-list-wrapper info-list-full">
          <h2 className="info-list-head">Players:</h2>
          {addable[0] ? playersDisplay : <p>No available players</p>}
        </section>
      </div>
    </div>
  )
}

export default QuickPlayer