import React, {useState} from "react";
import { useLoaderData, Link } from "react-router-dom";

import TrackersDisplay from "../Trackers/TrackersDisplay.js";

import MonsterPopup from "../Popout/MonsterPopup.js";


function EncounterRun() {
  const {combatants, name, encounter_id} = useLoaderData()
  const [popupInfo, setPopupInfo] = useState(false)

  return (
    <div className="page-layout-2">
      <Link
        className="btn btn-type-1 btn-color-1 back-btn"
        to={`/stuff/encounters/${encounter_id}`}
      >{'<'} Back</Link>
      <div id='viewed-encounter-name-stuff'>
        <h2 className="title-2">{name}</h2>
      </div>
      
      <TrackersDisplay combatants={combatants} setPopupInfo={setPopupInfo}/>
      
      {popupInfo && <MonsterPopup specs={popupInfo} setViewPopup={setPopupInfo}/>}
      
    </div>
  )
}

export default EncounterRun