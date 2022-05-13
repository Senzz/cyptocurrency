import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import symbolsSlice from './futures/symbols/symbolsReducer'

export function makeStore () {
  return configureStore({
    reducer: {
      symbols: symbolsSlice
    }
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store