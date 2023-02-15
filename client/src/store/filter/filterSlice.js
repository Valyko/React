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
  minPrice: '0',
  maxPrice: '100',
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
      state.minPrice = action.payload.minPrice
      state.maxPrice = action.payload.maxPrice
    },
    setInitialState(state) {
      state = initialState
    },
    setMinPrice(state, action) {
      state.minPrice = action.payload
    },
    setMaxPrice(state, action) {
      state.maxPrice = action.payload
    },
    setResetFilters(state) {
      state.categories = []
      state.color = []
      state.size = []
      state.minPrice = '0'
      state.maxPrice = '100'
      state.sort = { sortName: '', sortProperty: [] }
    }
  },
  extraReducers: {
    [fetchFilterProducts.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [fetchFilterProducts.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.products = action.payload
    },
    [fetchFilterProducts.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    }
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
  setMinPrice,
  setMaxPrice,
  setResetFilters
} = filterSlice.actions

export default filterSlice.reducer
