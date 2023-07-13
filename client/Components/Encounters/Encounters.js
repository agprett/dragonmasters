import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

import './Encounters.css'

import { clearEncounter } from '../../ducks/reducer'

function Encounters(props) {
  const navigate = useNavigate()
  const [encounters, setEncounters] = useState([])

  useEffect(() => {
    axios.get('/api/encounters')
      .then(res => {
        console.log(res.data)
        setEncounters(res.data)
      })
  }, [])

  const viewEncounterHandler = (id) => {
    navigate(`/stuff/encounters/${id}`)
  }

  const viewNewEncounter = () => {
    props.clearEncounter()
    navigate('/stuff/encounters/new')
  }

  const allEncounters = encounters.map((element, i) => {
    return (
      <div className='encounter-display' key={i}>
        <h2>{element.name}</h2>
        <p>{element.short_description}</p>
        <button className='view-encounter-btn' onClick={() => viewEncounterHandler(element.encounter_id)}>View</button>
      </div>
    )
  })

  return (
    <section id='encounters-comp'>
      <div id="build-encounter-button-wrap">
        <button
          id="build-encounter-button"
          onClick={() => viewNewEncounter()}
        >Build Encounter</button>
      </div>
      <section id="all-encounters">
        {
          encounters[0] ? (
            allEncounters
          ) : (
            <p>Add an encounter to view</p>
          )
        }
      </section>
    </section>
  )
}

const mapStateToProps = state => state

const functions = {clearEncounter}

export default connect(mapStateToProps, functions)(Encounters)