import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import './CreationForms.css'

import EncounterForm from './CreationSelections/EncounterForm';
import MonstersSelection from './CreationSelections/MonstersSelection';
import PlayersSelection from './CreationSelections/PlayerSelection';
import { clearEncounter } from '../../ducks/encounterSlice';

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
  const [addedPlayers, setAddedPlayers] = useState(editEnc.players ? editEnc.players : [])
  const [addedMonsters, setAddedMonsters] = useState(editEnc.monsters ? editEnc.monsters : {})
  const [selectedCampaign, setSelectedCampaign] = useState(editEnc.campaignName ? editEnc.campaignName : '')
  const [myPlayers, setMyPlayers] = useState([])
  const [monsters, setMonsters] = useState([])
  const [campaigns, setCampaigns] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('/api/characters')
      .then(res => {
        setMyPlayers(res.data)
      })

    axios.get('/api/monsters')
      .then(res => {
        setMonsters(res.data)
      })

    axios.get('/api/campaigns')
      .then(res => {
        setCampaigns(res.data)
      })
  }, [])

  const postNewEncounter = () => {
    if(encounterInfo.name && encounterInfo.shortDesc && addedPlayers[0] && Object.keys(addedMonsters).length) {
      let structuredMonsters = []

      for(mon in addedMonsters) {
        const {name, amount, url, info} = addedMonsters[mon]
        structuredMonsters.push({name, count: amount, url, pointer: info.pointer})
      }

      const body = {
        ...encounterInfo,
        characters: addedPlayers,
        monsters: structuredMonsters
      }

      if(body.id) {
        axios.put('/api/encounters', body)
          .then(res => {
            alert('Encounter updated!')
            navigate(`/stuff/encounters/${res.data.id}`)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        axios.post('/api/encounters', body)
          .then(res => {
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
      <button
        className='btn btn-type-1 btn-color-4 back-btn'
        onClick={() => {
          dispatch(clearEncounter())
          navigate('/stuff/encounters')
        }}
      >Cancel</button>

      <section className='breakdown-top'>
        <div className='breakdown-base-info'><h2 className='title-1'>{editEnc.name ? 'Update' : 'New'} Encounter</h2></div>
      </section>

      <button
        className='btn btn-type-1 btn-color-3 create-btn'
        onClick={postNewEncounter}
      >{editEnc.name ? 'Save' : 'Create'}</button>

      <section className='accordion'>
        <div className='accordion-item'>
          <div
            className='accordion-item-header'
            onClick={() => changeDisplay('one')}
          >Basic Info <button className='accordion-item-status'>{panels.one ? '-' : '+'}</button></div>
          <div className={`accordion-content-wrapper ${panels.one ? 'accordion-content-expanded' : ''}`}>
            <EncounterForm encounterInfo={encounterInfo} setEncounterInfo={setEncounterInfo} campaigns={campaigns} setSelectedCampaign={setSelectedCampaign} />
          </div>
        </div>

        <div className='accordion-item'>
          <div
            className='accordion-item-header'
            onClick={() => changeDisplay('two')}
          >Players <button className='accordion-item-status'>{panels.two ? '-' : '+'}</button></div>
          <div className={`accordion-content-wrapper ${panels.two ? 'accordion-content-expanded' : ''}`}>  
            <PlayersSelection addedPlayers={addedPlayers} setAddedPlayers={setAddedPlayers} myPlayers={myPlayers} setMyPlayers={setMyPlayers} />
          </div>
        </div>

        <div className='accordion-item'>
          <div
            className='accordion-item-header'
            onClick={() => changeDisplay('three')}
          >Monsters <button className='accordion-item-status'>{panels.three ? '-' : '+'}</button></div>
          <div className={`accordion-content-wrapper ${panels.three ? 'accordion-content-expanded' : ''}`}>
            <MonstersSelection addedMonsters={addedMonsters} setAddedMonsters={setAddedMonsters} monsters={monsters} filter={filter} setFilter={setFilter} />
          </div>
        </div>
      </section>
    </div>
  )
};

export default NewEncounter