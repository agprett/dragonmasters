import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './Encounter.css'
import { clearEncounter } from '../../ducks/encounterSlice.js'

function Encounters() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [encounters, setEncounters] = useState([])

  useEffect(() => {
    axios.get('/api/encounters')
      .then(res => {
        setEncounters(res.data)
      })
  }, [])

  const viewEncounterHandler = (id) => {
    navigate(`/stuff/encounters/${id}`)
  }

  const viewNewEncounter = () => {
    dispatch(clearEncounter())
    navigate('/stuff/encounters/new')
  }

  const allEncounters = encounters.map((element, i) => {
    return (
      <div className='dashboard-item' key={i}>
        <h3 className='dashboard-head'>{element.name}</h3>
        {element.campaign && <p>{element.campaign}</p>}
        <p>{element.short_description}</p>
        {element.location && <p>{element.location}</p>}
        <button className='btn btn-type-2 btn-color-1' onClick={() => viewEncounterHandler(element.encounter_id)}>View</button>
      </div>
    )
  })

  return (
    <section className='page-layout-2'>
      <h2 className='title-2'>My Encounters</h2>
      <button
        className='btn btn-type-2 btn-color-3 create-btn'
        onClick={() => viewNewEncounter()}
      >+ Create New</button>
      <div className='dashboard'>
        {
          encounters[0] ? (
            allEncounters
          ) : (
            <p>No Encounters to Display</p>
          )
        }
      </div>
    </section>
  )
}

export default Encounters