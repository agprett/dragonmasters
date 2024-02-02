import React, {useEffect, useState} from "react"

function Tracker(props) {
  const {i} = props
  const [monsterInfo, setMonsterInfo] = useState({})
  const [healthInput, setHealthInput] = useState(1)

  useEffect(() => {
    console.log('reloaded')
    setMonsterInfo(props.monster)
  }, [props.monster])

  const updateHealth = (direction) => {
    if(direction === 'up'){
      setMonsterInfo({...monsterInfo, hit_points: monsterInfo.hit_points + +healthInput})
    } else {
      if(monsterInfo.hit_points - healthInput >= 0){
        setMonsterInfo({...monsterInfo, hit_points: monsterInfo.hit_points - healthInput})
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
    <>{!props.monster.name ? (
      <p>Loading</p>
     ) : (
      <div className='tracker' id={`${monsterInfo.index}-${i}`}>
        <h2>{monsterInfo.name} - {i}</h2>
        <div className="health-display">
          <h3 className="tracker-health" id={`${monsterInfo.index}-${i}-hp`}>Health: {monsterInfo.hit_points}</h3>
          <div className="health-updater">
            <button onClick={() => updateHealth('down')}>-</button>
            <input id={`${monsterInfo.index}-${i}-hp-input`} className="health-updater-input" type="number" min='0'  onChange={updateNumInput} value={healthInput}/>
            <button onClick={() => updateHealth('up')}>+</button>
          </div>
        </div>
        <p>Initiative:</p>
        <input id={`${monsterInfo.index}-${i}-initiative`} className='tracker-initiative'/>
      </div>
    )}</>
  )
}

export default Tracker