import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import InfoSelection from './EncounterSelections/InfoSelection';
import CharacterSelection from './EncounterSelections/CharacterSelection';
import NewEncounterSummary from './EncounterSelections/NewEncounterSummary';

import './EncounterNew.css';

function NewEncounter(props) {
  let navigate = useNavigate()

  const possibleDisplays = ['Info', 'Players', 'Monsters', 'Summary']
  const xpThresholds = {1: [25, 50, 75, 100], 2: [50, 100, 150, 200], 3: [75, 150, 225, 400]}

  const [display, setDisplay] = useState(0)
  const [encounterInfo, setEncounterInfo] = useState({name: '', shortDesc: '', desc: '', location: '', terrain: '', rewards: ''})
  const [encounterStats, setEncounterStats] = useState({difficulty: 'Unset', totalXP: 0, adjustedXP: 0})
  // const [campaigns, setCampaigns] = useState([])
  const [encounterPlayers, setEncounterPlayers] = useState([])
  const [encounterMonsters, setEncounterMonsters] = useState({})
  const [confirmed, setConfirmed] = useState(false)
  const [players, setPlayers] = useState([])
  const [monsters, setMonsters] = useState([])

  useEffect(() => {
    const {name, short_description: shortDesc, description: desc, monsters: preMonsters, players: prePlayers} = props.encounterData

    console.log('Reset new encounter')

    setEncounterInfo({...encounterInfo, name, shortDesc, desc})
    setEncounterMonsters({...preMonsters})
    setEncounterPlayers([...prePlayers])
    
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
    const {name, shortDesc, desc} = encounterInfo

    const body = {
      name,
      shortDesc,
      desc,
      characters: encounterPlayers,
      monsters: encounterMonsters
    }

    console.log(body)
    axios.post('/api/encounters', body)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const displayChange = (direction) => {
    if(direction === 'forward') {
      if(display < 3){
        setDisplay(display + 1)
      } else {
        postNewEncounter()
        // confirmed ? postNewEncounter : (event) => event.preventDefault()
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
    <section id='new-encounter'>
      <div id='new-encounter-nav'>
        <div id="selection-progress-div">
          <div className='progress-bar'></div>
          <div 
            className={`progress-bar ${display === 0 ? 'empty' : display === 1 ? 'third' : display === 2 ? 'two-third' : 'complete'}`}
            id='progress-bar'
          ></div>
          <div className='checkpoint' onClick={() => setDisplay(0)}>
            <div className={encounterInfo.name && encounterInfo.shortDesc ? 'circle active' : 'circle'}>✓</div>
            <p>Info</p>
          </div>
          <div className='checkpoint' onClick={() => setDisplay(1)}>
            <div className={encounterPlayers[0] || encounterPlayers === 'skipped' ? 'circle active' : 'circle'}>✓</div>
            <p>Players</p>
          </div>
          <div className='checkpoint' onClick={() => setDisplay(2)}>
            <div className={Object.keys(encounterMonsters).length ? 'circle active' : 'circle'}>✓</div>
            <p>Monsters</p>
          </div>
          <div className='checkpoint' onClick={() => setDisplay(3)}>
            <div className={confirmed ? 'circle active' : 'circle'}>✓</div>
            <p>Summary</p>
          </div>
        </div>
        <div className='new-encounter-manuever-btns'>
          <button
            className='ne-buttons'
            onClick={() => displayChange('back')}
            >{display > 0 ? 'Back' : 'Cancel'}</button>
          <button
            className='ne-buttons'
            onClick={() => displayChange('forward')}
          >{display < 3 ? 'Next' : 'Finish'}</button>
        </div>
      </div>

      {/* <section id="selection-display"> */}
        {display === 0 ? (
            InfoSelection({encounterInfo, setEncounterInfo})
          ) : display === 1 ? (
            CharacterSelection({display, encounterCharacters: encounterPlayers, setEncounterCharacters: setEncounterPlayers, players})
          ) : display === 2 ? (
            CharacterSelection({display, encounterCharacters: encounterMonsters, setEncounterCharacters: setEncounterMonsters, monsters})
          ): NewEncounterSummary({display, confirmed, setConfirmed, encounterInfo, encounterPlayers, encounterMonsters})
        }
      {/* </section> */}

    </section>
  )
};

const mapStateToProps = state => state

export default connect(mapStateToProps, {})(NewEncounter)