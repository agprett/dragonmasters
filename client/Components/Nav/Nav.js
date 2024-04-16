import React, { useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import Footer from './Footer'
import logo from '../../images/logo.png'

import { loginUser, logoutUser } from '../../ducks/userSlice.js'
import StuffNav from './StuffNav.js'

function Nav() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {pathname} = useLocation()
  const {username} = useSelector(state => state.user.info)

  useEffect(() => {
    console.log('nav refresh', username)
    if(!username) {
      axios.get('/api/user')
        .then(res => {
          console.log(res.data)
          dispatch(loginUser(res.data))
        })
        .catch(() => {
          console.log('Not signed in.')
        })
    }
  }, [username])

  const logoutHandler = () => {
    axios.post('/api/user/logout')
    .then(res => {
        dispatch(logoutUser())
        alert('Sucessfully logged out.')
        navigate('/')
      })
      .catch(() => {
        alert('Unable to log out. Please try again.')
      })
  }

  const openInitiative = () => {
    window.open(`/initiative`, 'Quick Fight!','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=750,height=500')
  }

  return (
    <>
      <nav id='main-nav'>
        <div className='main-nav-divs' id='main-nav-left'>
          <img src={logo} alt="small=-logo" className="medium-logo"/>
          <NavLink className='nav-links' to="/">
            <h3>DragonMasters</h3>
          </NavLink>
          <NavLink className='nav-links' to="/guide">Guide</NavLink>
          {username && (
            <NavLink className='nav-links' to="/stuff">My Stuff</NavLink>
          )}
          <button
            className='btn btn-type-2 btn-color-3'
            onClick={openInitiative}
          >Quick Fight</button>
        </div>
        {
          username ? (
            <div className='main-nav-divs' id='nav-right'>
              <p>Welcome, {username}</p>
              <button
                className='btn nav-links login-logout'
                onClick={logoutHandler}
              >Logout</button>
            </div>
          ) : (
            <div className='main-nav-divs' id='nav-right'>
              <Link className='btn nav-links login-logout' to='/login'>Log in/Sign up</Link>
            </div>
          )
        }
      </nav>

      {pathname.startsWith('/stuff') && <StuffNav />}

      <Outlet />
      
      <Footer />
    </>
  )
}

export default Nav