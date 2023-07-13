import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'

import { loginUser } from '../../ducks/reducer'
import './Signup.css'


function Signup(props) {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({username: '', password: '', checkedPassword: ''})
  const [checkPasswordStuff, setCheckPasswordStuff] = useState({text: '', inputStyle: '', textStyle: ''})

  const checkPassword = (event) => {
    setUserInfo({...userInfo, checkedPassword: event.target.value})

    if (userInfo.password === '') {
      setCheckPasswordStuff({text: '', inputStyle: '', textStyle: ''})
    } else if(event.target.value === userInfo.password){
      setCheckPasswordStuff({text: '', inputStyle: 'match-password-input', textStyle: ''})
    } else {
      setCheckPasswordStuff({text: 'Inputs do not match', inputStyle: 'no-match-password-input', textStyle: 'no-match-password-text'})
    }
  }

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
    <section>
      <form
        onSubmit={createNewUser}
      >
        <input
          placeholder='Username'
          value={userInfo.username}
          required
          onChange={(event) => {
            setUserInfo({...userInfo, username: event.target.value})
          }}
        />
        <input
          placeholder='Password'
          type='password'
          value={userInfo.password}
          required
          onChange={(event => {
            setUserInfo({...userInfo, password: event.target.value})
          })}
        />
        <input
          className={checkPasswordStuff.inputStyle}
          placeholder='Confirm Password'
          type='password'
          onChange={checkPassword}
        />
        <p className={checkPasswordStuff.textStyle}>{checkPasswordStuff.text}</p>
        <button type='submit'>Sign up</button>
      </form>
      <p>Already have an account?</p>
      <button><Link to='/login'>Go To Login</Link></button>
      <button><Link to='/'>Cancel</Link></button>
    </section>
  )
}

const mapStateToProps = state => state

const functions = {loginUser}

export default connect(mapStateToProps, functions)(Signup)