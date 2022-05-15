
interface IHuobiApi {
  wsUrl: string,
  getSymbols: string
}

const huobiDomain: string = 'https://www.huobi.com/-/x'

export const huobiApi: IHuobiApi = {
  wsUrl: 'wss://www.huobi.com/-/s/pro/ws',
  getSymbols: `${huobiDomain}/pro/v2/beta/common/symbols`
}

