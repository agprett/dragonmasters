import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

import { addEncounter } from '../../ducks/reducer'

import './EncounterSummary.css'

function EncounterSummary(props) {
  const navigate = useNavigate()
  const {encounter_id} = useParams()
  const [encounterInfo, setEncounterInfo] = useState({players: [], monsters: []})

  useEffect(() => {
    axios.get(`/api/encounters/${encounter_id}`)
      .then(res => {
        setEncounterInfo(res.data)
        console.log(res.data)
      })
  }, [])

  const updateEncounter = () => {
    alert('This functionality is currenlty out of order')
    // let updatedMonsters = {}

    // encounterInfo.monsters.forEach(monster => {
    //   let obj = {
    //     name: monster.name,
    //     info: monster.info,
    //     amount: monster.count,
    //     url: monster.url
    //   }

    //   updatedMonsters[monster.info.index] = obj
    // })

    // let info = {...encounterInfo, monsters: updatedMonsters}

    // props.addEncounter(info)
    // navigate('/stuff/encounters/new')
  }

  const charShorts = encounterInfo.players.map((char, i) => {
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

  const monsterShorts = encounterInfo.monsters.map((element, i) => {
    return (
      <div key={i} className='encounter-monster-short'>
        <div className='monster-base-info'>
          <h2>{element.name}</h2>
          <p>Alignment: {element.info.alignment}</p>
          <p>Challenge: {element.info.challenge_rating} ({element.xp} XP)</p>
        </div>
        <h3>Amount: {element.count}</h3>
      </div>
    )
  })

  return (
    <section className='encounter-summary'>

      <section className='summary-top'>
        <Link
          className='encounter-run-link'
          to={`/stuff/encounters`}
        >{'<'} Back to Encounters</Link>

        <div className='encounter-base-info'>
          <h3>{encounterInfo.name}</h3>
          <p>{encounterInfo.short_description}</p>
        </div>

        <div className='summary-top-buttons'>
          <Link
            className='encounter-run-link'
            to={`/stuff/encounters/${encounter_id}/run`}
          >Run</Link>
          <button
            className='encounter-run-link'
            onClick={() => updateEncounter()}
          >Edit</button>
        </div>
      </section>

      <section className='summary-added'>
        <section className='encounter-added'>
          <h3>Players:</h3>
          {encounterInfo.players[0] ? charShorts : <p>No added characters</p>}
        </section>

        <section className='encounter-added'>
          <h2>Monsters:</h2>
          {encounterInfo.monsters[0] ? monsterShorts : <p>No added monsters</p>}
        </section>
      </section>
    </section>
  )
}

const mapStateToProps = state => state

const functions = {addEncounter}

export default connect(mapStateToProps, functions)(EncounterSummary)