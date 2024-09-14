import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './Campaigns.css'

import { clearCampaign } from '../../ducks/campaignSlice.js'
import { Button } from 'react-bootstrap'

function Campaigns() {
  const [campaigns, setCampaigns] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get('/api/campaigns')
      .then(res => {
        setCampaigns(res.data)
      })
  }, [])

  const viewCampaignHandler = (id) => {
    navigate(`/stuff/campaigns/${id}`)
  }

  const viewNewCampaign = () => {
    dispatch(clearCampaign())
    navigate('/stuff/campaigns/new')
  }

  const allCampaigns = campaigns.map((campaign, i) => {
    return (
      <div className='dashboard-item' key={i}>
        <h4 className='dashboard-head'>{campaign.name}</h4>
        <p>{campaign.description}</p>
        <p>{campaign.Characters.map(e => e.name).join(', ')}</p>
        <Button variant='secondary' className='btn btn-type-2 btn-color-1' onClick={() => viewCampaignHandler(campaign.campaign_id)}>View</Button>
      </div>
    )
  })


  return (
    <div className='page-layout-2'>
      <h2>My Campaigns</h2>
      <button
        className='btn btn-type-2 btn-color-3 create-btn'
        onClick={() => viewNewCampaign()}
      >+ Create New</button>
      <div className='dashboard'>
        {
          campaigns[0] ? (
            allCampaigns
          ) : (
            <p>No Campaigns to Display</p>
          )
        }
      </div>
    </div>
  )
}

export default Campaigns