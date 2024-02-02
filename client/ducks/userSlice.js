import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: ''
  },
  reducers: {
    loginUser: (state, action) => {
      state.username = action.payload
    },
    logoutUser: state => {
      state.username = ''
    }
  }
})

export const {getUser, loginUser, logoutUser} = userSlice.actions

export default userSlice.reducer