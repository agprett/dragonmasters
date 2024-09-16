import React, {useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Nav } from 'react-bootstrap'
import { toast } from 'react-toastify'

function StuffNav () {
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/user')
      .then(() => {
        console.log('Logged in')
      })
      .catch(() => {
        toast('You must be signed in to view this page!', { type: 'error' })
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
      <div className='nav-links-wrapper'>
        <NavLink className='stuff-nav-links nav-links' to="/stuff/characters">My Characters</NavLink>
      </div>
    </Nav>
  )
}

export default StuffNav