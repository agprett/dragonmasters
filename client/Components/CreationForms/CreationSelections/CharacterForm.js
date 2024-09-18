import React from "react";

function CharacterForm({characterInfo, setCharacterInfo}) {

  return (
    <div className="accordion-breakdown-item">
      <form onSubmit={e => e.preventDefault()} className="horizontal-form">
        <div className="form-piece">
          <input
            required
            id="character-name"
            className="form-input"
            value={characterInfo.name}
            onChange={(event) => {
              setCharacterInfo({...characterInfo, name: event.target.value})
            }}
          />
          <label htmlFor="character-name" className="form-label required">Name</label>
        </div>

        <div className="form-piece">
          <input
            required
            id="character-player"
            className="form-input"
            value={characterInfo.player}
            onChange={(event) => {
              setCharacterInfo({...characterInfo, player: event.target.value})
            }}
          />
          <label htmlFor="character-player" className="form-label required">Player</label>
        </div>

        <div className="form-piece">
          <input
            required
            id="character-hp"
            className="form-input"
            value={characterInfo.hitPoints}
            onChange={(event) => {
              setCharacterInfo({...characterInfo, hitPoints: event.target.value})
            }}
          />
          <label htmlFor="character-hp" className="form-label required">HP</label>
        </div>

        <div className="form-piece">
          <input
            required
            id="character-level"
            className="form-input"
            value={characterInfo.level}
            onChange={(event) => {
              setCharacterInfo({...characterInfo, level: event.target.value})
            }}
          />
          <label htmlFor="character-level" className="form-label required">Level</label>
        </div>

        <div className="form-piece">
          <input
            required
            id="character-ac"
            className="form-input"
            value={characterInfo.armorClass}
            onChange={(event) => {
              setCharacterInfo({...characterInfo, armorClass: event.target.value})
            }}
          />
          <label htmlFor="character-ac" className="form-label required">AC</label>
        </div>
      </form>
    </div>
  )
}

export default CharacterForm