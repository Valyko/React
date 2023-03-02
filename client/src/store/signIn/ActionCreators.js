import { createAsyncThunk } from '@reduxjs/toolkit'
import { login } from '../tokenWork/tokenWork'
import { fetchGetUser } from '../user/ActionCreators'

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
        const data = await respons.json()
        const keys = Object.keys(data)
        throw new Error(data[keys[0]])
      }
      const data = await respons.json()
      dispatch(login(data.token))
      dispatch(fetchGetUser())
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
