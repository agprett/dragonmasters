import React from "react";

function NPCForm({npcInfo, setNPCInfo}) {

  return (
    <div className="accordion-breakdown-item">
      <form onSubmit={e => e.preventDefault()} className="horizontal-form">
        <div className="form-piece">
          <input
            required
            id="character-name"
            className="form-input"
            value={npcInfo.name}
            onChange={(event) => {
              setNPCInfo({...npcInfo, name: event.target.value})
            }}
          />
          <label htmlFor="character-name" className="form-label required">Name</label>
        </div>

        <div className="form-piece">
          <input
            required
            id="character-hp"
            className="form-input"
            value={npcInfo.hitPoints}
            onChange={(event) => {
              setNPCInfo({...npcInfo, hitPoints: event.target.value})
            }}
          />
          <label htmlFor="character-hp" className="form-label required">HP</label>
        </div>

        <div className="form-piece">
          <input
            required
            id="character-ac"
            className="form-input"
            value={npcInfo.armorClass}
            onChange={(event) => {
              setNPCInfo({...npcInfo, armorClass: event.target.value})
            }}
          />
          <label htmlFor="character-ac" className="form-label required">AC</label>
        </div>
      </form>
    </div>
  )
}

export default NPCForm