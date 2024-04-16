import React, {useEffect} from 'react';

import PlayersSelection from './PlayerSelection';
import MonstersSelection from './MonstersSelection';

function CharactersSelection({display, encounterCharacters, setEncounterCharacters, players, monsters, filters, setFilters}) {
  useEffect(() => {
    console.log('ran character selection')
  })

  return (
    <section className="encounter-selection" id="player-selection">
      <h2 className='new-encounter-title'>{display === 1 ? 'Players' : 'Monsters'}</h2>

      {display === 1 ? (
        PlayersSelection({encounterCharacters, setEncounterCharacters, players})
        ) : (
        MonstersSelection({encounterCharacters, setEncounterCharacters, monsters, filters, setFilters})
      )}
    </section>
  )
}

export default CharactersSelection