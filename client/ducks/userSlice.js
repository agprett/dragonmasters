import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {
    username: ''
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {...initialState},
  reducers: {
    loginUser: (state, action) => {
      state.info = action.payload
    },
    logoutUser: state => {
      state.info = {...initialState}
    }
  }
})

export const {getUser, loginUser, logoutUser} = userSlice.actions

export default userSlice.reducer