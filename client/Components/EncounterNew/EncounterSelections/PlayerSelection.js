import React, { useState } from 'react';

import CreateCharacter from './CreateChar.js';

function PlayersSelection({encounterPlayers, setEncounterPlayers, players, setPlayers}) {
  const [showNew, setShowNew] = useState(false)

  console.log('character reset')

  const selectPlayer = (player) => {
    setEncounterPlayers([...encounterPlayers, player])
  }

  const removePlayer = (player) => {
    let index = encounterPlayers.findIndex(char => player.character_id === char.character_id)
    let removalArr = [...encounterPlayers]

    removalArr.splice(index, 1)

    setEncounterPlayers([...removalArr])
  }

  const playersDisplay = players.map((player, i) => {
    let index = encounterPlayers.findIndex(char => +player.character_id === +char.character_id)
    if(index === -1) {
      const {name, player: playerName, hit_points, level} = player
      return (
        <tr className='ne-character-row' key={i}>
          <td><h3>{name}</h3></td>
          <td>{playerName}</td>
          <td>{hit_points}</td>
          <td>{level}</td>
          <td><button className='btn btn-type-3 btn-color-2' onClick={() => selectPlayer(player)}>Add</button></td>
        </tr>
      )
    }
  })

  const addedPlayers = encounterPlayers.map((player, i) => {
    return (
      <tr className='new-added-row' key={i}>
        <td><h3>{player.name}</h3></td>
        <td>{player.player}</td>
        <td><button className='btn btn-type-3 btn-color-4' onClick={() => removePlayer(player)}>Remove</button></td>
      </tr>
    )
  })
  
  return (
    <div className="new-encounter-selections">
      <table className='ne-player-table'>
        <thead>
            <tr className='ne-character-row' id='ne-character-head'>
            <th><h3>Name</h3></th>
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
            <th><h2>Added Players</h2></th>
          </tr>
        </thead>
        <tbody>
          {encounterPlayers[0] ? addedPlayers : <tr className='none-added-row'><td>No Players Currently Added</td></tr>}
        </tbody>
      </table>

      {showNew && <CreateCharacter setShowNew={setShowNew} setPlayers={setPlayers} />}
    </div>
  )
}

export default PlayersSelection