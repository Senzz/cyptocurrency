
export const transferPairToUnderscore = (pair: string): string => {
  const [symbol, quoteCurrency] = pair.split('/')
  return `${symbol}_${quoteCurrency}`
}
