import React from 'react';

function MonstersSelection({encounterMonsters, setEncounterMonsters, monsters, filter, setFilter}) {
  const addMonster = (monster) => {
    const {name, index, url} = monster
    
    console.log('hit')
    
    if(!encounterMonsters[index]){
      let tempChars = {...encounterMonsters}
      tempChars[index] = {name, url, info: monster, amount: 1}
      
      setEncounterMonsters({...tempChars})
    } else if(encounterMonsters[index]) {
      let updateCountChar = {...encounterMonsters[index]}
      
      updateCountChar.amount++

      let tempChars = encounterMonsters

      tempChars[index] = updateCountChar

      setEncounterMonsters({...tempChars})
    }
  }

  const increaseCount = (index, event) => {
    let updatedChar = {...encounterMonsters[index]}

    let newNum = event.target.value.split('')
    
    if(newNum[0] === 0 && newNum.length !== 1){
      newNum.shift()
    }

    let amount = newNum.join('')

    if(amount === '') {
      updatedChar.amount = 0
    } else {
      updatedChar.amount = +amount
    }

    let tempChars = {...encounterMonsters}
    tempChars[index] = updatedChar

    setEncounterMonsters({...tempChars})
  }

  const removeMonster = (index) => {
    let tempChars = {...encounterMonsters}

    delete tempChars[index]

    setEncounterMonsters({...tempChars})
  }

  const monstersDisplay = monsters
  .filter((monster) => {
    return monster.name.toLowerCase().includes(filter.toLowerCase())
  })
  .map((monster, i) => {
    const {name, size, hit_points, armor_class, challenge_rating, xp} = monster
    return (
      <tr className='ne-character-row' key={monster.name + '-' + i}>
        <td><h3>{name}</h3></td>
        <td>{size}</td>
        <td>{hit_points}</td>
        <td>{armor_class}</td>
        <td>{challenge_rating}/{xp}</td>
        <td><button className='btn btn-type-3 btn-color-2' onClick={() => addMonster(monster)}>Add</button></td>
      </tr>
    )
  })

  const addedMonsters = () => {
    let monsterDivs = []

    for(let monster in encounterMonsters){
      const {info, amount} = encounterMonsters[monster]

      let monsterDiv = (
        <tr className='new-added-row' key={info.name}>
          <td><h3>{info.name}</h3></td>
          <td>
            <input
              className='base-input small-input'
              type='number'
              value={amount}
              onChange={(event) => {
                event.preventDefault()
                increaseCount(monster, event)
              }}
            />
          </td>
          <td><button className='btn btn-type-3 btn-color-4' onClick={() => removeMonster(monster)}>Remove</button></td>
        </tr>
      )

      monsterDivs.push(monsterDiv)
    }
    
    return monsterDivs
  }

  return (
    <section className="new-encounter-selections">
      <div className='ne-monster-display'>
        <form id="search-monsters" className='horizontal-form'>
          <h3>Search: </h3>
          <div className='form-piece'>
            <label className='form-piece-filled'>
              <input
                className={'form-input' + (filter ? '' : ' empty-input')}
                value={filter}
                onChange={e => setFilter(e.target.value)}
              />
              <span className='form-label'>Name</span>
            </label>
          </div>
        </form>

        <table className="ne-monster-table">
          <thead>
            <tr className='ne-character-row'  id='ne-character-head'>
              <th><h3>Name</h3></th>
              <th>Size</th>
              <th>HP</th>
              <th>AC</th>
              <th>CR/XP</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{monstersDisplay}</tbody>
        </table>
      </div>

      <table className='new-added'>
        <thead>
          <tr className='new-added-head new-added-row'>
            <th><h2>Added Monsters</h2></th>
          </tr>
        </thead>
        <tbody id='added-monster-display'>{Object.keys(encounterMonsters).length ? addedMonsters(): <tr className='none-added-row'><td>No Monsters Currently Added</td></tr>}</tbody>
      </table>
    </section>
  )
}

export default MonstersSelection