import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import './Signup-Login.css'
import logoImg from '../../images/logo.png'

import { loginUser } from '../../ducks/userSlice.js'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [userInfo, setUserInfo] = useState({username: '', password: ''})

  const loginHandler = (event) => {
    event.preventDefault()

    if(userInfo.username && userInfo.password) {
      axios.post('/api/user/login', {username: userInfo.username, password: userInfo.password})
        .then(res => {
          dispatch(loginUser(res.data.username))
          navigate('/')
        })
        .catch(err => {
          console.log(err)
          alert('Login failed.')
        })
    } else {
      alert('Please enter a username and password.')
    }
  }

  return (
    <div className="login-register-page">
      <div className="login-form-container">
        <Link to='/' className='logo-wrap'>
          <img className="xl-logo" src={logoImg} alt="logo"/>
          <h1>DragonMasters Codex</h1>
        </Link>
        <form id="login-form" className="vertical-form" onSubmit={loginHandler}>
          <h2 className="form-header">Log In</h2>
          <div className="form-piece">
            <input
              id='login-username'
              className='form-input'
              required
              value={userInfo.username}
              onChange={(event) => setUserInfo({...userInfo, username: event.target.value})}
            />
            <label htmlFor="login-username" className="form-label">Username</label>
          </div>
          <div className="form-piece">
            <input
              id='login-password'
              className='form-input'
              required
              type='password'
              value={userInfo.password}
              onChange={(event) => setUserInfo({...userInfo, password: event.target.value})}
            />
            <label htmlFor="login-password" className="form-label">Password</label>
          </div>
          <button className="btn btn-type-1 btn-color-1">Login</button>
          <p>New to the site? <Link className='plaintext-link' to='/signup'>Create an Account</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login