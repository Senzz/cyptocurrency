import Pako from "pako"

interface IWsConfig {
  url?: string,
  onMessage?: (event: WebSocketEventMap['message']) => void
}

class WsClient {
  private wsUrl: string | undefined
  private wss!: WebSocket
  private sendQueue: Array<any> = []
  private poolTime: number = 5000
  private poolTimer: NodeJS.Timeout | null = null
  lockReconnect: Boolean = false
  reconnectTimer: NodeJS.Timeout | null = null
  private onMessage: (event: WebSocketEventMap['message']) => void

  constructor ({ url, onMessage = () => {} }: IWsConfig = {}) {
    this.wsUrl = url
    this.onMessage = onMessage
    this.createWs()
  }

  createWs = () => {
    if (!this.wsUrl) {
      console.error('please print ws url')
      return
    }
    if (typeof window !== "undefined") {
      this.wss = new WebSocket(this.wsUrl)
      this.initOnMethod()
    }
  }

  initOnMethod = () => {
    if (this.wss) {
      this.wss.onopen = this.onOpen

      this.wss.onmessage = this.onMsg

      this.wss.onclose = this.onClose
      this.wss.onerror = this.onError
    }
  }

  pool = () => {
    this.poolTimer && clearTimeout(this.poolTimer)
    this.poolTimer = setTimeout(() => {
      if (this.wss && this.wss.readyState === WebSocket.OPEN) {
        this.send({
          pong: Date.now()
        })
      }
      this.pool()
    }, this.poolTime)
  }

  onOpen = () => {
    console.log("ws opened")
    this.pool()
    if (this.sendQueue.length) {
      this.sendQueue.forEach(data => this.send(data))
    }
  }

  send = (data: any) => {
    if (this.wss && this.wss.readyState === WebSocket.OPEN) {
      this.wss.send(JSON.stringify(data))
    } else {
      this.sendQueue.push(data)
    }
  }

  onMsg = (msg: MessageEvent) => {
    if (msg.data instanceof Blob) {
      const blob = msg.data
      const fileRender = new FileReader()

      fileRender.onload = (e: any) => {
        const ploydata = new window.Uint8Array(e.target.result)
        const data = JSON.parse(Pako.inflate(ploydata, { to: 'string' }))
        this.onMessage(data)
      }
      fileRender.readAsArrayBuffer(blob)
      // 
      // console.log(data)
    } else {
      this.onMessage(msg.data)
    }
  }

  onClose = () => {
    console.log("ws closed")
    this.reconnect()
  }

  onError = () => {
    console.log("ws error")
    this.reconnect()
  }

  reconnect () {
    if (this.lockReconnect) return

    this.lockReconnect = true

    this.reconnectTimer && clearTimeout(this.reconnectTimer)
    this.reconnectTimer = setTimeout(() => {
      this.createWs()
      console.log('ws reconnect..')
      this.lockReconnect = false
    }, 4000)
  }
}

export default WsClient