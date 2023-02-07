import { createSlice } from '@reduxjs/toolkit'
import extraReducer from '../ExtraReducer'
import { fetchProducts } from './ActionCreators'

const initialState = {
  data: [],
  status: null,
  error: null
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: builder => {
    extraReducer(builder, fetchProducts, initialState)
  }
})

export default productSlice.reducer
