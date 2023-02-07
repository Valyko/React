const extraReducer = (builder, thunk, state) => {
  builder.addCase(thunk.pending, state => {
    state.status = 'loading'
    state.error = null
  })
  builder.addCase(thunk.fulfilled, (state, action) => {
    state.status = 'resolved'
    state.cart = action.payload
    state.error = null
  })
  builder.addCase(thunk.rejected, (state, action) => {
    state.status = 'rejected'
    state.error = action.payload
  })
}

export default extraReducer
