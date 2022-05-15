import { useMount } from 'ahooks'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { PairList } from '../../components/trade/PairList/PariList'
import { useGetSymbols } from '../../hooks/useGetSymbols'
import useWs from '../../hooks/useWs'
import { huobiApi } from '../../utils/apiConfig'

import styles from './trade.module.sass'

interface Props {
  pair: string
}

const Trade: NextPage<Props> = (props) => {
  const { symbols } = useGetSymbols()

  const { send } = useWs(
    huobiApi.wsUrl,
    { 
      onMessage: (data) => {
        console.log(data)
      }
    }
  )

  useMount(() => {
    send({
      sub: "market.overviewv2"
    })
  })

  const { pair } = props

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App2</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles['trade-page']}>
        <PairList symbols={symbols} pair={pair} />
      </div>
    </div>
  )
}


export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      pair: context.params?.pair
    }
  }
}

export default Trade
