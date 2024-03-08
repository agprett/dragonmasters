import React, {useEffect} from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'

function StuffNav () {
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/user')
      .then(() => {
        // console.log('Logged in')
      })
      .catch(() => {
        alert('You must be signed in to view this page!')
        navigate('/login')
      })
  }, [])
   
  return (
    <>
      <nav id='stuff-nav'>
        <NavLink className='stuff-nav-links nav-links' to="/stuff" end>My Stuff</NavLink>
        <NavLink className='stuff-nav-links nav-links' to="/stuff/campaigns">My Campaigns</NavLink>
        <NavLink className='stuff-nav-links nav-links' to="/stuff/encounters">My Encounters</NavLink>
      </nav>
      <Outlet/>
    </>
  )
}

export default StuffNav