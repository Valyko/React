import { createSlice } from '@reduxjs/toolkit'
import extraReducer from '../ExtraReducer'
import {
  fetchWishlist,
  addToWishlist,
  deleteItemFromWishlist,
  fetchUpdateWishlist
} from './ActionCreator'

const initialState = {
  data: [],
  loading: false,
  error: ''
}

export const WishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  extraReducers: builder => {
    extraReducer(builder, fetchWishlist, initialState)
    extraReducer(builder, addToWishlist, initialState)
    extraReducer(builder, deleteItemFromWishlist, initialState)
    extraReducer(builder, fetchUpdateWishlist, initialState)
  }
})

export default WishlistSlice.reducer
