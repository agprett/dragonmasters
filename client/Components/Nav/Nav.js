import React, {useEffect, useState} from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import Footer from './Footer'
import logo from '../../images/logo.png'

import { loginUser, logoutUser } from '../../ducks/userSlice.js'

function Nav() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const username = useSelector(state => state.user.username)

  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    console.log('nav refresh', username)
    if(!username) {
      axios.get('/api/user')
        .then(res => {
          console.log(res.data)
          const {username} = res.data
          dispatch(loginUser({username}))
          setUserInfo({username})
        })
        .catch(() => {
          console.log('Not signed in.')
        })
    } else if (!userInfo.username) {
      setUserInfo({username: username})
    }
  }, [!userInfo.username])

  const logoutHandler = () => {
    axios.post('/api/user/logout')
    .then(res => {
        dispatch(logoutUser())
        setUserInfo({})
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
          <img src={logo} alt="small=-logo" className="medium-logo"/>
          <NavLink className='nav-links' to="/">
            <h3>DragonMasters</h3>
          </NavLink>
          <NavLink className='nav-links' to="/guide">Guide</NavLink>
          {username ? (
            <NavLink className='nav-links' to="/stuff">My Stuff</NavLink>
          ) : null}
        </div>
        {
          userInfo.username ? (
            <div className='main-nav-divs' id='nav-right'>
              <p>Welcome, {userInfo.username}</p>
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
      <Outlet />
      
      <Footer />
    </>
  )
}

export default Nav