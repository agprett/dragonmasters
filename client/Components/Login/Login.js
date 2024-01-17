import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'

import logoImg from '../../images/logo.png'

import { loginUser } from '../../ducks/reducer'

function Login(props) {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({username: '', password: ''})

  const loginHandler = (event) => {
    event.preventDefault()

    if(userInfo.username && userInfo.password) {
      axios.post('/api/user/login', {username: userInfo.username, password: userInfo.password})
        .then(res => {
          props.loginUser(res.data.username)
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
        <form id="login-form" className="vertical-form" onSubmit={loginHandler}>
          <img className="large-logo" src={logoImg} alt="logo"/>
          <h1 className="title-1">DragonMasters</h1>
          <p className="form-header">Create a new account</p>
          <div className="form-piece">
            <label className="form-piece-underlined">
              <input
                className='form-input'
                required
                value={userInfo.username}
                onChange={(event) => setUserInfo({...userInfo, username: event.target.value})}
              />
              <span className="form-label">Username</span>
            </label>
          </div>
          <div className="form-piece">
            <label className="form-piece-underlined">
              <input
                className='form-input'
                required
                type='password'
                value={userInfo.password}
                onChange={(event) => setUserInfo({...userInfo, password: event.target.value})}
              />
              <span className="form-label">Password</span>
            </label>
          </div>
          <button class="btn btn-type-1 btn-color-1">Login</button>
          <p>New to the site? <Link to='/signup'>Create an Account</Link></p>
        </form>
        <div className="login-image">Start your next adventure now</div>
      </div>
    </div>
  )
}

const mapStateToProps = state => state

const functions = {loginUser}

export default connect(mapStateToProps, functions)(Login)