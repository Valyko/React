import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchSignIn } from '../signIn/ActionCreators'

export const fetchLogin = createAsyncThunk(
  'login/fetchLogin',
  async function (value, { rejectWithValue, dispatch }) {
    try {
      const respons = await fetch('/api/customers', {
        method: 'POST',
        body: JSON.stringify({
          email: value.email,
          password: value.password,
          firstName: value.firstName,
          lastName: value.lastName,
          login: value.login
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!respons.ok) {
        throw new Error('Server Error!')
      }
      const data = await respons.json()
      dispatch(
        fetchSignIn({ loginOrEmail: value.email, password: value.password })
      )
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
