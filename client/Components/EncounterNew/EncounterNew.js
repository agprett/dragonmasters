import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { clearEncounter } from '../../ducks/encounterSlice';

import InfoSelection from './EncounterSelections/InfoSelection';
import MonstersSelection from './EncounterSelections/MonstersSelection';
import PlayersSelection from './EncounterSelections/PlayerSelection';
import NewEncounterSummary from './EncounterSelections/NewEncounterSummary';

const setEditEnc = (info) => {
  const data = {...info}
  delete data.players
  delete data.monsters

  return data
}

function NewEncounter() {
  let navigate = useNavigate()
  const dispatch = useDispatch()

  const editEnc = useSelector(state => state.encounter.info)

  const xpThresholds = {1: [25, 50, 75, 100], 2: [50, 100, 150, 200], 3: [75, 150, 225, 400]}

  const [panels, setPanels] = useState({one: true, two: false, three: false})
  const [encounterInfo, setEncounterInfo] = useState(editEnc.name ? setEditEnc(editEnc) : {name: '', shortDesc: '', desc: '', location: '', terrain: '', rewards: '', campaign_id: ''})
  const [encounterPlayers, setEncounterPlayers] = useState(editEnc.players ? editEnc.players : [])
  const [encounterMonsters, setEncounterMonsters] = useState(editEnc.monsters ? editEnc.monsters : {})
  const [selectedCampaign, setSelectedCampaign] = useState(editEnc.campaignName ? editEnc.campaignName : '')
  const [players, setPlayers] = useState([])
  const [monsters, setMonsters] = useState([])
  const [campaigns, setCampaigns] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('/api/characters')
      .then(res => {
        setPlayers(res.data)
      })

    axios.get('/api/monsters')
      .then(res => {
        setMonsters(res.data)
      })

    axios.get('/api/campaigns')
      .then(res => {
        setCampaigns(res.data)
        console.log(res.data)
      })
  }, [])

  const postNewEncounter = () => {
    if(encounterInfo.name && encounterInfo.shortDesc && encounterPlayers[0] && Object.keys(encounterMonsters).length) {
      let structuredMonsters = []

      for(mon in encounterMonsters) {
        const {name, amount, url, info} = encounterMonsters[mon]
        structuredMonsters.push({name, count: amount, url, pointer: info.pointer})
      }

      const body = {
        ...encounterInfo,
        characters: encounterPlayers,
        monsters: structuredMonsters
      }

      console.log(body)

      if(body.id) {
        axios.put('/api/encounters', body)
          .then(res => {
            console.log(res.data)
            alert('Encounter updated!')
            navigate(`/stuff/encounters/${res.data.id}`)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        axios.post('/api/encounters', body)
          .then(res => {
            console.log(res.data)
            alert('Encounter created!')
            navigate(`/stuff/encounters/${res.data.id}`)
          })
          .catch(err => {
            console.log(err)
          })
      }
    } else {
      alert("Please fill in all required data and confirm it's correct before creating an encounter!")
    }
  }

  const changeDisplay = (panel) => {
    setPanels({...panels, [panel]: !panels[panel]})
  }

  return (
    <div className='page-layout-2'>
      <Link
        className='btn btn-type-1 btn-color-4 back-btn'
        to={'/stuff/encounters'}
      >Cancel</Link>

      <section className='breakdown-top'>
        <div className='breakdown-base-info'><h2 className='title-1'>New Encounter</h2></div>
      </section>

      <button
        className='btn btn-type-1 btn-color-3 create-btn'
        onClick={postNewEncounter}
      >Create</button>

      <section className='accordion'>
        <div className='accordion-item'>
          <div
            className='accordion-item-header'
            onClick={() => changeDisplay('one')}
          >Basic Info <button className='accordion-item-status'>{panels.one ? '-' : '+'}</button></div>
          <div className={`accordion-content ${panels.one ? 'accordion-content-expanded' : ''}`}>
            <InfoSelection encounterInfo={encounterInfo} setEncounterInfo={setEncounterInfo} campaigns={campaigns} setSelectedCampaign={setSelectedCampaign} />
          </div>
        </div>

        <div className='accordion-item'>
          <div
            className='accordion-item-header'
            onClick={() => changeDisplay('two')}
          >Players <button className='accordion-item-status'>{panels.two ? '-' : '+'}</button></div>
          <div className={`accordion-content ${panels.two ? 'accordion-content-expanded' : ''}`}>  
            <PlayersSelection encounterPlayers={encounterPlayers} setEncounterPlayers={setEncounterPlayers} players={players} setPlayers={setPlayers} />
          </div>
        </div>

        <div className='accordion-item'>
          <div
            className='accordion-item-header'
            onClick={() => changeDisplay('three')}
          >Monsters <button className='accordion-item-status'>{panels.three ? '-' : '+'}</button></div>
          <div className={`accordion-content ${panels.three ? 'accordion-content-expanded' : ''}`}>
            <MonstersSelection encounterMonsters={encounterMonsters} setEncounterMonsters={setEncounterMonsters} monsters={monsters} filter={filter} setFilter={setFilter} />
          </div>
        </div>
      </section>
    </div>
  )
};

export default NewEncounter