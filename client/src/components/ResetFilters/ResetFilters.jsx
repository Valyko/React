import React from 'react'
import { useDispatch } from 'react-redux'
import { setResetFilters } from '../../store/filter/filterSlice'
import Button from '../Button'

const ResetFilters = ({ className }) => {
  const dispatch = useDispatch()

  const resetFilters = () => {
    dispatch(setResetFilters())
  }
  return (
    <Button text='Rest Filters' onClick={resetFilters} className={className} />
  )
}

export default ResetFilters
