import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function SpellSpecs () {
  const {index} = useParams()
  let [specs, setSpecs] = useState({})

  useEffect(() => {
    axios.get(`/api/spells/${index}`)
      .then(res => {
        console.log(res.data)
        setSpecs(res.data)
      })
  }, [])

  const ritOrConc = () => {
    let sentence = []

    if(specs.ritual) {
      sentence.push('Ritual')
    }

    if(specs.concentration) {
      sentence.push('Concentration')
    }

    return sentence[0] ? ` (${sentence.join(', ')})` : ''
  }
  
  const convertLevel = () => {
    if(specs.level && specs.school) {
      if(specs.level === 0) {
        return `${specs.school.name} Cantrip`
      } else if (specs.level === 1) {
        return `1st Level ${specs.school.name} Spell`
      } else if(specs.level === 2) {
        return `2nd Level ${specs.school.name} Spell`
      } else if(specs.level === 3) {
        return `3rd Level ${specs.school.name} Spell`
      } else {
        return `${specs.level}th Level ${specs.school.name} Spell`
      }
    } else {
      return <></>
    }
  }

  return (
    <div className='monster-specs'>
      <div>
        <h2>{specs.name}{ritOrConc()}</h2>
        <h3>{convertLevel()}</h3>
      </div>

      <div class="splitter"></div>

      <div>
        {specs.desc ? specs.desc.map(para => <p>{para}</p>): <></>}
        {specs.higher_level ? specs.higher_level.map(para => <p>{para}</p>) : <></>}
        {specs.material ? <p>Materials: {specs.material}</p> : <></>}
      </div>

      <div class="splitter"></div>

      <div>
        <p>Range: {specs.range}</p>
        <p>Duration: {specs.duration}</p>
        <p>Casting Time: {specs.casting_time}</p>
        <p>Components: {specs.components ? specs.components.join(', ') : ''}</p>
        {specs.attack_type ? <p>Attack Type: {specs.attack_type}</p> : ''}
        {specs.area_of_effect ? <p>AOE: {specs.area_of_effect.size} ft. {specs.area_of_effect.type}</p> : ''}
        {specs.damage && specs.damage.damage_type ? <p>Damage Type: {specs.damage.damage_type.name}</p> : ''}
      </div>
    </div>
  )
}

export default SpellSpecs