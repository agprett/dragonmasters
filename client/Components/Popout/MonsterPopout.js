import React from 'react'

import { Link } from 'react-router-dom'

import './Popout.css'

function MonsterPopout ({specs, setPopoutInfo}) {
  const createSpeedStr = () => {
    let speedArr = []

    for(let key in specs.speed) {
      speedArr.push(`${key}: ${specs.speed[key]}`)
    }

    return 'Speed: ' + speedArr.join(', ')
  }

  const statsBlock = () => {
    let stuff = []
    for(let stat in specs.stats) {
      let text = <p key={stat}>{stat.substring(0, 3).toUpperCase()}: {specs.stats[stat]} ({Math.floor((specs.stats[stat] - 10) / 2)})</p>

      stuff.push(text)
    }

    return stuff
  }

  const createSubSkills = () => {
    return (
      <>
        {specs.saving_throws && (
          <p>
            Saving Throws: {specs.saving_throws.map((element) => `${element.name}: ${element.value}`).join(', ')}
          </p>
        )}
        {specs.skills && (
          <p>
            Skills: {specs.skills.map(element => `${element.name}: +${element.value}`).join(', ')}
          </p>
        )}
        {specs.senses && (
          <p>
            Senses: {Object.keys(specs.senses).map(sense => `${sense}: ${specs.senses[sense]}`).join(', ')}
          </p>
        )}
        <p>Language: {specs.languages || 'None'}</p>
        <p>Challenge: {specs.challenge_rating} ({specs.xp} XP)</p>
      </>
    )
  }
  
  const createSpecials = specs.special_abilities && (
    specs.special_abilities.map(ability => {
      return (
        <div key={ability.name}>
          <h5>{ability.name}</h5>
          {ability.desc.split('\n- ').map((sentence, i) => <p key={`${i}`}>&ensp;{sentence}</p>)}
        </div>
      )
    })
  )

  const createSpellStuff = specs.spellcasting && (
    <div>
      <h4>Spellcasting</h4>
      {specs.spellcasting.desc.split('\n').map((str, i) => <p key={`${i}`}>&ensp;{str}</p>)}
    </div>
  )

  const createActions = specs.actions.map(action => {
    return (
      <div key={action.name}>
        <h5>{action.name}</h5>
        <p>&ensp;{action.desc}</p>
        {action.usage && <p>Usage info needed</p>}
      </div>
    )
  })

  const createLegendary = specs.legendary_actions && (
    specs.legendary_actions.map(action => {
      return (
        <div key={action.name}>
          <h5>{action.name}</h5>
          <p>&ensp;{action.desc}</p>
        </div>
      )
    })
  )

  return (
    <div className='popout'>

      <Link className='view-specs' to={`/codex/specs/monsters/${specs.index}`} target='-blank' rel="noopener noreferrer" relative='path'>View in Seperate Page</Link>
            
      <button className='close-info-button' onClick={() => setPopoutInfo(false)}>X</button>
      
      <div>
        <h3>{specs.name}</h3>
        <h5>{specs.size} {specs.type} {specs.subtype && ` (${specs.subtype})`}, {specs.alignment}</h5>
      </div>

      {specs.desc && <p className="monster-desc"> {specs.desc}</p>}

      <div className="splitter"></div>

      <div className='monster-base-info'>
        <p>AC: {specs.armor_class}</p>
        <p>Hit Points: {specs.hit_points} (Hit Die: {specs.hit_dice})</p>
        <p>{createSpeedStr()}</p>
      </div>

      <div className="splitter"></div>

      <div className='monster-main-skills'>
        {statsBlock()}
      </div>

      <div className="splitter"></div>

      <div className='monster-sub-skills'>
        {createSubSkills()}
      </div>

      {specs.special_abilities && (
        <>
          <div className="splitter"></div>

          <div className='monster-specials'>
            <h4>Special Abilities</h4>
            {createSpecials}
          </div>
        </>
      )}

      {specs.spellcasting && (
        <>
          <div className="splitter"></div>

          {createSpellStuff}
        </>
      )}

      <div className="splitter"></div>

      <div className='monster-actions'>
        <h4>Actions</h4>
        {createActions}
      </div>

      {specs.legendary_actions && (
        <>
          <div className='splitter'></div>
          <div className='monster-legendary-actions'>
            <h4>Legendary Actions</h4>
            <p>&ensp;The {specs.type} can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The {specs.type} regains spent legendary actions at the start of its turn.</p>
            {createLegendary}
          </div>
        </>
      )}
    </div>
  )
}

export default MonsterPopout