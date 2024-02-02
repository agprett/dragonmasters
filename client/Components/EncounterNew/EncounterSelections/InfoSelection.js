import React, {useEffect} from 'react';

function InfoSelection(props) {
  const {encounterInfo, setEncounterInfo, campaigns} = props

  useEffect(() => {
    console.log('info ran')
  }, [])

  // const availableCampaigns = campaigns.map((campaign, i) => {
  //   return (
  //     <option key={i} value={campaign.campaign_id}>{campaign.title}</option>
  //   )
  // })

  return (
    <section className="encounter-selection" id="info-selection">
      <h2 className='new-encounter-title'>Encounter Info</h2>

      <section className="new-encounter-info">
        <div id='ne-basic-info' className='ne-info-breakdowns'>
          <label for='ne-name-input'>Encounter Name*</label>
          <input
            id='ne-name-input'
            placeholder='Name'
            value={encounterInfo.name}
            onChange={(event) => {
              setEncounterInfo({...encounterInfo, name: event.target.value})
            }}
          />
          <label for='ne-short-desc-input'>Short Description*</label>
          <input
            id='ne-short-desc-input'
            placeholder='Short Description'
            value={encounterInfo.shortDesc}
            onChange={(event) => {
              setEncounterInfo({...encounterInfo, shortDesc: event.target.value})
            }}
          />
          <textarea
            id='ne-desc-input'
            placeholder='Description'
            value={encounterInfo.desc}
            onChange={(event) => {
              setEncounterInfo({...encounterInfo, desc: event.target.value})
            }}
          />
        </div>
        <div id='ne-extra-info' className='ne-info-breakdowns'>
          <input
            id='ne-location-input'
            placeholder='Location'
            onChange={(event) => {
              setEncounterInfo({...encounterInfo, location: event.target.value})
            }}
          />
          <input
            id='ne-terrain-input'
            placeholder='Terrain'
            onChange={(event) => {
              setEncounterInfo({...encounterInfo, terrain: event.target.value})
            }}
          />
          {/* <select
            id='ne-campaign-select'
            value={encounterInfo.campaign}
            onChange={(event) => {
              setEncounterInfo({...encounterInfo, campaign: event.target.value})
            }}
          >
            <option value='null'>None</option>
            {availableCampaigns}
          </select> */}
          <textarea
            id='ne-loot-input'
            placeholder='Loot/Rewards'
            onChange={(event) => {
              setEncounterInfo({...encounterInfo, rewards: event.target.data})
            }}
          />
        </div>
      </section>

      {/* <section className='new-encounter-review'>
        <div className='new-encounter-manuever-btns'>
          <Link className='ne-buttons' to={'/stuff/encounters'}>Cancel</Link>
          <button className='ne-buttons' onClick={() => setDisplay('Players')}>Next</button>
        </div>
      </section> */}
    </section>
  )
}

export default InfoSelection