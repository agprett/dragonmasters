import { useState } from "react"

function AddCombatant({ addName, setDisplay }) {
  const [name, setName] = useState('')
  const [count, setCount] = useState(1)

  const addCombatant = (evt) => {
    evt.preventDefault()

    addName(name, count)
    setName('')
    setCount(1)
  }

  const closePopup = () => {
    setDisplay(false)
  }

  return (
    <div className="initiative-add">
      <h2 className="dashboard-head">Add Combatant</h2>
      <form className="vertical-form" onSubmit={addCombatant} >
        <div className="form-piece">
          <label className="form-piece-filled">
            <input
              className={"form-input" + (name ? '' : ' empty-input')}
              value={name}
              onChange={evt => setName(evt.target.value)}
            />
            <span className="form-label">Name</span>
          </label>
        </div>
        <div className="form-piece">
          <label className="form-piece-filled">
            <input
              className={"form-input" + (count ? '' : ' empty-input')}
              value={count}
              type="number"
              min={1}
              onChange={evt => setCount(evt.target.value)}
            />
            <span className="form-label">Count</span>
          </label>
        </div>
        <button className="btn btn-type-2 btn-color-3" type="submit">Add</button>
      </form>
      <button className="btn btn-type-2 btn-color-2" onClick={closePopup}>Done</button>
    </div>
  )
}

export default AddCombatant