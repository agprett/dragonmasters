import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import './MonsterSpecs.css'

function MonsterSpecs () {
  const {index} = useParams()
  let [specs, setSpecs] = useState({saving_throws: [], skills: []})

  useEffect(() => {
    axios.get(`/api/monsters/${index}`)
      .then(res => {
        // console.log(res.data)
        setSpecs(res.data)
      })
  }, [])

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
      let text = <p key={stat}>{stat.substring(0, 3).toUpperCase()}: {specs.stats[stat]}</p>

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
        <div>
          <h3>{ability.name}</h3>
          {ability.name.toLowerCase() === 'spellcasting' ? ability.desc.split('\n- ').map(sentence => <p>{sentence}</p>) : <p>{ability.desc}</p>}
        </div>
      )
    })
  )

  const createSpellStuff = specs.spellcasting && (
    <div>
      <h2>Spellcasting</h2>
      {specs.spellcasting.desc.split('\n').map(str => <p>{str}</p>)}
    </div>
  )

  const createActions = specs.actions && (
    specs.actions.map(action => {
      return (
        <div>
          <h3>{action.name}</h3>
          <p>{action.desc}</p>
          {action.usage && <p>Usage info needed</p>}
        </div>
      )
    })
  )

  const createLegendary = specs.legendary_actions && (
    specs.legendary_actions.map(action => {
      return (
        <div>
          <h3>{action.name}</h3>
          <p>{action.desc}</p>
        </div>
      )
    })
  )

  return (
    <div className='monster-specs'>
      <div className='monster-header'>
        <h2 className="monster-name">{specs.name}</h2>
        <p>&nbsp;-&nbsp;</p>
        <p>{specs.size} {specs.type} {specs.subtype && ` (${specs.subtype})`}, {specs.alignment}</p>
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
            <h2>Special Abilities</h2>
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
        <h2>Actions</h2>
        {createActions}
      </div> 

      {specs.legendary_actions && (
        <>
          <div className='splitter'></div>
          <div className='monster-legendary-actions'>
            <h2>Legendary Actions</h2>
            <p>The {specs.type} can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The {specs.type} regains spent legendary actions at the start of its turn.</p>
            {createLegendary}
          </div>
        </>
      )}
    </div>
  )
}

export default MonsterSpecs