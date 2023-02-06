import { createSlice } from '@reduxjs/toolkit'
import extraReducer from '../ExtraReducer'
import { fetchSignIn } from './ActionCreators'

const initialState = {
  data: '',
  status: null,
  error: null
}

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    clearStatus: state => {
      state.status = null
      state.signIn = ''
    }
  },
  extraReducers: builder => {
    extraReducer(builder, fetchSignIn, initialState)
  }
})

export const { clearStatus } = signInSlice.actions

export default signInSlice.reducer
