import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { addEncounter } from '../../ducks/encounterSlice.js'

import './EncounterSummary.css'

function EncounterSummary() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {encounter_id} = useParams()
  const [encounterInfo, setEncounterInfo] = useState({players: [], monsters: []})

  useEffect(() => {
    axios.get(`/api/encounters/${encounter_id}`)
      .then(res => {
        setEncounterInfo(res.data)
      })
  }, [])

  const updateEncounter = () => {
    const {name, short_description, description, encounter_id, location, terrain, rewards, players, monsters} = encounterInfo
    let updatedMonsters = {}

    monsters.forEach(monster => {
      let obj = {
        name: monster.name,
        info: monster,
        amount: +monster.count,
        url: monster.url
      }

      updatedMonsters[monster.index] = {...obj}
    })

    console.log(updatedMonsters)

    let info = {id: encounter_id, name, shortDesc: short_description, desc: description, location, terrain, rewards, players, monsters: updatedMonsters}

    dispatch(addEncounter(info))
    navigate('/stuff/encounters/new')
  }

  const charShorts = encounterInfo.players.map((char, i) => {
    return (
      <div key={i} className='encounter-monster-short'>
        <h2>{char.name}</h2>
        <h3>{char.player}</h3>
        <p>AC: {char.armor_class}</p>
        <p>HP: {char.hit_points}</p>
      </div>
    )
  })

  const monsterShorts = encounterInfo.monsters.map((element, i) => {
    return (
      <div key={i} className='encounter-monster-short'>
        <h2>{element.name}</h2>
        <h3>Amount: {element.count}</h3>
      </div>
    )
  })

  return (
    <section className='page-layout-2'>
      <Link
        className='btn btn-type-1 btn-color-1 back-btn'
        to={`/stuff/encounters`}
      >{'<'} Back</Link>

      <section className='summary-top'>

        <div className='encounter-base-info'>
          <h2 className='title-1'>{encounterInfo.name}</h2>
          <h2>{encounterInfo.short_description}</h2>
        </div>

        <div className='summary-top-buttons'>
          <Link
            className='btn btn-type-1 btn-color-3'
            to={`/stuff/encounters/${encounter_id}/run`}
          >Run</Link>
          <button
            className='btn btn-type-1 btn-color-1'
            onClick={() => updateEncounter()}
          >Edit</button>
        </div>
      </section>

      <section className='summary-added'>
        <section className='encounter-added'>
          <h2 className='dashboard-head'>Players:</h2>
          {encounterInfo.players[0] ? charShorts : <p>No added characters</p>}
        </section>

        <section className='encounter-added'>
          <h2 className='dashboard-head'>Monsters:</h2>
          {encounterInfo.monsters[0] ? monsterShorts : <p>No added monsters</p>}
        </section>
      </section>

      <section className='breakdown'>
        <h2 className='dashboard-head'>Other Information</h2>
        <p className='large-breakdown-piece'>Description: {encounterInfo.description || 'None'}</p>
        <p>Terrain: {encounterInfo.terrain || 'None'}</p>
        <p>Location: {encounterInfo.location || 'None'}</p>
        <p className='large-breakdown-piece'>Rewards: {encounterInfo.rewards || 'None'}</p>
      </section>
    </section>
  )
}

export default EncounterSummary