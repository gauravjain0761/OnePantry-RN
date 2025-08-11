import { configureStore } from '@reduxjs/toolkit'
import actionSlice from './actionSlice'

export const store = configureStore({
  reducer: {actionSlice},
})