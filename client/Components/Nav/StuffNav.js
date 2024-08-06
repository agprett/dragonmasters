import React, {useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

import './StuffNav.css'

function StuffNav () {
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/user')
      .then(() => {
        console.log('Logged in')
      })
      .catch(() => {
        alert('You must be signed in to view this page!')
        navigate('/login')
      })
  }, [])
   
  return (
    <nav id='stuff-nav'>
      <div className='nav-links-wrapper'>
        <NavLink className='stuff-nav-links nav-links' to="/stuff" end>My Stuff</NavLink>
      </div>
      <div className='nav-links-wrapper'>
        <NavLink className='stuff-nav-links nav-links' to="/stuff/campaigns">My Campaigns</NavLink>
      </div>
      <div className='nav-links-wrapper'>
        <NavLink className='stuff-nav-links nav-links' to="/stuff/encounters">My Encounters</NavLink>
      </div>
    </nav>
  )
}

export default StuffNav