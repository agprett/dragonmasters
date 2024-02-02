import React, {useState} from "react"
import lodash from 'lodash'

const getD20 = () => {
  return lodash.random(1, 20)
}

const getModi = (num) => {
  return Math.floor((num - 10) / 2)
}

function Tracker({type, baseInfo, setInitiative, setPopupInfo}) {
  const [info, setInfo] = useState({...baseInfo})
  const [health, setHealth] = useState(info.hit_points)

  const updateHealth = (direction) => {
    if(direction === 'up'){
      setHealth(+health + 1)
    } else {
      if(health - 1 >= 0){
        setHealth(+health - 1)
      } else {
        alert('Cannot go below 0')
        document.body.classList.remove('hide-scroll')
      }
    }
  }

  const updateNumInput = (event) => {
    let newNum = event.target.value.split('')

    if(newNum[0] === '0' && newNum.length !== 1){
      newNum.shift()
    }

    setHealth(newNum.join(''))
  }

  const rollInitiative = () => {
    let rolled = getD20()

    console.log(rolled)

    if(info.stats) {
      rolled = rolled + getModi(info.stats.dexterity)
    }

    setInitiative(rolled, info.i)
    setInfo({...info, initiative: rolled})
  }

  return (
<<<<<<< HEAD
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
=======
    <tr className='tracker' id={`${info.name}`}>
      <td>
        <div className="inititiative-thing">
          <input
            className='base-input medium-input'
            value={info.initiative}
            onChange={e => {
              setInitiative(+e.target.value, info.i)
              setInfo({...info, initiative: +e.target.value})
            }}
          /> {info.stats && <p>({(getModi(info.stats.dexterity) >= 0 ? '+': '')}{getModi(info.stats.dexterity)})</p>}
          <button onClick={rollInitiative} className="btn btn-type-3 btn-color-1">Roll</button>
        </div>
      </td>
      <td>
        {type === 'monster' ? (
          <h3 className="tracker-name" onClick={() => setPopupInfo(info)}>{info.name}</h3>
          ) : (
          <h3>{info.name}</h3>
        )}
      </td>
      <td className="health-display">
        <div>
          <input
            id={`${info.name}-hp-input`}
            className="base-input medium-input"
            type="number"
            min='0'
            onChange={updateNumInput} value={health}
            onWheel={e => {
              if(e.deltaY <= 0) {
                updateHealth('up')
              } else {
                updateHealth('down')
              }
            }}
            onMouseEnter={() => {
              document.body.classList.add('hide-scroll')
            }}
            onMouseLeave={() => {
              document.body.classList.remove('hide-scroll')
            }}
          /> / {info.hit_points}
        </div>
      </td>
      <td>
        {info.armor_class}
      </td>
      <td>
        {type === 'monster' && (
          <button
            className='info-button'
            onClick={() => {
              setPopupInfo(info)
            }}
          >?</button>
        )}
      </td>
    </tr>
>>>>>>> dev
  )
}

export default Tracker