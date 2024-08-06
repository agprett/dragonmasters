import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import './Signup-Login.css'
import logoImg from '../../images/logo.png'

import { loginUser } from '../../ducks/userSlice.js'

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [userInfo, setUserInfo] = useState({username: '', password: '', checkedPassword: ''})

  // const [checkPasswordStuff, setCheckPasswordStuff] = useState({text: '', inputStyle: '', textStyle: ''})

  // const checkPassword = (event) => {
  //   setUserInfo({...userInfo, checkedPassword: event.target.value})

  //   if (userInfo.password === '') {
  //     setCheckPasswordStuff({text: '', inputStyle: '', textStyle: ''})
  //   } else if(event.target.value === userInfo.password){
  //     setCheckPasswordStuff({text: '', inputStyle: 'match-password-input', textStyle: ''})
  //   } else {
  //     setCheckPasswordStuff({text: 'Inputs do not match', inputStyle: 'no-match-password-input', textStyle: 'no-match-password-text'})
  //   }
  // }

  const createNewUser = (event) => {
    event.preventDefault()

    if(userInfo.password === userInfo.checkedPassword){
      axios.post('/api/user/register', {username: userInfo.username, password: userInfo.password})
        .then(res => {
          dispatch(loginUser(res.data.username))
          navigate('/')
        })
        .catch(() => alert('Username already in use.'))
    } else {
      alert('Passwords do not match!')
    }
  }

  return (
    <div className="login-register-page">
      <div className="login-form-container">
        <Link to='/' className='logo-wrap'>
          <img className="xl-logo" src={logoImg} alt="logo"/>
          <h1>DragonMasters Codex</h1>
        </Link>
        <form id="login-form" className="vertical-form" onSubmit={createNewUser}>
          <h2 className='form-header'>Sign Up</h2>
          <div className="form-piece">
            <input
              id='signup-username'
              className='form-input'
              required
              value={userInfo.username}
              onChange={(event) => {
                setUserInfo({...userInfo, username: event.target.value})
              }}
            />
            <label htmlFor='signup-username' className="form-label">Username</label>
          </div>
          <div className="form-piece">
            <input
              id='signup-password'
              className='form-input'
              required
              type='password'
              value={userInfo.password}
              onChange={(event => {
                setUserInfo({...userInfo, password: event.target.value})
              })}
              />
            <label htmlFor='signup-password' className="form-label">Password</label>
          </div>
          <div className="form-piece">
            <input
              id='signup-password-confirm'
              className='form-input'
              required
              type='password'
              onChange={(event) => setUserInfo({...userInfo, checkedPassword: event.target.value})}
            />
            <label htmlFor='signup-password-confirm' className="form-label">Confirm Password</label>
          </div>
          <button className="btn btn-type-1 btn-color-1" type='submit'>Sign up</button>
          <p>Already have an account? <Link className='plaintext-link' to='/login'>Go To Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signup