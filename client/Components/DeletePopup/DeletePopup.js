import axios from "axios"
import { useNavigate } from "react-router-dom"

import './DeletePopup.css'
import { toast } from "react-toastify"

function DeletePopup({name, url, route, setDisplay}) {
  const navigate = useNavigate()

  const handleDelete = () => {
    axios.delete(url)
      .then(res => {
        toast('Successfully deleted!', { type: 'info' })
        setDisplay(false)
        navigate(route)
      })
  }

  return (
    <div className="popup-wrapper">
      <div className="delete-popup">
        <h4 className="dashboard-head">Are you sure?</h4>
        <h5>Are you sure you want to delete {name}?</h5>
        <div className="button-wrapper">
          <button className="btn btn-type-2 btn-color-1" onClick={() => setDisplay(false)}>Cancel</button>
          <button className="btn btn-type-2 btn-color-4" onClick={() => handleDelete()}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default DeletePopup