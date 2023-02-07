import { createSlice } from '@reduxjs/toolkit'
import extraReducer from '../ExtraReducer'
import {
  fetchDeleteOrder,
  fetchMakeOrder,
  getOrdersUser
} from './ActionCreators'

const initialState = {
  data: {},
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
    extraReducer(builder, fetchDeleteOrder, initialState)
  }
})

export const { clearStatusOrder } = orderSlice.actions
export default orderSlice.reducer
