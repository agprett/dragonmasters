import React, { useState, memo } from 'react';

const NPCsSelection = memo(function NPCsSelection({addedNPCs, setAddedNPCs, myNPCs, setMyNPCs}) {
  const [showNew, setShowNew] = useState(false)

  const selectNPC = (npc) => {
    setAddedNPCs([...addedNPCs, npc])
  }

  const removeNPC = (npc) => {
    let index = addedNPCs.findIndex(char => npc.npc_id === char.npc_id)
    let removalArr = [...addedNPCs]

    removalArr.splice(index, 1)

    setAddedNPCs([...removalArr])
  }

  const npcsDisplay = myNPCs.map((npc, i) => {
    let index = addedNPCs.findIndex(char => +npc.npc_id === +char.npc_id)
    if(index === -1) {
      const {name, hit_points} = npc
      return (
        <tr className='ne-character-row' key={i}>
          <td><h5>{name}</h5></td>
          <td>{hit_points}</td>
          <td><button className='btn btn-type-3 btn-color-1' onClick={() => selectNPC(npc)}>Add</button></td>
        </tr>
      )
    }
  })

  const addedNPCsDisplay = addedNPCs.map((npc, i) => {
    return (
      <tr className='new-added-row' key={i}>
        <td><h5>{npc.name}</h5></td>
        <td>{npc.hit_points}</td>
        <td><button className='btn btn-type-3 btn-color-4' onClick={() => removeNPC(npc)}>Remove</button></td>
      </tr>
    )
  })
  
  return (
    <div className="accordion-content new-encounter-selections">
      <table className='ne-player-table'>
        <thead>
            <tr className='ne-character-row' id='ne-character-head'>
            <th><h5>Name</h5></th>
            <th>HP</th>
            <th></th>
            {/* <th className='center'><button className='btn btn-type-3 btn-color-3 enable-pointer' onClick={() => setShowNew(true)}>New</button></th> */}
          </tr>
        </thead>
        <tbody>{npcsDisplay}</tbody>
      </table>
      
      <table className='new-added'>
        <thead>
          <tr className='new-added-head new-added-row'>
            <th><h5>Added NPCs</h5></th>
          </tr>
        </thead>
        <tbody>
          {addedNPCs[0] ? addedNPCsDisplay : <tr className='none-added-row'><td>No NPCs Currently Added</td></tr>}
        </tbody>
      </table>

      {/* {showNew && <CreateCharacter setShowNew={setShowNew} setMyNPCs={setMyNPCs} />} */}
    </div>
  )
})

export default NPCsSelection