import { createSlice } from '@reduxjs/toolkit'
import extraReducer from '../ExtraReducer'
import { fetchSlides } from './ActionCreators'

const initialState = {
  data: [],
  status: null,
  error: null
}

export const slidesSlice = createSlice({
  name: 'slides',
  initialState,
  extraReducers: builder => {
    extraReducer(builder, fetchSlides, initialState)
  }
})

export default slidesSlice.reducer
