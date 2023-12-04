import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'

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
    <section>
      <form onSubmit={loginHandler}>
        <input
          placeholder='Username'
          value={userInfo.username}
          onChange={(event) => setUserInfo({...userInfo, username: event.target.value})}
          />
        <input
          placeholder='Password'
          type='password'
          value={userInfo.password}
          onChange={(event) => setUserInfo({...userInfo, password: event.target.value})}

        />
        <button>Login</button>
      </form>
      <p>New to the site?</p>
      <button><Link to='/signup'>Create an Account</Link></button>
      <button><Link to='/'>Cancel</Link></button>
    </section>
  )
}

const mapStateToProps = state => state

const functions = {loginUser}

export default connect(mapStateToProps, functions)(Login)