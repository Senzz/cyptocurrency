import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from '../../store'
import { getHuobiSymbols } from '../../apis'

export interface ISymbol {
  pair: string,
  [propName: string]: any
}

export interface SymbolObj {
  [propName: string]: ISymbol
}

export interface SymbolsState {
  symbols: Array<ISymbol>,
  symbolObj: SymbolObj,
  symbolList: Array<string>,
  status: 'idle' | 'loading' | 'failed'
}

const initialState: SymbolsState = {
  symbols: [],
  symbolObj: {},
  symbolList: [],
  status: 'idle',
}

export const getSymbols = createAsyncThunk(
  'symbols/getSymbols',
  async () => {
    const response = await getHuobiSymbols()
    return response.data
  }
)

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSymbols: (state, actions: PayloadAction<Array<ISymbol>>) => {
      state.symbols = actions.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSymbols.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getSymbols.fulfilled, (state, action) => {
        state.status = 'idle'
        const symbols = action.payload.filter((item: any) => item.quote_currency === 'usdt').sort((a: any, b: any) => b?.weight - a?.weight)
        const newSymbols: Array<ISymbol> = []
        const newSymbolObj: any = {}
        const newSymbolsList: SymbolsState["symbolList"] = []
        symbols.forEach((item: any) => {
          const pair = `${item.base_currency.toUpperCase()}/${item.quote_currency.toUpperCase()}`
          item.pair = pair
          newSymbolsList.push(pair)
          newSymbolObj[pair] = item
          newSymbols.push(item)
        })
        state.symbolList = newSymbolsList
        state.symbolObj = newSymbolObj
        state.symbols = newSymbols
      })
  },
})

export const { setSymbols } = counterSlice.actions

export const selectSymbols = (state: AppState) => state.symbols.symbols

export default counterSlice.reducer