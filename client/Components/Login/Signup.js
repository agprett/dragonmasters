import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'

import logoImg from '../../images/logo.png'

import { loginUser } from '../../ducks/reducer'

function Signup(props) {
  const navigate = useNavigate()
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
      axios.post('/api/signup', {username: userInfo.username, password: userInfo.password})
        .then(res => {
          props.loginUser(res.data.username)
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
        <form id="login-form" className="vertical-form" onSubmit={createNewUser}>
          <img className="large-logo" src={logoImg} alt="logo"/>
          <h1 className="title-1">DragonMasters</h1>
          <p className="form-header">Create a new account</p>
          <div className="form-piece">
            <label className="form-piece-underlined">
              <input
                className='form-input'
                required
                value={userInfo.username}
                onChange={(event) => {
                  setUserInfo({...userInfo, username: event.target.value})
                }}
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
                onChange={(event => {
                  setUserInfo({...userInfo, password: event.target.value})
                })}
                />
              <span className="form-label">Password</span>
            </label>
          </div>
          <div className="form-piece">
            <label className="form-piece-underlined">
              <input
                className='form-input'
                required
                type='password'
                onChange={(event) => setUserInfo({...userInfo, checkedPassword: event.target.value})}
              />
              <span className="form-label">Confirm Password</span>
            </label>
          </div>
          <button className="btn btn-type-1 btn-color-1" type='submit'>Sign up</button>
          <p>Already have an account? <Link to='/login'>Go To Login</Link></p>
        </form>
        <div className="login-image">Start your next adventure now</div>
      </div>
    </div>
  )
}

const mapStateToProps = state => state

const functions = {loginUser}

export default connect(mapStateToProps, functions)(Signup)