import { createSlice } from '@reduxjs/toolkit'
import extraReducer from '../ExtraReducer'
import { fetchGetUser, fetchUpdateUser } from './ActionCreators'

const initialState = {
  data: [],
  status: null,
  statusChangePass: null,
  statusUpdate: null,
  error: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearStatusUpdate: state => {
      state.statusUpdate = null
    },
    clearStatusPass: state => {
      state.statusChangePass = null
    }
  },
  extraReducers: builder => {
    extraReducer(builder, fetchGetUser, initialState)
    extraReducer(builder, fetchUpdateUser, initialState)
  }
})

export const { clearStatusUpdate, clearStatusPass } = userSlice.actions
export default userSlice.reducer
