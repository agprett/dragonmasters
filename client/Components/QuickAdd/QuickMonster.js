import { useState } from "react"
import axios from 'axios'

import ShowMonster from "./ShowMonsters"

function QuickMonster({monsters, closePopup, addCombatant, setType}) {
  const [search, setSearch] = useState('')
  const [found, setFound] = useState([])

  const findMonsters = (e) => {
    e.preventDefault()

    if(search) {
      axios.get(`/api/monsters?name=${search}&full=true`)
        .then(res => {
          setFound(res.data)
        })
    } else {
      alert('Please enter a search')
    }
  }

  const addMonsters = (info, total) => {
    const amount = info.amount || 0

    for(let i = 0; i < total; i++) {
      let data = {
        ...info,
        name: total + amount === 1 ? info.name : info.name + ' - ' + (amount + i + 1),
        i,
        type: 'monster',
        amount: amount + 1
      }
      addCombatant(data, 'monster', info.amount === 1 && i === 0 ? info.i : false)
    }
  }

  let monstersDisplay = monsters.map(monster => {
    return <ShowMonster key={monster.name} monster={monster} addMonsters={addMonsters} closePopup={closePopup} />
  })

  let foundDisplay = found.map(monster => {
    return <ShowMonster key={monster.name} monster={monster} addMonsters={addMonsters} closePopup={closePopup} />
  })


  return (
    <div className="quick-add-display">
      <button className="btn btn-type-3 btn-color-4 close-btn" onClick={closePopup}>Cancel</button>
      <button className="btn btn-type-3 btn-color-1 back-btn-2" onClick={() => setType('none')}>{'< Back'}</button>
      <div className="info-list-group">
        <section className="info-list-wrapper info-list-full">
          <h2 className="info-list-head">Add more:</h2>
          {monsters[0] ? monstersDisplay : <p>No monsters in encounter</p>}
        </section>
      </div>
      
      <div className="info-list-group">
        <section className="info-list-wrapper info-list-full">
          <h2 className="info-list-head">Add new:</h2>
          <form className="horizontal-form" onSubmit={findMonsters}>
            <div className="form-piece">
              <label className="form-piece-filled">
                <input
                  className={"form-input" + (search ? '' : ' empty-input')}
                  value={search}
                  onChange={(evt) => {
                    setSearch(evt.target.value)
                  }}
                />
                <span className="form-label">Name</span>
              </label>
            </div>
            <button className="btn btn-type-3 btn-color-2" type="submit">Search</button>
          </form>
          {found[0] ? foundDisplay : <p>No monsters found</p>}
        </section>
      </div>
    </div>
  )
}

export default QuickMonster