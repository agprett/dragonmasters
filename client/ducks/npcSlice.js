import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {
    name: '',
    id: '',
    hitPoints: 0,
    armorClass: 0
  }
}

export const npcSlice = createSlice({
  name: 'npc',
  initialState: {...initialState},
  reducers: {
    addNPC: (state, action) => {
      state.info = action.payload
    },
    clearNPC: state => {
      state.info = {...initialState}
    }
  }
})

export const { addNPC, clearNPC } = npcSlice.actions

export default npcSlice.reducer