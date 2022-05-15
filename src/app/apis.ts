import { huobiApi } from "../utils/apiConfig"

   
export async function getHuobiSymbols(): Promise<{ data: Array<Object> }> {
  const response = await fetch(huobiApi.getSymbols, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
  })
  const result = await response.json()

  return result
}