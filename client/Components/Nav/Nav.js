import React, {useEffect, useState} from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'

import './Nav.css'
import logo from '../../images/logo.png'

import { getUser, logoutUser } from '../../ducks/reducer'

function Nav(props) {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    console.log('nav refresh', props.username)
    if(!props.username) {
      axios.get('/api/user')
        .then(res => {
          console.log(res.data)
          const {username} = res.data
          props.getUser({username})
          setUserInfo({username})
        })
        .catch(() => {
          console.log('Not signed in.')
        })
    } else if (!userInfo.username) {
      setUserInfo({username: props.username})
    }
  }, [!userInfo.username])

  const logoutHandler = () => {
    props.logoutUser()
    setUserInfo({})
    axios.post('/api/logout')
      .then(res => {
        alert('Sucessfully logged out.')
        navigate('/')
      })
      .catch(() => {
        alert('Unable to log out. Please try again.')
      })
  }

  return (
    <>
      <nav id='nav'>
        <div className='nav-divs' id='nav-left'>
          <img src={logo} alt="logo" className="nav-logo"/>
          <NavLink className='nav-links' to="/">
            <h3>DragonMasters</h3>
          </NavLink>
          <NavLink className='nav-links' to="/guide">Guide</NavLink>
          {props.username ? (
            <NavLink className='nav-links' to="/stuff">My stuff</NavLink>
          ) : null}
        </div>
        {
          userInfo.username ? (
            <div className='nav-divs' id='nav-right'>
              <p>Welcome, {userInfo.username}</p>
              <button
                className='nav-links login_logout'
                onClick={logoutHandler}
              >Logout</button>
            </div>
          ) : (
            <div className='nav-divs' id='nav-right'>
              <Link className='nav-links login_logout' to='/login'>Log in/Sign Up</Link>
            </div>
          )
        }
      </nav>
      <Outlet />
    </>
  )
}

const mapStateToProps = state => state

const functions = {getUser, logoutUser}

export default connect(mapStateToProps, functions)(Nav)