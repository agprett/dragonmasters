import { createSlice } from "@reduxjs/toolkit";

export const encounterSlice = createSlice({
  name: 'encounter',
  initialState: {
    info: {
      name: '',
      id: '',
      shortDesc: '',
      desc: '',
      location: '',
      terrain: '',
      rewards: '',
      campaign_id: '',
      campaignName: '',
      monsters: {},
      players: []
    }
  },
  reducers: {
    addEncounter: (state, action) => {
      state.info = action.payload
    },
    clearEncounter: state => {
      state.info = {name: '', shortDesc: '', desc: '', location: '', terrain: '', rewards: '', monsters: {}, players: []}
    }
  }
})

export const { addEncounter, clearEncounter } = encounterSlice.actions

export default encounterSlice.reducer