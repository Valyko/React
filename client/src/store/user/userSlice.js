import { createSlice } from '@reduxjs/toolkit'
import extraReducer from '../ExtraReducer'
import {
  fetchChangePassword,
  fetchGetUser,
  fetchUpdateUser
} from './ActionCreators'

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

    // builder
    // .addCase()
  }

  // [fetchChangePassword.pending]: state => {
  //   state.statusChangePass = 'loading'
  //   state.error = null
  // },
  // [fetchChangePassword.fulfilled]: (state, action) => {
  //   state.statusChangePass = 'resolved'
  //   state.info = action.payload
  // },
  // [fetchChangePassword.rejected]: (state, action) => {
  //   state.statusChangePass = 'rejected'
  //   state.error = action.payload
  // }
})

export const { clearStatusUpdate, clearStatusPass } = userSlice.actions
export default userSlice.reducer
