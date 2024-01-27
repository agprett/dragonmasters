import { useState } from "react"
import axios from 'axios'

import ShowMonster from "./ShowMonsters"

function QuickMonster({monsters, closePopup, addCombatant}) {
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
    let count = info.count || 0

    for(let i = 0; i < total; i++) {
      let data = {
        ...info,
        name: info.name + ' - ' + (count + i + 1),
        i,
        type: 'monster'
      }
      addCombatant(data, 'monster', info.count === 1 && i === 0 ? info.i : false)
    }
  }

  let monstersDisplay = monsters.map(monster => {
    return <ShowMonster key={monster.name} monster={monster} addMonsters={addMonsters} closePopup={closePopup} />
  })

  let foundDisplay = found.map(monster => {
    return <ShowMonster key={monster.name} monster={monster} addMonsters={addMonsters} closePopup={closePopup} />
  })


  return (
    <div>
      <button className="btn btn-type-3 btn-color-4 close-btn" onClick={closePopup}>Cancel</button>
      {monstersDisplay}
      <form className="vertical form" onSubmit={findMonsters}>
        <input value={search} onChange={e => setSearch(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {found && foundDisplay}
    </div>
  )
}

export default QuickMonster