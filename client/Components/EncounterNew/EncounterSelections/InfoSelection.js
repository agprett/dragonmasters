import React from 'react';

function InfoSelection({encounterInfo, setEncounterInfo, campaigns, setSelectedCampaign}) {
  const availableCampaigns = campaigns.map((campaign, i) => {
    return (
      <option key={i} value={campaign.campaign_id}>{campaign.name}</option>
    )
  })

  return (
    <section className="breakdown">
      <h2 className='dashboard-head'>Base Info</h2>

      <form onSubmit={e => e.preventDefault()} className="horizontal-form">
        <div className='form-piece'>
          <label className='form-piece-filled'>
            <input
              required
              className='form-input'
              value={encounterInfo.name}
              onChange={(event) => {
                setEncounterInfo({...encounterInfo, name: event.target.value})
              }}
            />
            <span className='form-label'>Name</span>
          </label>
        </div>
        <div className='form-piece medium-input'>
          <label className='form-piece-filled'>
            <input
              required
              className='form-input'
              maxLength={100}
              value={encounterInfo.shortDesc}
              onChange={(event) => {
                setEncounterInfo({...encounterInfo, shortDesc: event.target.value})
              }}
            />
            <span className='form-label'>Short Description {`(${encounterInfo.shortDesc.length}/100)`}</span>
          </label>
        </div>
        <div className='form-piece large-input'>
          <label className='form-piece-filled'>
            <textarea
              className={'form-input' + (encounterInfo.desc ? '' : ' empty-input')}
              value={encounterInfo.desc}
              onChange={(event) => {
                setEncounterInfo({...encounterInfo, desc: event.target.value})
              }}
            />
            <span className='form-label'>Description</span>
          </label>
        </div>
        <div className='form-piece'>
          <label className='form-piece-filled'>
            <input
              className={'form-input' + (encounterInfo.location ? '' : ' empty-input')}
              value={encounterInfo.location}
              onChange={(event) => {
                setEncounterInfo({...encounterInfo, location: event.target.value})
              }}
            />
            <span className='form-label'>Location</span>
          </label>
        </div>
        <div className='form-piece'>
          <label className='form-piece-filled'>
            <input
              className={'form-input' + (encounterInfo.terrain ? '' : ' empty-input')}
              value={encounterInfo.terrain}
              onChange={(event) => {
                setEncounterInfo({...encounterInfo, terrain: event.target.value})
              }}
            />
            <span className='form-label'>Terrain</span>
          </label>
        </div>
        <div className="form-piece">
          <label className="form-piece-filled">
            <select
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
            <span className="form-label">Campaign</span>
          </label>
        </div>
        <div className='form-piece large-input'>
          <label className='form-piece-filled'>
            <textarea
              className={'form-input' + (encounterInfo.rewards ? '' : ' empty-input')}
              value={encounterInfo.rewards}
              onChange={(event) => {
                setEncounterInfo({...encounterInfo, rewards: event.target.value})
              }}
            />
            <span className='form-label'>Loot/Rewards</span>
          </label>
        </div>
      </form>
    </section>
  )
}

export default InfoSelection