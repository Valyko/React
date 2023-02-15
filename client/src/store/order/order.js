import { createSlice } from '@reduxjs/toolkit'
import extraReducer from '../ExtraReducer'
import {
  fetchDeleteOrder,
  fetchMakeOrder,
  getOrdersUser
} from './ActionCreators'

const initialState = {
  data: [],
  status: null,
  error: null
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearStatusOrder: state => {
      state.status = null
    }
  },
  extraReducers: builder => {
    extraReducer(builder, fetchMakeOrder, initialState)
    extraReducer(builder, getOrdersUser, initialState)
    builder.addCase(fetchDeleteOrder.pending, state => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(fetchDeleteOrder.fulfilled, state => {
      state.status = 'resolved'
      state.error = null
    })
    builder.addCase(fetchDeleteOrder.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    })
  }
})

export const { clearStatusOrder } = orderSlice.actions
export default orderSlice.reducer
