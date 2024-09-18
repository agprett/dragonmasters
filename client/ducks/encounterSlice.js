import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    players: [],
    npcs: []
  }
}

export const encounterSlice = createSlice({
  name: 'encounter',
  initialState: {...initialState},
  reducers: {
    addEncounter: (state, action) => {
      state.info = action.payload
    },
    clearEncounter: state => {
      state.info = {...initialState}
    }
  }
})

export const { addEncounter, clearEncounter } = encounterSlice.actions

export default encounterSlice.reducer