import React, {useEffect, useState} from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'

import Footer from './Footer'
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
    axios.post('/api/user/logout')
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
      <nav id='main-nav'>
        <div className='main-nav-divs' id='main-nav-left'>
          <img src={logo} alt="small-logo" className="medium-logo"/>
          <NavLink className='nav-links btn-type-1-hover' to="/">
            <h3>DragonMasters</h3>
          </NavLink>
          <NavLink className='nav-links btn-type-1-hover' to="/guide">Guide</NavLink>
          {props.username ? (
            <NavLink className='nav-links btn-type-1-hover' to="/stuff">My stuff</NavLink>
          ) : null}
        </div>
        {
          userInfo.username ? (
            <div className='main-nav-divs' id='nav-right'>
              <p>Welcome, {userInfo.username}</p>
              <button
                className='nav-links btn btn-type-1-hover login-logout'
                onClick={logoutHandler}
              >Logout</button>
            </div>
          ) : (
            <div className='nav-divs' id='nav-right'>
              <Link className='nav-links btn btn-type-1-hover login-logout' to='/login'>Log in/Sign up</Link>
            </div>
          )
        }
      </nav>
      <Outlet />
      
      <Footer />
    </>
  )
}

const mapStateToProps = state => state

const functions = {getUser, logoutUser}

export default connect(mapStateToProps, functions)(Nav)