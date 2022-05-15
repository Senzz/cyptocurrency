import styles from './pairList.module.sass'
import { useRouter } from 'next/router'
import { transferPairToUnderscore } from '../../../utils/utils'
import { ISymbol } from '../../../app/futures/symbols/symbolsReducer'

interface Props {
  symbols: ISymbol[],
  pair: string
}

export function PairList ({ symbols, pair }: Props) {
  const router = useRouter()

  function onChangePair (pair: string) {
    router.push({
      pathname: '/trade/[pair]',
      query: { pair: transferPairToUnderscore(pair) },
    })
  }

  return (
    <div className={styles['trade-symbol-list-wrapper']}>
      <div className={styles['trade-symbol-list']}>
        <div className={styles['pairs-head']}>
          <div className={styles['pair']}>交易对</div>
          <div className={styles['last-price']}>最新价</div>
          <div className={styles['change']}>涨跌</div>
        </div>
        <div className={styles['pairs-body']}>
          {
            symbols.map((item) => (
              <div key={item.pair} className={styles['pairs-item']}>
                <div className={styles['pair']}>{item.pair}</div>
                <div className={styles['last-price']}>{item.lastPrice}</div>
                <div className={styles['change']}>{item.change}</div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
    
  )
}