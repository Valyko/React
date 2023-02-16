import { createSlice } from '@reduxjs/toolkit'
import { fetchCard } from './ActionCreator'
import extraReducer from '../ExtraReducer'

const initialState = {
  data: {},
  loading: false,
  error: ''
}

export const CardSlice = createSlice({
  name: 'card',
  initialState,
  extraReducers: builder => {
    extraReducer(builder, fetchCard, initialState)
  }
})

export default CardSlice.reducer
