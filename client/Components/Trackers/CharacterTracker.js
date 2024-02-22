import React, {useEffect, useState} from "react"

import './TrackersDisplay.css'

function CharacterTracker(props) {
  const [characterInfo, setCharacterInfo] = useState({})
  const [healthInput, setHealthInput] = useState(1)

  useEffect(() => {
    console.log('reloaded')
    setCharacterInfo(props.character)
  }, [props.character])

  const updateHealth = (direction) => {
    if(direction === 'up'){
      setCharacterInfo({...characterInfo, hit_points: +characterInfo.hit_points + +healthInput})
    } else {
      if(characterInfo.hit_points - healthInput >= 0){
        setCharacterInfo({...characterInfo, hit_points: +characterInfo.hit_points - +healthInput})
      } else {
        alert('Cannot go below 0')
      }
    }
  }

  const updateNumInput = (event) => {
    let newNum = event.target.value.split('')

    if(newNum[0] === '0' && newNum.length !== 1){
      newNum.shift()
    }

    setHealthInput(newNum.join(''))
  }

  return (
    <>{!props.character.name ? (
      <p>Loading</p>
     ) : (
      <div className='tracker' id={`${characterInfo.name}`}>
        <h2>{characterInfo.name}</h2>
        <div className="health-display">
          <h3 className="tracker-health" id={`${characterInfo.name}-hp`}>Health: {characterInfo.hit_points}</h3>
          <div className="health-updater">
            <button onClick={() => updateHealth('down')}>-</button>
            <input id={`${characterInfo.name}-hp-input`} className="health-updater-input" type="number" min="0" value={healthInput} onChange={updateNumInput}/>
            <button onClick={() => updateHealth('up')}>+</button>
          </div>
        </div>
        <p>Initiative:</p>
        <input id={`${characterInfo.name}-initiative`} className='tracker-initiative'/>
      </div>
    )}</>
  )
}

export default CharacterTracker