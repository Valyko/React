import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchFilterProducts = createAsyncThunk(
  'filters/fetchFilterProducts',
  async function (filtersData, { rejectWithValue }) {
    const {
      categoryFilter,
      colorFilter,
      sizeFilter,
      startPage,
      perPage,
      sortFilter,
      minPrice,
      maxPrice
    } = filtersData

    try {
      const respons = await fetch(
        `/api/products/filter?startPage=${startPage}&perPage=${perPage}${categoryFilter}${colorFilter}${sizeFilter}${sortFilter}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      )
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
