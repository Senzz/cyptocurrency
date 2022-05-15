import { useMount } from "ahooks"
import { getSymbols, selectSymbols } from "../app/futures/symbols/symbolsReducer"
import { useAppDispatch, useAppSelector } from "../app/hooks"

export const useGetSymbols = () => {
  const dispatch = useAppDispatch()
  const symbols = useAppSelector(selectSymbols)
  useMount(() => {
    dispatch(getSymbols())
  })

  return { symbols }
}