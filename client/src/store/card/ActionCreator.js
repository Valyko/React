import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchCard = createAsyncThunk(
  'card/fetchCard',
  async function (itemNo, { rejectWithValue }) {
    try {
      const respons = await fetch(`/api/products/${itemNo}`)
      if (!respons.ok) {
        const data = await respons.json()
        const keys = Object.keys(data)
        throw new Error(data[keys[0]])
      }
      const data = await respons.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
