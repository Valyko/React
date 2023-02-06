import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSlides = createAsyncThunk(
  'slides/fetchSlides',
  async function (_, { rejectWithValue }) {
    try {
      const respons = await fetch('/api/slides')
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
