
   
export async function getHuobiSymbols(): Promise<{ data: Object }> {
  const response = await fetch('/huobi/-/x/pro/v2/beta/common/symbols', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
  })
  const result = await response.json()

  return result
}