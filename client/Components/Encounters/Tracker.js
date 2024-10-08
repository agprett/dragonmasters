import React, {useState} from "react"
import lodash from 'lodash'
import { toast } from "react-toastify"

const getD20 = () => {
  return lodash.random(1, 20)
}

const getModi = (num) => {
  return Math.floor((num - 10) / 2)
}

function Tracker({type, baseInfo, setInitiative, setPopoutInfo, removeCombatant}) {
  const [info, setInfo] = useState({...baseInfo})
  const [health, setHealth] = useState(info.hit_points)

  const updateHealth = (direction) => {
    if(direction === 'up'){
      setHealth(+health + 1)
    } else {
      if(health - 1 >= 0){
        setHealth(+health - 1)
      } else {
        toast('Cannot go below 0', { autoclose: 1000, type: 'error' })
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

    if(info.stats) {
      rolled = rolled + getModi(info.stats.dexterity)
    }

    setInitiative(rolled, info.i)
    setInfo({...info, initiative: rolled})
  }

  return (
    <tr className='tracker' id={`${info.name}`}>
      <td>
        <div className="inititiative-thing">
          <input
            id={`${info.name}-init-input`}
            className='base-input small-input'
            value={info.initiative}
            onChange={e => {
              setInitiative(+e.target.value, info.i)
              setInfo({...info, initiative: +e.target.value})
            }}
          /> {info.stats && <p>({(getModi(info.stats.dexterity) >= 0 ? '+': '')}{getModi(info.stats.dexterity)})</p>}
          <button onClick={rollInitiative} className="btn btn-type-3 btn-color-1">Roll</button>
          <label htmlFor={`${info.name}-init-input`} className="hidden-label">{`${info.name}-init-input`}</label>
        </div>
      </td>
      <td>
        {type === 'monster' ? (
          <h5 className="tracker-name" onClick={() => setPopoutInfo(info)}>
            {type === 'monster' && (
              <p
                className='info-button'
              >?</p>
            )}
            {info.name}
          </h5>
          ) : (
          <h5>{info.name}</h5>
        )}
      </td>
      <td className="health-display">
        <div className="health-input-wrapper">
          <input
            id={`${info.name}-hp-input`}
            className="base-input small-input health-input"
            type="number"
            min={0}
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
          />
          <label htmlFor={`${info.name}-hp-input`} className="hidden-label">{`${info.name}-hp-input`}</label>
          <div>
            <button onClick={() => updateHealth('up')} className="btn tiny-btn btn-color-1">+</button>
            <button onClick={() => updateHealth('down')} className="btn tiny-btn btn-color-1">-</button>
          </div>
          / {info.hit_points}
        </div>
      </td>
      <td>
        {info.armor_class}
      </td>
      <td>
        <button className="btn btn-type-4 btn-color-4" onClick={() => removeCombatant(info.i)}>X</button>
      </td>
    </tr>
  )
}

export default Tracker