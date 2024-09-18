import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {
    name: '',
    id: '',
    player: '',
    hitPoints: 0,
    level: 0,
    armorClass: 0
  }
}

export const characterSlice = createSlice({
  name: 'character',
  initialState: {...initialState},
  reducers: {
    addCharacter: (state, action) => {
      state.info = action.payload
    },
    clearCharacter: state => {
      state.info = {...initialState}
    }
  }
})

export const { addCharacter, clearCharacter } = characterSlice.actions

export default characterSlice.reducer