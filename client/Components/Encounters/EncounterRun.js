import React, {useState} from "react";
import { useLoaderData, Link } from "react-router-dom";

import TrackersDisplay from "../Trackers/TrackersDisplay.js";

import MonsterPopout from "../Popout/MonsterPopout.js";


function EncounterRun() {
  const {combatants: initialList, name, encounter_id} = useLoaderData()
  const [combatants, setCombatants] = useState(initialList)
  const [popoutInfo, setPopoutInfo] = useState(false)

  return (
    <div className="page-layout-2">
      <Link
        className="btn btn-type-1 btn-color-1 back-btn"
        to={`/stuff/encounters/${encounter_id}`}
      >{'<'} Back</Link>
      <div id='viewed-encounter-name-stuff'>
        <h2 className="title-2">{name}</h2>
      </div>
      
      <TrackersDisplay combatants={combatants} setPopoutInfo={setPopoutInfo} />
      
      {popoutInfo && <MonsterPopout specs={popoutInfo} setPopoutInfo={setPopoutInfo} />}
      
    </div>
  )
}

export default EncounterRun