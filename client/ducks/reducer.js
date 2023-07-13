const initialState = {
  username: '',
  encounterData: {name: '', shortDesc: '', desc: '', location: '', terrain: '', rewards: '', monsters: {}, players: []}
}

const GET_USER = 'GET_USER'
const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

const GET_ENCOUNTER = 'GET_ENCOUNTER'
const ADD_ENCOUNTER = 'ADD_ENCOUNTER'
const CLEAR_ENCOUNTER = 'CLEAR_ENCOUNTER'

export const getUser = (username) => {
  return {
    type: GET_USER,
    payload: username
  }
}

export const loginUser = (username) => {
  return {
    type: LOGIN_USER,
    payload: username
  }
}

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
    payload: ''
  }
}

export const getEncounter = (encounterData) => {
  return {
    type: GET_ENCOUNTER,
    payload: encounterData
  }
}

export const addEncounter = (encounterInfo) => {
  return {
    type: ADD_ENCOUNTER,
    payload: encounterInfo
  }
}

export const clearEncounter = () => {
  return {
    type: CLEAR_ENCOUNTER,
    payload: {name: '', shortDesc: '', desc: '', location: '', terrain: '', rewards: '', monsters: {}, players: []}
  }
}

const reducerFn = (state = initialState, action) => {
  switch(action.type){
    case GET_USER:
      return {...state, ...action.payload}
    case LOGIN_USER:
      return {...state, username: action.payload}
    case LOGOUT_USER:
      return {...state, username: action.payload}
    case GET_ENCOUNTER:
      return {...state, ...action.payload}
    case ADD_ENCOUNTER:
      return {...state, encounterData: action.payload}
    case CLEAR_ENCOUNTER:
      return {...state, encounterData: action.payload}
    default:
      return state
  }
}

export default reducerFn