interface wssUrlConfig {
  huobi?: string,
  binance?: string,
  mexc?: string,
  okx?: string
}

export const WSS_URL_CONFIG: wssUrlConfig = {
  huobi: 'wss://www.huobi.com/-/s/pro/ws',
  binance: 'wss://nbstream.binance.com/lvt/stream'
}