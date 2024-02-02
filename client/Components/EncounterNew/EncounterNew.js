import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import InfoSelection from './EncounterSelections/InfoSelection';
import MonstersSelection from './EncounterSelections/MonstersSelection';
import PlayersSelection from './EncounterSelections/PlayerSelection';
import NewEncounterSummary from './EncounterSelections/NewEncounterSummary';

import './EncounterNew.css';

function NewEncounter() {
  let navigate = useNavigate()

  const xpThresholds = {1: [25, 50, 75, 100], 2: [50, 100, 150, 200], 3: [75, 150, 225, 400]}

  const [display, setDisplay] = useState(0)
  const [encounterInfo, setEncounterInfo] = useState({name: '', shortDesc: '', desc: '', location: '', terrain: '', rewards: ''})
  // const [campaigns, setCampaigns] = useState([])
  const [encounterPlayers, setEncounterPlayers] = useState([])
  const [encounterMonsters, setEncounterMonsters] = useState({})
  const [confirmed, setConfirmed] = useState(false)
  const [players, setPlayers] = useState([])
  const [monsters, setMonsters] = useState([])
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

    // axios.get('/api/campaign')
    //   .then(res => {
    //     setCampaigns(res.data)
    //   })
  }, [])

  const postNewEncounter = () => {
    if(encounterInfo.name && encounterInfo.shortDesc && encounterPlayers[0] && Object.keys(encounterMonsters).length && confirmed) {
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

      axios.post('/api/encounters', body)
        .then(res => {
          console.log(res.data)
          alert('Encounter created!')
          navigate('/stuff/encounters')
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      alert("Please fill in all required data and confirm it's correct before creating an encounter!")
    }
  }

  const displayChange = (direction) => {
    if(direction === 'forward') {
      if(display < 3){
        setDisplay(display + 1)
      } else {
        postNewEncounter()
      }
    } else if(direction === 'back') {
      if(display > 0) {
        setDisplay(display - 1)
      } else {
        navigate('/stuff/encounters')
      }
    }
  }

  return (
    <div className='page-layout-2'>
      <div id='new-encounter-nav'>
        <div id="selection-progress-div">
          <div className='progress-bar'></div>
          <div 
            className={`progress-bar ${display === 0 ? 'empty' : display === 1 ? 'third' : display === 2 ? 'two-third' : 'end'}`}
            id='progress-bar'
          ></div>
          <div className='checkpoint' onClick={() => setDisplay(0)}>
            <div id={display === 0 ? 'current' : null} className={encounterInfo.name && encounterInfo.shortDesc ? 'circle complete' : 'circle'}>✓</div>
            <p>Info</p>
          </div>
          <div className='checkpoint' onClick={() => setDisplay(1)}>
            <div id={display === 1 ? 'current' : null} className={encounterPlayers[0] || encounterPlayers === 'skipped' ? 'circle complete' : 'circle'}>✓</div>
            <p>Players</p>
          </div>
          <div className='checkpoint' onClick={() => setDisplay(2)}>
            <div id={display === 2 ? 'current' : null} className={Object.keys(encounterMonsters).length ? 'circle complete' : 'circle'}>✓</div>
            <p>Monsters</p>
          </div>
          <div className='checkpoint' onClick={() => setDisplay(3)}>
            <div id={display === 3 ? 'current' : null} className={confirmed ? 'circle complete' : 'circle'}>✓</div>
            <p>Summary</p>
          </div>
        </div>
        <div className='new-encounter-manuever-btns'>
          <button
            className='btn btn-type-2 btn-color-2'
            onClick={() => displayChange('back')}
            >{display > 0 ? 'Back' : 'Cancel'}</button>
          <button
            className='btn btn-type-2 btn-color-2'
            onClick={() => displayChange('forward')}
          >{display < 3 ? 'Next' : 'Finish'}</button>
        </div>
      </div>

      {display === 0 && <InfoSelection encounterInfo={encounterInfo} setEncounterInfo={setEncounterInfo} />}
      {display === 1 && <PlayersSelection encounterPlayers={encounterPlayers} setEncounterPlayers={setEncounterPlayers} players={players} />}
      {display === 2 && <MonstersSelection encounterMonsters={encounterMonsters} setEncounterMonsters={setEncounterMonsters} monsters={monsters} filter={filter} setFilter={setFilter} />} 
      {display === 3 && <NewEncounterSummary display={display} confirmed={confirmed} setConfirmed={setConfirmed} encounterInfo={encounterInfo} encounterPlayers={encounterPlayers} encounterMonsters={encounterMonsters} />}

    </div>
  )
};

export default NewEncounter