import React from 'react';

function EncounterForm({encounterInfo, setEncounterInfo, campaigns, setSelectedCampaign}) {
  const availableCampaigns = campaigns.map((campaign, i) => {
    return (
      <option key={i} value={campaign.campaign_id}>{campaign.name}</option>
    )
  })

  return (
    <div className="accordion-breakdown-item">
      <form onSubmit={e => e.preventDefault()} className="horizontal-form">
        <div className='form-piece'>
          <input
            required
            id='encounter-name'
            className='form-input'
            value={encounterInfo.name}
            onChange={(event) => {
              setEncounterInfo({...encounterInfo, name: event.target.value})
            }}
          />
          <label htmlFor='encounter-name' className='form-label required'>Name</label>
        </div>

        <div className='form-piece medium-input'>
          <input
            required
            id='encounter-short-desc'
            className='form-input'
            maxLength={100}
            value={encounterInfo.shortDesc}
            onChange={(event) => {
              setEncounterInfo({...encounterInfo, shortDesc: event.target.value})
            }}
          />
          <label htmlFor='encounter-short-desc' className='form-label required'>Short Description {`(${encounterInfo.shortDesc.length}/100)`}</label>
        </div>

        <div className='form-piece large-input'>
          <textarea
            id='encounter-desc'
            className={'form-input' + (encounterInfo.desc ? '' : ' empty-input')}
            value={encounterInfo.desc}
            onChange={(event) => {
              setEncounterInfo({...encounterInfo, desc: event.target.value})
            }}
          />
          <label htmlFor='encounter-desc' className='form-label'>Description</label>
        </div>

        <div className='form-piece'>
          <input
            id='encounter-location'
            className={'form-input' + (encounterInfo.location ? '' : ' empty-input')}
            value={encounterInfo.location}
            onChange={(event) => {
              setEncounterInfo({...encounterInfo, location: event.target.value})
            }}
          />
          <label htmlFor='encounter-location' className='form-label'>Location</label>
        </div>

        <div className='form-piece'>
          <input
            id='encounter-terrain'
            className={'form-input' + (encounterInfo.terrain ? '' : ' empty-input')}
            value={encounterInfo.terrain}
            onChange={(event) => {
              setEncounterInfo({...encounterInfo, terrain: event.target.value})
            }}
          />
          <label htmlFor='encounter-terrain' className='form-label'>Terrain</label>
        </div>

        <div className="form-piece">
          <select
            id='encounter-campaign'
            className="form-input"
            value={encounterInfo.campaign_id}
            onChange={evt => {
              if(evt.target.value === 'Select Campaign') {
                setEncounterInfo({...encounterInfo, campaign_id: ''})
                setSelectedCampaign('')
              } else {
                setEncounterInfo({...encounterInfo, campaign_id: evt.target.value})
                setSelectedCampaign(evt.target.options[evt.target.selectedIndex].text)
              }
            }}
          >
            <option defaultValue={true} value={null}>
              Select Campaign
            </option>
            {availableCampaigns}
          </select>
          <label htmlFor='encounter-campaign' className="form-label">Campaign</label>
        </div>

        <div className='form-piece large-input'>
          <textarea
            id='encounter-rewards'
            className={'form-input' + (encounterInfo.rewards ? '' : ' empty-input')}
            value={encounterInfo.rewards}
            onChange={(event) => {
              setEncounterInfo({...encounterInfo, rewards: event.target.value})
            }}
          />
          <label htmlFor='encounter-rewards' className='form-label'>Loot/Rewards</label>
        </div>
      </form>
    </div>
  )
}

export default EncounterForm