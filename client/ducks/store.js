import { configureStore } from '@reduxjs/toolkit'

import userReducer from './userSlice.js'
import encounterReducer from './encounterSlice.js'
import campaignSlice from './campaignSlice.js'
import characterSlice from './characterSlice.js'

export default configureStore({
  reducer: {
    user: userReducer,
    encounter: encounterReducer,
    campaign: campaignSlice,
    character: characterSlice
  }
})