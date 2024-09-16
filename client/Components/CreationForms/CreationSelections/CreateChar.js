import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function CreateCharacter({setShowNew, setMyPlayers}) {
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
            toast('New character created!')
            setMyPlayers(res.data)
            setShowNew(false)
          })
      })
      .catch(() => {
        toast('Failed to create character. Please try again.', { type: 'error' })
      })
  }

  return (
    <div className="create-new-char-form-wrapper">
      <div className="create-new-char-form">
        <button className="btn btn-type-3 btn-color-4 dashboard-close-btn" onClick={() => setShowNew(false)}>Cancel</button>
        <h4 className="dashboard-head">New Player</h4>
        <form onSubmit={postCharacter} className="horizontal-form">
          <div className="form-piece">
            <input
              required
              id="char-name"
              className="form-input"
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <label htmlFor="char-name" className="form-label required">Name</label>
          </div>
          <div className="form-piece">
            <input
              required
              id="char-player"
              className="form-input"
              value={player}
              onChange={event => setPlayer(event.target.value)}
            />
            <label htmlFor="char-player" className="form-label required">Player</label>
          </div>
          <div className="form-piece">
            <input
              required
              id="char-hp"
              className="form-input"
              value={hitPoints}
              onChange={event => setHitPoints(event.target.value)}
            />
            <label htmlFor="char-hp" className="form-label required">HP</label>
          </div>
          <div className="form-piece">
            <input
              required
              id="char-level"
              className="form-input"
              value={level}
              onChange={event => setLevel(event.target.value)}
            />
            <label htmlFor="char-level" className="form-label required">Level</label>
          </div>
          <div className="form-piece">
            <input
              required
              id="char-ac"
              className="form-input"
              value={armorClass}
              onChange={event => setArmorClass(event.target.value)}
            />
            <label htmlFor="char-ac" className="form-label required">AC</label>
          </div>
          <button type="submit" className="btn btn-type-2 btn-color-3">Create</button>
        </form>
      </div>
    </div>
  )
}

export default CreateCharacter