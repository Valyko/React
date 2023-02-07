import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchGetUser = createAsyncThunk(
  'user/fetchGetUser',
  async function (value, { rejectWithValue, dispatch, getState }) {
    const stateToken = getState().auth.token
    try {
      const respons = await fetch('/api/customers/customer', {
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

export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  async function (value, { rejectWithValue, getState }) {
    const stateToken = getState().auth.token
    try {
      const respons = await fetch('/api/customers', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: stateToken
        },
        body: JSON.stringify(value)
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

export const fetchChangePassword = createAsyncThunk(
  'user/fetchChangePassword',
  async function (value, { rejectWithValue, getState }) {
    const stateToken = getState().auth.token
    try {
      const respons = await fetch('/api/customers/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: stateToken
        },
        body: JSON.stringify(value)
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
