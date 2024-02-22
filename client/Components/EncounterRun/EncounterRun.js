import React, {useEffect, useState} from "react";
import axios from 'axios'
import { useParams, Link } from "react-router-dom";

import TrackersDisplay from "../Trackers/TrackersDisplay.js";
import CharacterTracker from "../Trackers/CharacterTracker.js";
import './EncounterRun.css'

import MonsterPopup from "../Guides/MonsterPopup.js";

function EncounterRun() {
  const {encounter_id} = useParams()
  const [encounterInfo, setEncounterInfo] = useState({})
  const [viewPopup, setViewPopup] = useState(false)
  const [popupInfo, setPopupInfo] = useState({})

  useEffect(() => {
    axios.get(`/api/encounters/${encounter_id}`)
      .then(res => {
        setEncounterInfo(res.data)
      })
  }, [])

  const displayPopup = (monster) => {
    setViewPopup(true)
    setPopupInfo(monster)
  }

  const characterTrackers = (characters) => {
    const characterTrackers = characters.map(character => {

      return (
        <CharacterTracker character={character} />
      )
    })

    return characterTrackers
  }

  const monsterTrackers = (monsters) => monsters.map(monster => {
    return (
      <TrackersDisplay monster={monster} type='monster' displayPopup={displayPopup}/>
    )
  });

  return (
    <div id="encounter-view">
      <Link
        className="encounter-run-link"
        id="back-to-info"
        to={`/stuff/encounters/${encounter_id}`}
      >{'<'} Back to Summary</Link>
      <div id='viewed-encounter-name-stuff'>
        <h2 id="encounter-name">{encounterInfo.name}</h2>
        {/* <button>Set Initiative</button>
        <button>Next Turn</button> */}
      </div>
      <div id="encounter-characters">
        <h2 className="character-view-title">Characters:</h2>
        <div id="character-view">
          {encounterInfo.players ? (
            characterTrackers(encounterInfo.players)
          ) : (
            <p>Add characters to the encounter and you can track their info during an encounter!</p>
          )}
        </div>
      </div>
      <div id="encounter-monsters">
        <h2 className="character-view-title">Monsters:</h2>
        <div id="monster-view">
          {encounterInfo.monsters ? (
            monsterTrackers(encounterInfo.monsters)
          ) : (
            <p>Add monsters to the encounter and you can track their info during an encounter!</p>
          )}
        </div>
        {/* <form id="add-monster-form">
          <h3>Add Monster</h3>
          <select id='add-monster-select'>
            <option selected disabled>Select One</option>
          </select>
          <input id='add-monster-amount' placeholder='amount' type='number' min='1'/>
          <button>Add</button>
        </form> */}
      </div>
      
      {viewPopup ? <MonsterPopup specs={popupInfo} setViewPopup={setViewPopup} /> : <></>}
      
    </div>
  )
}

export default EncounterRun