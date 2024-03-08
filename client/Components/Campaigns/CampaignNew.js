import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"

import { clearCampaign } from "../../ducks/campaignSlice.js"

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

  const [campaignInfo, setCampaignInfo] = useState(editCampaign.name ? setEditCampaign(editCampaign) : {
    name: '',
    description: '',
    length: '',
    world_name: ''
  })
  const [myPlayers, setMyPlayers] = useState([])
  const [myEncounters, setMyEncounters] = useState([])
  const [addedPlayers, setAddedPlayers] = useState(editCampaign.players ? editCampaign.players : [])
  const [addedEncounters, setAddedEncounters] = useState(editCampaign.encounters ? editCampaign.encounters : [])

  useEffect(() => {
    axios.get('/api/characters')
      .then(res => {
        console.log(res.data)
        setMyPlayers(res.data)
      })

    axios.get('/api/encounters?filter=true')
      .then(res => {
        setMyEncounters(res.data)
      })
  }, [])

  const createCampaign = () => {
    const body = {
      ...campaignInfo,
      addedPlayers,
      addedEncounters
    }

    console.log(body)

    if(body.name) {
      if(body.id) {
        console.log(body)
        axios.put('/api/campaigns', body)
          .then(res => {
            console.log(res.data)
            alert('Campaign updated!')
            navigate(`/stuff/campaigns/${res.data.id}`)
          })
      } else {
        axios.post('/api/campaigns', body)
          .then(res => {
            alert(res.data.message)
            navigate(`/stuff/campaigns/${res.data.id}`)
          })
      }
    } else {
      alert('Please fill in name.')
    }
  }
  
  let playersSelections = myPlayers.map(player => {
    return (
      <div className="extra-selections-options" key={player.character_id}>
        <input
          className="extra-selections-checkbox"
          type="checkbox"
          defaultChecked={addedPlayers.findIndex(ele => ele.character_id === player.character_id) !== -1}
          onChange={(evt) => {
            if(!evt.target.checked) {
              let arr = [...addedPlayers]
              let index = arr.findIndex(ele => ele.character_id === player.character_id)
              arr.splice(index, 1)
              setAddedPlayers(arr)
            } else {
              setAddedPlayers([...addedPlayers, {character_id: player.character_id, current_hit_points: player.hit_points}])
            }
          }}
        />
        <p>{player.name}</p>
      </div>
    )
  })

  let encounterSelections = myEncounters.map(encounter => {
    return (
      <div className="extra-selections-options" key={encounter.encounter_id}>
        <input
          className="extra-selections-checkbox"
          type="checkbox"
          defaultChecked={addedEncounters.includes(encounter.encounter_id)}
          onChange={(evt) => {
            if(!evt.target.checked) {
              let arr = [...addedEncounters]
              let index = arr.indexOf(encounter.encounter_id)
              arr.splice(index, 1)
              setAddedEncounters(arr)
            } else {
              setAddedEncounters([...addedEncounters, encounter.encounter_id])
            }
          }}
        />
        <p>{encounter.name}</p>
      </div>
    )
  })

  return (
    <div className="page-layout-2">
      <button
        className='btn btn-type-1 btn-color-1 back-btn'
        onClick={() => {
          dispatch(clearCampaign())
          navigate('/stuff/campaigns')
        }}
      >{'<'} Back</button>
      <button
        className="btn btn-type-1 btn-color-3 create-btn"
        onClick={createCampaign}
      >Create</button>
      <section className="breakdown">
        <h2 className="dashboard-head">Base Info</h2>

        <form className="horizontal-form" onSubmit={evt => evt.preventDefault()}>
          <div className="form-piece">
            <label className="form-piece-filled">
              <input
                required
                className="form-input"
                value={campaignInfo.name}
                onChange={(evt) => {
                  setCampaignInfo({...campaignInfo, name: evt.target.value})
                }}
              />
              <span className="form-label">Name</span>
            </label>
          </div>
          <div className="form-piece large-input">
            <label className="form-piece-filled">
              <textarea
                className={"form-input" + (campaignInfo.description ? '' : ' empty-input')}
                value={campaignInfo.description}
                onChange={(evt) => {
                  setCampaignInfo({...campaignInfo, description: evt.target.value})
                }}
              />
              <span className="form-label">Description</span>
            </label>
          </div>
          <div className="form-piece">
            <label className="form-piece-filled">
              <input
                className={"form-input" + (campaignInfo.length ? '' : ' empty-input')}
                value={campaignInfo.length}
                onChange={(evt) => {
                  setCampaignInfo({...campaignInfo, length: evt.target.value})
                }}
              />
              <span className="form-label">Length</span>
            </label>
          </div>
          <div className="form-piece">
            <label className="form-piece-filled">
              <input
                className={"form-input" + (campaignInfo.world_name ? '' : ' empty-input')}
                value={campaignInfo.world_name}
                onChange={(evt) => {
                  setCampaignInfo({...campaignInfo, world_name: evt.target.value})
                }}
              />
              <span className="form-label">World Name</span>
            </label>
          </div>
        </form>
      </section>

      <section className="dashboard">
        <div className="extra-selections">
          <h2 className="dashboard-head">Add Characters</h2>
          {playersSelections}
        </div>

        <div className="extra-selections">
          <h2 className="dashboard-head">Add Encounters</h2>
          {encounterSelections}
        </div>
      </section>

    </div>
  )
}

export default CampaignNew