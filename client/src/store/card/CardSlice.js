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
    // builder
    //   .addCase(fetchCard.fulfilled, (state, action) => {
    //     state.isCardLoading = false
    //     state.cardError = ''
    //     state.card = action.payload
    //   })
    //   .addCase(fetchCard.pending, state => {
    //     state.isCardLoading = true
    //   })
    //   .addCase(fetchCard.rejected, (state, action) => {
    //     state.isCardLoading = false
    //     state.cardError = action.payload
    //   })
  }
})

export default CardSlice.reducer
