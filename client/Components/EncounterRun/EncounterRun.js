import React, {useEffect, useState} from "react";
import axios from 'axios'
import { useParams, Link } from "react-router-dom";

import TrackersDisplay from "../Trackers/TrackersDisplay.js";
import './EncounterRun.css'

function EncounterRun() {
  const {encounter_id} = useParams()
  const [encounterInfo, setEncounterInfo] = useState({})

  useEffect(() => {
    axios.get(`/api/encounters/${encounter_id}`)
      .then(res => {
        setEncounterInfo(res.data)
      })
  }, [])

  const monsterTrackers = (monsters) => monsters.map(monster => {
    return (
      <TrackersDisplay monster={monster} type='monster'/>
    )
  });

  return (
    <div id="encounter-view">
      <div id='viewed-encounter-name-stuff'>
        <Link
          className="encounter-run-link"
          to={`/stuff/encounters/${encounter_id}`}
        >{'<'} Back to Summary</Link>
        <h2 id="encounter-name">{encounterInfo.name}</h2>
        {/* <button>Set Initiative</button>
        <button>Next Turn</button> */}
      </div>
      <div id="encounter-monsters">
        <h2 class="character-view-title">Monsters:</h2>
        <div id="monster-view">
          {encounterInfo.monsters ? (
            monsterTrackers(encounterInfo.monsters)
          ) : (
            <p>Add monsters and trackers will display here</p>
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
      

    </div>
  )
}

export default EncounterRun