import { createSlice } from '@reduxjs/toolkit'
import { fetchFilterProducts } from './ActionCreators'

const initialState = {
  startPage: 1,
  perPage: 6,
  totalPage: 0,
  products: [],
  status: null,
  error: null,
  categories: [],
  color: [],
  size: [],
  sort: { sortName: '', sortProperty: [] }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    settotalPage(state, action) {
      state.totalPage = action.payload
    },
    setperPage(state, action) {
      state.perPage = action.payload
    },
    setstartPage(state, action) {
      state.startPage = action.payload
    },
    setCategory(state, action) {
      state.categories = action.payload
    },
    setColor(state, action) {
      state.color = action.payload
    },
    setSize(state, action) {
      state.size = action.payload
    },
    setSortType(state, action) {
      state.sort = action.payload
    },
    setFilters(state, action) {
      state.startPage = action.payload.startPage
      state.perPage = action.payload.perPage
      state.categories = action.payload.categories
        ? action.payload.categories
        : []
      state.color = action.payload.color ? action.payload.color : []
      state.size = action.payload.size ? action.payload.size : []
      state.sort = action.payload.sort ?? []
    },
    setInitialState(state) {
      state = initialState
    },
    setResetFilters(state) {
      state.categories = []
      state.color = []
      state.size = []
      state.sort = { sortName: '', sortProperty: [] }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFilterProducts.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchFilterProducts.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.products = action.payload
      })
      .addCase(fetchFilterProducts.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload
      })
  }
})

export const {
  setCategory,
  setColor,
  setSize,
  setSortType,
  setstartPage,
  settotalPage,
  setperPage,
  setFilters,
  setInitialState,
  setResetFilters
} = filterSlice.actions

export default filterSlice.reducer
