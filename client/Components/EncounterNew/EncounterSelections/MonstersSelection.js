import React from 'react';

function MonstersSelection(props) {
  const {encounterCharacters, setEncounterCharacters, monsters, filters, setFilters} = props

  const filterMonsters = (event) => {
    const value = event.target.value

    setFilters({...filters, name: value})
  }

  const addMonster = (monster) => {
    const {name, index, url} = monster

    if(!encounterCharacters[index]){
      let tempChars = encounterCharacters
      tempChars[index] = {name, url, info: monster, amount: 1}

      setEncounterCharacters({...tempChars})
    } else if(encounterCharacters[index]) {
      let updateCountChar = encounterCharacters[index]

      updateCountChar.amount++

      let tempChars = encounterCharacters

      tempChars[index] = updateCountChar

      setEncounterCharacters({...tempChars})
    }
  }

  const increaseCount = (index, event) => {
    let updatedChar = encounterCharacters[index]

    updatedChar.amount = +event.target.value

    let tempChars = encounterCharacters
    tempChars[index] = updatedChar

    setEncounterCharacters({...tempChars})
  }

  const removeMonster = (index) => {
    let tempChars = encounterCharacters

    delete tempChars[index]

    setEncounterCharacters({...tempChars})
  }

  const monstersDisplay = monsters
  .filter((monster) => {
    return monster.name.toLowerCase().includes(filters.name.toLowerCase())
  })
  .map((monster, i) => {
    const {name, size, hit_points, armor_class, challenge_rating, xp} = monster
    return (
      <div className='new-encounter-monster-card' key={i}>
        <h2>{name}</h2>
        <h3>{size}</h3>
        <p>{hit_points}</p>
        <p>{armor_class}</p>
        <p>{challenge_rating}</p>
        <p>{xp}</p>
        <button onClick={() => addMonster(monster)}>Add</button>
      </div>
    )
  })

  const addedMonsters = () => {
    let monsterDivs = []

    for(let monster in encounterCharacters){
      const {info, amount} = encounterCharacters[monster]

      let monsterDiv = (
        <div className='new-add-monster-card'>
          <h2>{info.name}</h2>
          <p>Challenge: {info.challenge_rating}</p>
          <p>XP: {info.xp}</p>
          <label for='monster-amount'>Amount</label>
          <input
            id='monster-amount'
            type='number'
            min='0'
            value={amount}
            onChange={(event) => {
              event.preventDefault()
              increaseCount(monster, event)
            }}
          />
          <button onClick={() => removeMonster(monster)}>Remove</button>
        </div>
      )

      monsterDivs.push(monsterDiv)
    }
    
    return monsterDivs
  }

  return (
    <section class="new-encounter-selections" id="monsters-selection">
      <form name="search-monsters" id="search-monsters">
        <input placeholder="Search name" id="search-monsters-input" onChange={filterMonsters}/>
      </form>

      <div className="new-displayed-characters">{monstersDisplay}</div>

      <div className='new-added'>
        <h2>Added Monsters</h2>
        <div id='added-monster-display'>{addedMonsters()}</div>

        <div id='encounter-diff-stats'></div>
      </div>
    </section>
  )
}

export default MonstersSelection