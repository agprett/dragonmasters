import React from 'react'
import { Link } from 'react-router-dom'

function MonsterPopup (props) {
  console.log('Popup reload')
  const {specs, setViewPopup} = props

  const createSpeedStr = () => {
    let speedArr = []

    for(let key in specs.speed) {
      speedArr.push(`${key}: ${specs.speed[key]}`)
    }

    return 'Speed: ' + speedArr.join(', ')
  }

  const createSubSkills = () => {
    let savingThrowData = []
    let skillsData = []

    specs.proficiencies.forEach(element => element.proficiency.name.includes('Saving Throw') ? savingThrowData.push(element) : skillsData.push(element))

    return (
      <>
        {savingThrowData[0] ? (
          <p>
            Saving Throws: {savingThrowData.map((element) => `${element.proficiency.name.replace('Saving Throw: ', '')}: ${element.value}`).join(', ')}
          </p>
        ) : ''}
        {skillsData[0] ? (
          <p>
            Skills: {skillsData.map(element => `${element.proficiency.name.replace('Skill: ', '')}: +${element.value}`).join(', ')}
          </p>
        ) : ''}
        {specs.senses ? (
          <p>
            Senses: {Object.keys(specs.senses).map(sense => `${sense}: ${specs.senses[sense]}`).join(', ')}
          </p>
        ) : ''}
        <p>Language: {specs.languages || 'None'}</p>
        <p>Challenge: {specs.challenge_rating} ({specs.xp} XP)</p>
      </>
    )
  }

  const createSpecials = specs.special_abilities ? (
    specs.special_abilities.map(ability => {
      return (
        <div>
          <h3>{ability.name}</h3>
          {ability.name.toLowerCase() === 'spellcasting' ? ability.desc.split('\n- ').map(sentence => <p>{sentence}</p>) : <p>{ability.desc}</p>}
        </div>
      )
    })
  ) : <></>

  const createActions = specs.actions.map(action => {
    return (
      <div>
        <h3>{action.name}</h3>
        <p>{action.desc}</p>
        {action.usage ? <p>Usage info needed</p> : ''}
      </div>
    )
  })

  const createLegendary = specs.legendary_actions ? (
    specs.legendary_actions.map(action => {
      return (
        <div>
          <h3>{action.name}</h3>
          <p>{action.desc}</p>
        </div>
      )
    })
  ) : <></>

  return (
    <div className='monster-popup'>

      <Link className='view-specs' to={`../specs/monsters/${specs.index}`} target='_blank' rel="noopener noreferrer">View in Seperate Page</Link>
      
      <button className='close-info-button' onClick={() => setViewPopup(false)}>X</button>

      <div className='monster-header'>
        <h2 class="monster-name">{specs.name}</h2>
        <p>&nbsp;-&nbsp;</p>
        <p>{specs.size} {specs.type} {specs.subtype ? ` (${specs.subtype})` : ''}, {specs.alignment}</p>
      </div>

      {specs.desc ? <p class="monster-desc"> {specs.desc}</p> : ''}

      <div class="splitter"></div>

      <div className='monster-base-info'>
        <p>AC: {specs.armor_class}</p>
        <p>Hit Points: {specs.hit_points} (Hit Die: {specs.hit_dice})</p>
        <p>{createSpeedStr()}</p>
      </div>

      <div class="splitter"></div>

      <div className='monster-main-skills'>
        <p class="monster-main-skill">STR: {specs.strength} ({Math.floor((specs.strength - 10) / 2)})</p>
        <p class="monster-main-skill">DEX: {specs.dexterity} ({Math.floor((specs.dexterity - 10) / 2)})</p>
        <p class="monster-main-skill">CON: {specs.constitution} ({Math.floor((specs.constitution - 10) / 2)})</p>
        <p class="monster-main-skill">INT: {specs.intelligence} ({Math.floor((specs.intelligence - 10) / 2)})</p>
        <p class="monster-main-skill">WIS: {specs.wisdom} ({Math.floor((specs.wisdom - 10) / 2)})</p>
        <p class="monster-main-skill">CHA: {specs.charisma} ({Math.floor((specs.charisma - 10) / 2)})</p>
      </div>

      <div class="splitter"></div>

      <div className='monster-sub-skills'>
        {createSubSkills()}
      </div>

      {specs.special_abilities ? (
        <>
          <div class="splitter"></div>

          <div className='monster-specials'>
            <h2>Special Abilities</h2>
            {createSpecials}
          </div>
        </>
      ) : ''}

      <div class="splitter"></div>

      <div className='monster-actions'>
        <h2>Actions</h2>
        {createActions}
      </div> 

      {specs.legendary_actions ? (
        <>
          <div className='splitter'></div>
          <div className='monster-legendary-actions'>
            <h2>Legendary Actions</h2>
            <p>The {specs.type} can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The {specs.type} regains spent legendary actions at the start of its turn.</p>
            {createLegendary}
          </div>
        </>
      ) : ''}
    </div>
  )
}

export default MonsterPopup