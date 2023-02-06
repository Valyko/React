import { createAsyncThunk } from '@reduxjs/toolkit'
import { login } from '../tokenWork/tokenWork'

export const fetchSignIn = createAsyncThunk(
  'signIn/fetchSignIn',
  async function (value, { rejectWithValue, dispatch }) {
    try {
      const respons = await fetch('/api/customers/login', {
        method: 'POST',
        body: JSON.stringify({
          loginOrEmail: value.loginOrEmail,
          password: value.password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!respons.ok) {
        throw new Error('Server Error!')
      }
      const data = await respons.json()
      dispatch(login(data.token))
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
