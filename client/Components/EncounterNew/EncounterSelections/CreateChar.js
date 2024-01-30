import { useState } from "react";
import axios from "axios";

function CreateCharacter({setShowNew, setPlayers}) {
  const [name, setName] = useState('')
  const [player, setPlayer] = useState('')
  const [hitPoints, setHitPoints] = useState(0)
  const [level, setLevel] = useState(0)
  const [armorClass, setArmorClass] = useState(0)

  const postCharacter = (evt) => {
    evt.preventDefault()

    const body = {
      name,
      player,
      hit_points: hitPoints,
      level,
      armor_class: armorClass
    }

    axios.post('/api/characters', body)
      .then(res => {
        axios.get('/api/characters')
          .then(res => {
            setPlayers(res.data)
            setShowNew(false)
          })
      })
  }

  return (
    <div className="create-new-char-form">
      <button className="btn btn-type-3 btn-color-4 close-btn" onClick={() => setShowNew(false)}>Cancel</button>
      <h2 className="dashboard-head">New Player</h2>
      <form onSubmit={postCharacter} className="horizontal-form">
        <label className="form-piece">
          <input
            required
            className="form-input"
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <span className="form-label">Name</span>
        </label>
        <label className="form-piece">
          <input
            required
            className="form-input"
            value={player}
            onChange={event => setPlayer(event.target.value)}
          />
          <span className="form-label">Player</span>
        </label>
        <label className="form-piece">
          <input
            required
            className="form-input"
            value={hitPoints}
            onChange={event => setHitPoints(event.target.value)}
          />
          <span className="form-label">HP</span>
        </label>
        <label className="form-piece">
          <input
            required
            className="form-input"
            value={level}
            onChange={event => setLevel(event.target.value)}
          />
          <span className="form-label">Level</span>
        </label>
        <label className="form-piece">
          <input
            required
            className="form-input"
            value={armorClass}
            onChange={event => setArmorClass(event.target.value)}
          />
          <span className="form-label">AC</span>
        </label>
        <button type="submit" className="btn btn-type-2 btn-color-3">Create</button>
      </form>
    </div>
  )
}

export default CreateCharacter