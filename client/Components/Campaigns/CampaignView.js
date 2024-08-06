import React, {useEffect, useState} from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import './Campaigns.css'
import { addCampaign } from '../../ducks/campaignSlice.js'
import DeletePopup from '../DeletePopup/DeletePopup.js'

function CampaignView() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  let {campaign_id} = useParams()
  const [campaignInfo, setCampaignInfo] = useState({Characters: [], Encounters: []})
  const [displayPopup, setDisplayPopup] = useState(false)

  useEffect(() => {
    axios.get(`/api/campaigns/${campaign_id}`)
      .then(res => {
        setCampaignInfo(res.data)
      })
  }, [])

  const updateCampaign = () => {
    const {name, description, length, world_name, campaign_id, Characters, Encounters} = campaignInfo

    dispatch(addCampaign({
      name,
      description,
      length,
      world_name,
      id: campaign_id,
      players: Characters.map(char => {
        return {
          character_id: char.character_id,
          current_hit_points: char.hit_points
        }
      }),
      encounters: Encounters.map(enc => enc.encounter_id)
    }))

    navigate(`/stuff/campaigns/new`)
  }

  const viewEncounterHandler = (id) => {
    navigate(`/stuff/encounters/${id}`, {state: {last: location.pathname}})
  }

  const charShorts = campaignInfo.Characters.map((char, i) => {
    return (
      <div key={i} className='info-list-item campaign-character'>
        <h2>{char.name}</h2>
        <h3>{char.player}</h3>
        <p>AC: {char.armor_class}</p>
        <p>HP: {char.hit_points}</p>
      </div>
    )
  })

  const encounters = campaignInfo.Encounters.map((element, i) => {
    return (
      <div className='info-list-item campaign-encounter' key={i}>
        <h2>{element.name}</h2>
        <button className='btn btn-type-4 btn-color-1' onClick={() => viewEncounterHandler(element.encounter_id)}>View</button>
      </div>
    )
  })

  return (
    <div className='page-layout-2'>
      {displayPopup && <DeletePopup name={campaignInfo.name} url={`/api/campaigns/${campaign_id}`} route={'/stuff/campaigns'} setDisplay={setDisplayPopup} />}

      <Link
        className='btn btn-type-1 btn-color-1 back-btn'
        to={'/stuff/campaigns'}
      >{'<'} Back</Link>

      <section className='breakdown-top'>
        <div className='breakdown-base-info'>
          <h2 className='title-1'>{campaignInfo.name}</h2>
        </div>
        
        <div className='breakdown-top-buttons'>
          <button
            className='btn btn-type-1 btn-color-1'
            onClick={() => updateCampaign()}
            >Edit</button>
        </div>
      </section>

      <section className='breakdown'>
        <h2 className='breakdown-head'>Details:</h2>
        <div className='breakdown-piece large-breakdown-piece'>
          <p className='breakdown-label'>Description: </p>
          <p className='breakdown-text'>{campaignInfo.description || 'None'}</p>
        </div>
        <div className='breakdown-break'></div>
        <div className='breakdown-piece'>
          <p className='breakdown-label'>Length:</p>
          <p className='breakdown-text'>{campaignInfo.length || 'None'}</p>
        </div>
        <div className='breakdown-piece'>
          <p className='breakdown-label'>World Name:</p>
          <p className='breakdown-text'>{campaignInfo.world_name || 'None'}</p>
        </div>
      </section>

      <section className='info-list-group'>
        <section className='info-list-wrapper'>
          <h2 className='info-list-head'>Players:</h2>
          {campaignInfo.Characters[0] ? charShorts : <p>No added characters</p>}
        </section>

        <section className='info-list-wrapper'>
          <h2 className='info-list-head'>Encounters:</h2>
          {campaignInfo.Encounters[0] ? encounters : <p>No added encounters</p>}
        </section>
      </section>

      <button className='btn btn-type-1 btn-color-4' onClick={() => setDisplayPopup(true)} >Delete</button>

    </div>
  )
}

export default CampaignView