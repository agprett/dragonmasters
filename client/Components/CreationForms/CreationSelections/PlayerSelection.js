import React, { useState, memo } from 'react';

import CreateCharacter from './CreateChar.js';

const PlayersSelection = memo(function PlayersSelection({addedPlayers, setAddedPlayers, myPlayers, setMyPlayers}) {
  const [showNew, setShowNew] = useState(false)

  const selectPlayer = (player) => {
    setAddedPlayers([...addedPlayers, player])
  }

  const removePlayer = (player) => {
    let index = addedPlayers.findIndex(char => player.character_id === char.character_id)
    let removalArr = [...addedPlayers]

    removalArr.splice(index, 1)

    setAddedPlayers([...removalArr])
  }

  const playersDisplay = myPlayers.map((player, i) => {
    let index = addedPlayers.findIndex(char => +player.character_id === +char.character_id)
    if(index === -1) {
      const {name, player: playerName, hit_points, level} = player
      return (
        <tr className='ne-character-row' key={i}>
          <td><h5>{name}</h5></td>
          <td>{playerName}</td>
          <td>{hit_points}</td>
          <td>{level}</td>
          <td><button className='btn btn-type-3 btn-color-1' onClick={() => selectPlayer(player)}>Add</button></td>
        </tr>
      )
    }
  })

  const addedPlayersDisplay = addedPlayers.map((player, i) => {
    return (
      <tr className='new-added-row' key={i}>
        <td><h5>{player.name}</h5></td>
        <td>{player.player}</td>
        <td><button className='btn btn-type-3 btn-color-4' onClick={() => removePlayer(player)}>Remove</button></td>
      </tr>
    )
  })
  
  return (
    <div className="accordion-content new-encounter-selections">
      <table className='ne-player-table'>
        <thead>
            <tr className='ne-character-row' id='ne-character-head'>
            <th><h5>Name</h5></th>
            <th>Player</th>
            <th>HP</th>
            <th>Level</th>
            <th className='center'><button className='btn btn-type-3 btn-color-3 enable-pointer' onClick={() => setShowNew(true)}>New</button></th>
          </tr>
        </thead>
        <tbody>{playersDisplay}</tbody>
      </table>
      
      <table className='new-added'>
        <thead>
          <tr className='new-added-head new-added-row'>
            <th><h5>Added Players</h5></th>
          </tr>
        </thead>
        <tbody>
          {addedPlayers[0] ? addedPlayersDisplay : <tr className='none-added-row'><td>No Players Currently Added</td></tr>}
        </tbody>
      </table>

      {showNew && <CreateCharacter setShowNew={setShowNew} setMyPlayers={setMyPlayers} />}
    </div>
  )
})

export default PlayersSelection