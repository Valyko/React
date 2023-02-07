import { createSlice } from '@reduxjs/toolkit'
import extraReducer from '../ExtraReducer'
import { fetchLogin } from './ActionCreators'

const initialState = {
  data: '',
  status: null,
  error: null
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  extraReducers: builder => {
    extraReducer(builder, fetchLogin, initialState)
  }
})

export default loginSlice.reducer
