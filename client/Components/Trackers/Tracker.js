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

  return (
    <>{!props.monster.name ? (
      <p>Loading</p>
     ) : (
      <div className='tracker' id={`${monsterInfo.index}-${i}`}>
        <h2>{monsterInfo.name} - {i}</h2>
        <div class="health-display">
          <h3 class="tracker-health" id={`${monsterInfo.index}-${i}-hp`}>Health: {monsterInfo.hit_points}</h3>
          <div class="health-updater">
            <button onClick={() => updateHealth('down')}>-</button>
            <input id={`${monsterInfo.index}-${i}-hp-input`} class="health-updater-input" type="number" min="0" value={healthInput} onChange={(event) => setHealthInput(+event.target.value)}/>
            <button onClick={() => updateHealth('up')}>+</button>
          </div>
        </div>
        <p>Initiative:</p>
        <input id={`${monsterInfo.index}-${i}-initiative`} class='tracker-initiative'/>
      </div>
    )}</>
  )
}

export default Tracker