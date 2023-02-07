import { createSlice } from '@reduxjs/toolkit'
import extraReducer from '../ExtraReducer'
import {
  fetchAddToCart,
  fetchDeletaCardFromCart,
  fetchDeleteCart,
  fetchDeleteFromCart,
  fetchGetAllFromCart,
  fetchUpdateCart
} from './ActionCreators'

const initialState = {
  data: {},
  status: null,
  error: null
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: builder => {
    extraReducer(builder, fetchGetAllFromCart, initialState)
    extraReducer(builder, fetchAddToCart, initialState)
    extraReducer(builder, fetchDeleteFromCart, initialState)
    extraReducer(builder, fetchDeletaCardFromCart, initialState)
    extraReducer(builder, fetchDeleteCart, initialState)
    extraReducer(builder, fetchUpdateCart, initialState)
  }
})

export default cartSlice.reducer
