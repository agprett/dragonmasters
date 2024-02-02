import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

function NewEncounterSummary(props) {
  const {confirmed, setConfirmed, encounterPlayers, encounterMonsters} = props
  const {name, shortDesc, desc, location, terrain, campaign, rewards} = props.encounterInfo

  useEffect(() => {
    console.log('summary ran')
  }, [])

  const charShorts = encounterPlayers.map((char, i) => {
    return (
      <div key={i} className='encounter-monster-short'>
        <div className='monster-base-info'>
          <h2>{char.name}</h2>
          <h3>{char.player}</h3>
          <p>Level: {char.level}</p>
          <p>HP: {char.hit_points}</p>
        </div>
      </div>
    )
  })

  const monsterShorts = () => {
    let arr = []

    for(let key in encounterMonsters) {
      let monster = encounterMonsters[key]

      arr.push(
        <div key={monster.info.index} className='encounter-monster-short'>
          <div className='monster-base-info'>
            <h2>{monster.name}</h2>
            <p>Alignment: {monster.info.alignment}</p>
            <p>Challenge: {monster.info.challenge_rating} ({monster.xp} XP)</p>
          </div>
          <h3>Amount: {monster.amount}</h3>
        </div>
      )
    }

    return arr
  }
  

  return (
    <section className="encounter-selection" id="encounter-summary">
      <h2 className='new-encounter-title'>{name} Summary</h2>

      <section className='summary-top'>
        <div className='encounter-base-info'>
          <p>{shortDesc}</p>
        </div>
      </section>

      <section className='summary-added'>
        <section className='encounter-added'>
          <h3>Players:</h3>
          {encounterPlayers[0] ? charShorts : <p>No added characters</p>}
        </section>

        <section className='encounter-added'>
          <h2>Monsters:</h2>
          {Object.keys(encounterMonsters).length ? monsterShorts() : <p>No added monsters</p>}
        </section>
        
      </section>

      <button
        onClick={() => setConfirmed(!confirmed)}
      >{confirmed ? 'Cancel Confirm' : 'Confirm Info'}</button>
      
    </section>
  )
}

export default NewEncounterSummary