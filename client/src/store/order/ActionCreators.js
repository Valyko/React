import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchDeleteCart } from '../cart/ActionCreators'

export const fetchMakeOrder = createAsyncThunk(
  'order/fetchMakeOrder',
  async function (values, { rejectWithValue, getState, dispatch }) {
    const stateToken = getState().auth.token
    const customerId = getState().user.data._id

    const { value } = values
    try {
      const respons = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: stateToken
        },
        body: JSON.stringify({
          customerId: customerId,
          email: value.email,
          mobile: value.telephone,
          letterSubject: 'sdfs',
          letterHtml: 'sfedfs',
          status: 'not shipped',
          canceled: false
          // deliveryAddress: {
          //   country: value.country,
          //   city: value.city,
          //   address: value.adress,
          //   postal: value.zipCode
          // }
        })
      })
      if (!respons.ok) {
        throw new Error('Server Error!')
      }
      const data = await respons.json()
      dispatch(fetchDeleteCart())
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const getOrdersUser = createAsyncThunk(
  'order/getOrdersUser',
  async function (_, { rejectWithValue, getState, dispatch }) {
    const stateToken = getState().auth.token
    try {
      const respons = await fetch('/api/orders', {
        method: 'GET',
        headers: {
          Authorization: stateToken
        }
      })
      if (!respons.ok) {
        throw new Error('Server Error!')
      }
      const data = await respons.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchDeleteOrder = createAsyncThunk(
  'order/fetchDeleteOrder',
  async function (id, { rejectWithValue, getState, dispatch }) {
    const stateToken = getState().auth.token
    try {
      const respons = await fetch(`/api/orders/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: stateToken
        }
      })
      if (!respons.ok) {
        throw new Error('Server Error!')
      }
      const data = await respons.json()
      dispatch(getOrdersUser())
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
