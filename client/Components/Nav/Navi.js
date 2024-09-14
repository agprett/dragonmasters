import React, { useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav, NavbarCollapse, NavbarToggle, NavItem } from 'react-bootstrap'

import './Navi.css'
import Footer from './Footer'
import logo from '../../images/logo.png'

import { loginUser, logoutUser } from '../../ducks/userSlice.js'
import StuffNav from './StuffNav.js'

function Navi() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {pathname} = useLocation()
  const {username} = useSelector(state => state.user.info)

  useEffect(() => {
    if(!username) {
      axios.get('/api/user')
        .then(res => {
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

  return (
    <>
      <Navbar bg='primary' expand='md' id='main-nav'>
        <NavLink to="/"><img src={logo} alt="small-logo" className="medium-logo justify-content-start"/></NavLink>
        <NavbarToggle className='bg-light' />
        <NavbarCollapse className='justify-content-between'>
          <Nav className='main-nav-divs' id='nav-left'>
            <NavItem className='nav-links-wrapper'>
              <NavLink className='nav-links' to="/">Home</NavLink>
            </NavItem>
            <NavItem className='nav-links-wrapper'>
              <NavLink className='nav-links' to="/codex">Codex</NavLink>
            </NavItem>
            {username && (
            <NavItem className='nav-links-wrapper'>
              <NavLink className='nav-links' to="/stuff">Stuff</NavLink>
            </NavItem>
            )}
          </Nav>

          <Nav className='main-nav-divs' id='nav-right'>
            {
              username ? (
                <>
                  <p>Welcome, {username}</p>
                  <button
                    className='btn btn-color-4 login-logout'
                    onClick={logoutHandler}
                  >Logout</button>
                </>
              ) : (
                <Link className='btn btn-color-1 login-logout' to='/login'>Log in/Sign up</Link>
              )
            }
          </Nav>
        </NavbarCollapse>
      </Navbar>

      {pathname.startsWith('/stuff') && <StuffNav />}

      <Outlet />
      
      <Footer />
    </>
  )
}

export default Navi