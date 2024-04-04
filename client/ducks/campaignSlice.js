import { createSlice } from "@reduxjs/toolkit";

export const campaignSlice = createSlice({
  name: 'campaign',
  initialState: {
    info: {
      id: '',
      name: '',
      description: '',
      length: '',
      world_name: '',
      players: [],
      encounters: []
    }
  },
  reducers: {
    addCampaign: (state, action) => {
      state.info = action.payload
    },
    clearCampaign: state => {
      state.info = {
        name: '',
        description: '',
        length: '',
        world_name: '',
        players: [],
        encounters: []
      }
    }
  }
})

export const { addCampaign, clearCampaign } = campaignSlice.actions

export default campaignSlice.reducer