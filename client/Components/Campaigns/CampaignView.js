import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function CampaignView() {
  const [campaignInfo, setCampaignInfo] = useState({})

  useEffect(() => {
    let {campaign_id} = useParams()
    console.log(campaign_id)
  }, [])

  return (
    <div>
      Campaign View
    </div>
  )
}

export default CampaignView