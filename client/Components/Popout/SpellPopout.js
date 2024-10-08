import React from 'react'
import { Link } from 'react-router-dom'

import './Popout.css'

function SpellPopout ({specs, setPopoutInfo}) {
  const ritOrConc = () => {
    let sentence = []

    if(specs.ritual) {
      sentence.push('Ritual')
    }

    if(specs.concentration) {
      sentence.push('Concentration')
    }

    return sentence[0] && ` (${sentence.join(', ')})`
  }
  
  const convertLevel = () => {
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
  }

  return (
    <div className='popout'>

      <Link className='view-specs' to={`/codex/specs/spells/${specs.index}`} target='_blank' rel="noopener noreferrer">View in Seperate Page</Link>

      <button className='close-info-button' onClick={() => setPopoutInfo(false)}>X</button>

      <div>
        <h3>{specs.name}</h3>
        <h5>{convertLevel()} {ritOrConc()}</h5>
      </div>

      <div className="splitter"></div>

      <div>
        <p>Range: {specs.range}</p>
        <p>Duration: {specs.duration}</p>
        <p>Casting Time: {specs.casting_time}</p>
        <p>Components: {specs.components.join(', ')}</p>
        {specs.attack_type && <p>Attack Type: {specs.attack_type}</p>}
        {specs.area_of_effect && <p>AOE: {specs.area_of_effect.size} ft. {specs.area_of_effect.type}</p>}
        {specs.damage && specs.damage.damage_type && <p>Damage Type: {specs.damage.damage_type.name}</p>}
      </div>

      <div className="splitter"></div>

      <div>
        {specs.desc.map((para, i) => <p key={i} >&ensp;{para}</p>)}
        <br></br>
        {specs.higher_level && specs.higher_level.map((para, i) => <><p key={i} >&ensp;{para}</p><br></br></>)}
        
        {specs.material && <p>&ensp;Materials: {specs.material}</p>}
      </div>
      
    </div>
  )
}

export default SpellPopout