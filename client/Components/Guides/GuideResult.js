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
            <td>{data.size}</td>
            <td>{data.hit_points}</td>
            <td>{data.armor_class}</td>
            <td>{data.challenge_rating}</td>
            <td>{data.xp}</td>
          </>
        )
      
      case 'spells':

        return (
          <>
            <td>{data.casting_time}</td>
            <td>{data.range}</td>
            <td>{data.level === 0 ? 'Cantrip' : data.level}</td>
            <td>{data.school.name}</td>
            {data.dc ? <td>{data.dc.dc_type.name}</td> : <td></td>}
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
    <tr className='guide-result' key={index} onClick={getData}>
      <td className='result-name'>{name}</td>
      {displayResults()}
    </tr>
  )
}

export default GuideResult