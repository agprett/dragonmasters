import { useState } from "react";

function ShowMonster ({monster, addMonsters, closePopup, pos}) {
  const [count, setCount] = useState(1)

  return (
    <div className="info-list-item quick-add-monster" key={monster.name}>
      <h5>{monster.name}</h5>
      <input id={`${monster.name}-${pos}-count`} className="base-input small-input" placeholder="count" value={count} onChange={e => setCount(e.target.value)}/>
      <label htmlFor={`${monster.name}-${pos}-count`} className="hidden-label">{`${monster.name}-count`}</label>
      <button
        className="btn btn-type-3 btn-color-3"
        onClick={() => {
          addMonsters(monster, +count)
          closePopup()
        }}
      >Add</button>
    </div>
  )

}

export default ShowMonster