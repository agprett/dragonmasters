import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './Encounter.css'
import DeletePopup from '../DeletePopup/DeletePopup.js'

import { addEncounter } from '../../ducks/encounterSlice.js'

function EncounterSummary() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const {encounter_id} = useParams()
  const [encounterInfo, setEncounterInfo] = useState({campaign: {}, players: [], npcs: [], monsters: []})
  const [displayPopup, setDisplayPopup] = useState(false)

  useEffect(() => {
    axios.get(`/api/encounters/${encounter_id}`)
      .then(res => {
        setEncounterInfo(res.data)
      })
  }, [])

  const updateEncounter = () => {
    const {name, short_description, description, encounter_id, location, terrain, rewards, campaign, players, npcs, monsters} = encounterInfo
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

    let info = {id: encounter_id, name, shortDesc: short_description, desc: description, location, terrain, rewards, campaign_id: campaign.campaign_id, campaignName: campaign.name, players, npcs, monsters: updatedMonsters}

    dispatch(addEncounter(info))
    navigate('/stuff/encounters/new')
  }

  const charShorts = encounterInfo.players.map((char, i) => {
    return (
      <div key={i} className='info-list-item encounter-char'>
        <h5>{char.name}</h5>
        <p>{char.player}</p>
        <p>AC: {char.armor_class}</p>
        <p>HP: {char.hit_points}</p>
      </div>
    )
  })

  const npcShorts = encounterInfo.npcs.map((char, i) => {
    return (
      <div key={i} className='info-list-item encounter-char'>
        <h5>{char.name}</h5>
        <p>AC: {char.armor_class}</p>
        <p>HP: {char.hit_points}</p>
      </div>
    )
  })

  const monsterShorts = encounterInfo.monsters.map((element, i) => {
    return (
      <div key={i} className='info-list-item encounter-char'>
        <h5>{element.name}</h5>
        <p>Amount: {element.count}</p>
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

      <section className='breakdown-top'>

        <div className='breakdown-base-info'>
          <h2>{encounterInfo.name}</h2>
          <h5>{encounterInfo.short_description}</h5>
        </div>

        <div className='breakdown-top-buttons'>
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

      <section className='breakdown'>
        <h4 className='breakdown-head'>Details</h4>
        <div className='breakdown-piece large-breakdown-piece'>
          <p className='breakdown-label'>Description:</p>
          <p className='breakdown-text'>
            {encounterInfo.description || 'None'}
          </p>
        </div>
        <div className='breakdown-break'></div>
        <div className='breakdown-piece'>
          <p className='breakdown-label'>Location:</p>
          <p className='breakdown-text'>{encounterInfo.location || 'None'}</p>
        </div>
        <div className='breakdown-piece'>
          <p className='breakdown-label'>Terrain:</p>
          <p className='breakdown-text'>{encounterInfo.terrain || 'None'}</p>
        </div>
        <div className='breakdown-piece'>
          <p className='breakdown-label'>Campaign:</p>
          <p className='breakdown-text'>{encounterInfo.campaign.name || 'None'}</p>
        </div>
        <div className='breakdown-break'></div>
        <div className='breakdown-piece large-breakdown-piece'>
          <p className='breakdown-label'>Rewards:</p>
          <p className='breakdown-text'>{encounterInfo.rewards || 'None'}</p>
        </div>
      </section>

      <section className='info-list-group'>
        <section className='info-list-wrapper'>
          <h4 className='info-list-head'>Players:</h4>
          {encounterInfo.players[0] ? charShorts : <p>No added characters</p>}
        </section>

        {encounterInfo.npcs[0] && <section className='info-list-wrapper'>
          <h4 className='info-list-head'>NPCs:</h4>
          {npcShorts}
        </section>}

        <section className='info-list-wrapper'>
          <h4 className='info-list-head'>Monsters:</h4>
          {encounterInfo.monsters[0] ? monsterShorts : <p>No added monsters</p>}
        </section>
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
