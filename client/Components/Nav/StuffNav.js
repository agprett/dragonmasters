import React, {useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Nav } from 'react-bootstrap'

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
    <Nav id='stuff-nav'>
      <div className='nav-links-wrapper'>
        <NavLink className='stuff-nav-links nav-links' to="/stuff" end>My Stuff</NavLink>
      </div>
      <div className='nav-links-wrapper'>
        <NavLink className='stuff-nav-links nav-links' to="/stuff/campaigns">My Campaigns</NavLink>
      </div>
      <div className='nav-links-wrapper'>
        <NavLink className='stuff-nav-links nav-links' to="/stuff/encounters">My Encounters</NavLink>
      </div>
    </Nav>
  )
}

export default StuffNav