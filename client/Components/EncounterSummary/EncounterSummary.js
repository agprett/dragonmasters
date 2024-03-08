import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import DeletePopup from '../DeletePopup/DeletePopup.js'

import { addEncounter } from '../../ducks/encounterSlice.js'

function EncounterSummary() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const {encounter_id} = useParams()
  const [encounterInfo, setEncounterInfo] = useState({campaign: {}, players: [], monsters: []})
  const [displayPopup, setDisplayPopup] = useState(false)

  useEffect(() => {
    axios.get(`/api/encounters/${encounter_id}`)
      .then(res => {
        setEncounterInfo(res.data)
      })
  }, [])

  const updateEncounter = () => {
    const {name, short_description, description, encounter_id, location, terrain, rewards, campaign, players, monsters} = encounterInfo
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

    let info = {id: encounter_id, name, shortDesc: short_description, desc: description, location, terrain, rewards, campaign_id: campaign.campaign_id, campaignName: campaign.name, players, monsters: updatedMonsters}

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
      {displayPopup && <DeletePopup name={encounterInfo.name} url={`/api/encounters/${encounter_id}`} route={'/stuff/encounters'} setDisplay={setDisplayPopup} />}

      <Link
        className='btn btn-type-1 btn-color-1 back-btn'
        to={location.state ? location.state.last : '/stuff/encounters'}
      >{'<'} Back</Link>

      <section className='summary-top'>

        <div className='summary-base-info'>
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
        <p>Campaign: {encounterInfo.campaign.name || 'None'}</p>
        <p className='large-breakdown-piece'>Rewards: {encounterInfo.rewards || 'None'}</p>
      </section>

      <button className='btn btn-type-1 btn-color-4' onClick={() => setDisplayPopup(true)} >Delete</button>
    </section>
  )
}

export default EncounterSummary


{/* <>
  {monster.name ? (
    <div className='monster-tracker-display'>
      <h2 className='monster-tp-name'>{monster.name}</h2>
      <button
        className='info-button'
        onClick={() => {
          displayPopup(monster.info)
        }}
      >i</button>
      
      {trackerBuilder(monster.count)}
    </div>
  ) : (
    <p>x</p>
  )}
</> */}
