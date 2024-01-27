import { useState } from "react";

function ShowMonster ({monster, addMonsters, closePopup}) {
  const [count, setCount] = useState(1)

  return (
    <div key={monster.name}>
      {monster.name}
      <input placeholder="count" value={count} onChange={e => setCount(e.target.value)}/>
      <button onClick={() => {
        addMonsters(monster, count)
        closePopup()
      }}>Add</button>
    </div>
  )

}

export default ShowMonster