import React from 'react';

function NewEncounterSummary(props) {
  const {confirmed, setConfirmed, encounterPlayers, encounterMonsters} = props
  const {name, shortDesc, desc, location, terrain, campaign, rewards} = props.encounterInfo

  const charShorts = encounterPlayers.map((char, i) => {
    return (
      <div key={i} className='encounter-monster-short'>
        <h2>{char.name}</h2>
        <h3>{char.player}</h3>
        <p>HP: {char.hit_points}</p>
      </div>
    )
  })

  const monsterShorts = () => {
    let arr = []

    for(let key in encounterMonsters) {
      let monster = encounterMonsters[key]

      arr.push(
        <div key={monster.info.index} className='encounter-monster-short'>
          <h2>{monster.name}</h2>
          <h3>Amount: {monster.amount}</h3>
        </div>
      )
    }

    return arr
  }
  

  return (
<<<<<<< HEAD
    <section className="encounter-selection" id="encounter-summary">
      <h2 className='new-encounter-title'>{name} Summary</h2>
=======
    <section className="ne-summary">
      <button
        className={'btn btn-type-2 ' + (confirmed ? 'btn-color-4' : 'btn-color-3')}
        onClick={() => setConfirmed(!confirmed)}
      >{confirmed ? 'Cancel Confirm' : 'Confirm'}</button>
>>>>>>> dev

      <section className='new-sections'>
        <h2 className='dashboard-head'>Base Info</h2>
        <p>Name: {name || 'None'}</p>
        <p>Short Description: {shortDesc || 'None'}</p>
        <p>Description: {desc || 'None'}</p>
      </section>

      <section className='summary-added'>
        <section className='encounter-added'>
          <h2 className='dashboard-head'>Players:</h2>
          {encounterPlayers[0] ? charShorts : <p>No added characters</p>}
        </section>

        <section className='encounter-added'>
          <h2 className='dashboard-head'>Monsters:</h2>
          {Object.keys(encounterMonsters).length ? monsterShorts() : <p>No added monsters</p>}
        </section>
        
      </section>      
    </section>
  )
}

export default NewEncounterSummary