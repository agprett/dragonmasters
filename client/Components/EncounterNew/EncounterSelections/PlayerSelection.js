import React, { useEffect } from 'react';

function PlayersSelection(props) {
  const {encounterCharacters, setEncounterCharacters, players} = props

  console.log('character reset')

  const selectPlayer = (player) => {
    setEncounterCharacters([...encounterCharacters, player])
  }

  const removePlayer = (player) => {
    let index = encounterCharacters.findIndex(char => player.character_id === char.character_id)
    let removalArr = [...encounterCharacters]

    removalArr.splice(index, 1)

    setEncounterCharacters([...removalArr])
  }

  const playersDisplay = players.map((player, i) => {
    let index = encounterCharacters.findIndex(char => +player.character_id === +char.character_id)
    if(index === -1) {
      const {name, player: playerName, hit_points, level} = player
      return (
        <div className='new-encounter-player-card' key={i}>
          <h2>{name}</h2>
          <h3>{playerName}</h3>
          <p>{hit_points}</p>
          <p>{level}</p>
          <button onClick={() => selectPlayer(player)}>Add</button>
        </div>
      )
    }
  })

  const addedPlayers = encounterCharacters.map((player, i) => {
    return (
      <div className='new-add-player-card' key={i}>
        <h2>{player.name}</h2>
        <h3>{player.player}</h3>
        <p>{player.hit_points}</p>
        <button onClick={() => removePlayer(player)}>Remove</button>
      </div>
    )
  })
  
  return (
    <section class="new-encounter-selections" id="players-selection">
      <div className='new-displayed-characters'>
        <div className='new-encounter-player-card'>
          <h2>Name</h2>
          <h3>Player</h3>
          <p>HP</p>
          <p>Level</p>
          <div></div>
        </div>
        {playersDisplay}
      </div>
      
      <div className='new-added'>
        <h2>Added Players</h2>
        {addedPlayers}
      </div>
    </section>
  )
}

export default PlayersSelection