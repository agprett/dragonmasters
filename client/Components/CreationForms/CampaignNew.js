import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

import './CreationForms.css'

import { clearCampaign } from "../../ducks/campaignSlice.js"
import PlayersSelection from "./CreationSelections/PlayerSelection.js"

const setEditCampaign = (info) => {
  const data = {...info}
  delete data.players
  delete data.encounters

  return data
}

function CampaignNew() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const editCampaign= useSelector(state => state.campaign.info)

  const [panels, setPanels] = useState({'one': true, 'two': false, 'three': false})
  const [campaignInfo, setCampaignInfo] = useState(editCampaign.name ? setEditCampaign(editCampaign) : {
      name: '',
      description: '',
      length: '',
      world_name: ''
    }
  )
  const [myPlayers, setMyPlayers] = useState([])
  const [myEncounters, setMyEncounters] = useState([])
  const [addedPlayers, setAddedPlayers] = useState(editCampaign.players ? editCampaign.players : [])
  const [addedEncounters, setAddedEncounters] = useState(editCampaign.encounters ? editCampaign.encounters : [])

  useEffect(() => {
    axios.get('/api/characters')
      .then(res => {
        setMyPlayers(res.data)
        if(editCampaign.name) {
          setAddedPlayers(addedPlayers.map(player => {
            let fullDataIndex = res.data.findIndex(data => data.character_id === player.character_id)

            return res.data[fullDataIndex]
          }))
        }
      })
      
    axios.get('/api/encounters?filter=true')
      .then(res => {
        setMyEncounters(res.data)
      })
  }, [])

  const createCampaign = () => {
    const playerList = addedPlayers.map(player => {return {...player, current_hit_points: player.hit_points}})

    const body = {
      ...campaignInfo,
      addedPlayers: playerList,
      addedEncounters
    }

    if(body.name) {
      if(body.id) {
        axios.put('/api/campaigns', body)
          .then(res => {
            toast('Campaign updated!')
            navigate(`/stuff/campaigns/${res.data.id}`)
          })
          .catch(() => {
            toast('Failed to update campaign. Please try again.', { type: 'error' })
          })
      } else {
        axios.post('/api/campaigns', body)
          .then(res => {
            toast(res.data.message)
            navigate(`/stuff/campaigns/${res.data.id}`)
          })
          .catch(() => {
            toast('Failed to create campaign. Please try again.', { type: 'error' })
          })
      }
    } else {
      toast('Please add a name.', { type: 'error' })
    }
  }

  let encounterSelections = myEncounters.map(encounter => {
    return (
      <tr className="new-campaign-encounter-row" key={encounter.encounter_id}>
        <td><h5>{encounter.name}</h5></td>
        <td>{encounter.Campaign ? encounter.Campaign.name : 'None'}</td>
        <td>
          <button
            className={`btn btn-type-3 btn-color-${addedEncounters.includes(encounter.encounter_id) ? '4' : '3'}`}
            onClick={() => {
              if(addedEncounters.includes(encounter.encounter_id)) {
                setAddedEncounters(addedEncounters.filter(id => id !== encounter.encounter_id))
              } else {
                setAddedEncounters([...addedEncounters, encounter.encounter_id])
              }
            }}
          >{addedEncounters.includes(encounter.encounter_id) ? 'Remove' : 'Add'}</button>
        </td>
      </tr>
    )
  })

  const changeDisplay = (panel) => {
    setPanels({...panels, [panel]: !panels[panel]})
  }

  return (
    <div className="page-layout-2">
      <button
        className='btn btn-type-1 btn-color-4 back-btn'
        onClick={() => {
          dispatch(clearCampaign())
          navigate('/stuff/campaigns')
        }}
      >Cancel</button>

      <section className="breakdown-top">
        <div className="breakdown-base-info"><h2>{editCampaign.name ? 'Update' : 'New'} Campaign</h2></div>
      </section>

      <button
        className="btn btn-type-1 btn-color-3 create-btn"
        onClick={createCampaign}
      >{editCampaign.name ? 'Save' : 'Create'}</button>

      <section className="accordion">
        <div className="accordion-item">
          <div
            className='accordion-item-header'
            onClick={() => changeDisplay('one')}
          ><h4>Basic Info</h4> <button className='accordion-item-status'>{panels.one ? '-' : '+'}</button></div>

          <div className={`accordion-content-wrapper ${panels.one ? 'accordion-content-expanded' : ''}`}>
            <div className="accordion-content">
              <form className="horizontal-form" onSubmit={evt => evt.preventDefault()}>
                <div className="form-piece">
                  <input
                    required
                    id="campaign-name"
                    className="form-input"
                    value={campaignInfo.name}
                    onChange={(evt) => {
                      setCampaignInfo({...campaignInfo, name: evt.target.value})
                    }}
                  />
                  <label htmlFor="campaign-name" className="form-label required">Name</label>
                </div>

                <div className="form-piece large-input">
                  <textarea
                    id="campaign-desc"
                    className={"form-input" + (campaignInfo.description ? '' : ' empty-input')}
                    value={campaignInfo.description}
                    onChange={(evt) => {
                      setCampaignInfo({...campaignInfo, description: evt.target.value})
                    }}
                  />
                  <label htmlFor="campaign-desc" className="form-label">Description</label>
                </div>

                <div className="form-piece">
                  <input
                    id="campaign-length"
                    className={"form-input" + (campaignInfo.length ? '' : ' empty-input')}
                    value={campaignInfo.length}
                    onChange={(evt) => {
                      setCampaignInfo({...campaignInfo, length: evt.target.value})
                    }}
                  />
                  <label htmlFor="campaign-length" className="form-label">Length</label>
                </div>

                <div className="form-piece">
                  <input
                    id="campaign-world-name"
                    className={"form-input" + (campaignInfo.world_name ? '' : ' empty-input')}
                    value={campaignInfo.world_name}
                    onChange={(evt) => {
                      setCampaignInfo({...campaignInfo, world_name: evt.target.value})
                    }}
                  />
                  <label htmlFor="campaign-world-name" className="form-label">World Name</label>
                </div>
              </form>        
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <div
            className="accordion-item-header"
            onClick={() => changeDisplay('three')}
          ><h4>Characters</h4><button className='accordion-item-status'>{panels.three ? '-' : '+'}</button></div>

          <div className={`accordion-content-wrapper ${panels.three ? 'accordion-content-expanded' : ''}`}>
            <PlayersSelection addedPlayers={addedPlayers} setAddedPlayers={setAddedPlayers} myPlayers={myPlayers} setMyPlayers={setMyPlayers}/>
          </div>
        </div>

        <div className="accordion-item">
          <div
            className="accordion-item-header"
            onClick={() => changeDisplay('two')}
          ><h4>Encounters</h4><button className='accordion-item-status'>{panels.two ? '-' : '+'}</button></div>

          <div className={`accordion-content-wrapper ${panels.two ? 'accordion-content-expanded' : ''}`}>
            <div className="accordion-content">
              <table className="new-campaign-encounter">
                <thead className="new-campaign-encounter-row" id="new-campaign-encounter-head">
                  <tr><th><h5>Name</h5></th></tr>
                  <tr><th>Current Campaign</th></tr>
                  <tr><th></th></tr>
                </thead>
                
                <tbody>{encounterSelections}</tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CampaignNew

{/* <div className="accordion-item">
<div
  className="accordion-item-header"
  onClick={() => changeDisplay('SSS')}
>SSS<button className='accordion-item-status'>{panels.SSS ? '-' : '+'}</button></div>

<div className={`accordion-content-wrapper ${panels.SSS ? 'accordion-content-expanded' : ''}`}>
  <div className="breakdown accordion-wrapper">SSS</div>
</div>
</div> */}