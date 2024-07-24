import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {
    id: '',
    name: '',
    description: '',
    length: '',
    world_name: '',
    players: [],
    encounters: []
  }
}

export const campaignSlice = createSlice({
  name: 'campaign',
  initialState: {...initialState},
  reducers: {
    addCampaign: (state, action) => {
      state.info = action.payload
    },
    clearCampaign: state => {
      state.info = {...initialState}
    }
  }
})

export const { addCampaign, clearCampaign } = campaignSlice.actions

export default campaignSlice.reducer