import { createSlice } from '@reduxjs/toolkit'
import extraReducer from '../ExtraReducer'
import { searchFor } from './ActionCreator'

const initialState = {
  data: [],
  loading: false,
  error: ''
}

export const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearch: state => {
      state.data = []
      state.loading = false
      state.error = ''
    }
  },
  extraReducers: builder => {
    extraReducer(builder, searchFor, initialState)
  }
})
export const { clearSearch } = SearchSlice.actions
export default SearchSlice.reducer
