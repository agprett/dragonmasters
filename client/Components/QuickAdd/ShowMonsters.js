import { useState } from "react";

function ShowMonster ({monster, addMonsters, closePopup}) {
  const [count, setCount] = useState(1)

  return (
    <div className="info-list-item quick-add-monster" key={monster.name}>
      <h5>{monster.name}</h5>
      <input className="base-input small-input" placeholder="count" value={count} onChange={e => setCount(e.target.value)}/>
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