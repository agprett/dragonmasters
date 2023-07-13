import { configureStore } from '@reduxjs/toolkit'
import reducerFn from './reducer.js'

export default configureStore({
  reducer: reducerFn
})