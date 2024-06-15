import React from 'react';

function NewEncounterSummary({confirmed, setConfirmed, encounterInfo, encounterPlayers, encounterMonsters, selectedCampaign}) {
  const {name, shortDesc, desc, location, terrain, rewards} = encounterInfo

  const charShorts = encounterPlayers.map((char, i) => {
    return (
      <div key={i} className='info-list-item'>
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
        <div key={monster.info.index} className='info-list-item'>
          <h2>{monster.name}</h2>
          <h3>Amount: {monster.amount}</h3>
        </div>
      )
    }

    return arr
  }
  

  return (
    <section className="ne-summary">
      <button
        className={'btn btn-type-2 ' + (confirmed ? 'btn-color-4' : 'btn-color-3')}
        onClick={() => setConfirmed(!confirmed)}
      >{confirmed ? 'Cancel Confirm' : 'Confirm'}</button>

      <section className='breakdown'>
        <h2 className='dashboard-head'>Base Info</h2>
        <p>Name: {name || 'None'}</p>
        <p>Short Description: {shortDesc || 'None'}</p>
        <p className='large-breakdown-piece'>Description: {desc || 'None'}</p>
        <p>Terrain: {terrain || 'None'}</p>
        <p>Location: {location || 'None'}</p>
        <p>Campaign: {selectedCampaign || 'None'}</p>
        <p className='large-breakdown-piece'>Rewards: {rewards || 'None'}</p>
      </section>

      <section className='info-list-group'>
        <section className='info-list-wrapper'>
          <h2 className='info-list-head'>Players:</h2>
          {encounterPlayers[0] ? charShorts : <p>No added characters</p>}
        </section>

        <section className='info-list-wrapper'>
          <h2 className='info-list-head'>Monsters:</h2>
          {Object.keys(encounterMonsters).length ? monsterShorts() : <p>No added monsters</p>}
        </section>
        
      </section>      
    </section>
  )
}

export default NewEncounterSummary