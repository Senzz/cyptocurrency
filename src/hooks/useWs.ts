import { useMount } from "ahooks"
import { useCallback, useRef } from "react"
import WsClient from "../utils/wsClient"

type UseWs = (
  url: string,
  options?: {
    onMessage?: (event: WebSocketEventMap['message']) => void
  }) => {
    send: (message: any) => void
  }
  
const useWs: UseWs = (url: string, { onMessage } = {}) => {
  const wsClientRef = useRef<WsClient | null>(null)
  
  useMount(() => {
    wsClientRef.current = new WsClient({ url, onMessage })
  })

  const send = useCallback((msgData: any) => {
    wsClientRef?.current?.send(msgData)
  }, [wsClientRef])

  return { send }
}

export default useWs