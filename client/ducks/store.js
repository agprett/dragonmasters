import { configureStore } from '@reduxjs/toolkit'

import userReducer from './userSlice.js'
import encounterReducer from './encounterSlice.js'

export default configureStore({
  reducer: {
    user: userReducer,
    encounter: encounterReducer
  }
})