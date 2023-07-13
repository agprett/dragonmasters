import React from 'react'
import axios from 'axios'

function GuideResult (props) {
  const {type, data} = props
  const {index, name} = props.data

  const displayResults = () => {
    switch(type) {
      case 'monsters':

        return (
          <>
            <p>Size: {data.size}</p>
            <p>HP: {data.hit_points}</p>
            <p>AC: {data.armor_class}</p>
            <p>CR: {data.challenge_rating}</p>
            <p>XP: {data.xp}</p>
          </>
        )
      
      case 'spells':

        return (
          <>
            <p>Casting Time: {data.casting_time}</p>
            <p>Range: {data.range}</p>
            <p>Level: {data.level === 0 ? 'Cantrip' : data.level}</p>
            <p>School: {data.school.name}</p>
            {data.dc ? <p>DC: {data.dc.dc_type.name}</p> : <></>}
          </>
        )
    }
  }

  const getData = () => {
    axios.get(`/api/${type}/${index}`)
      .then(res => {
        props.setPopupData(res.data)
        props.setViewPopup(true)
      })
  }

  return (
    <div className='guide-result' key={index} onClick={getData}>
      <h2>{name}</h2>
      {displayResults()}
    </div>
  )
}

export default GuideResult