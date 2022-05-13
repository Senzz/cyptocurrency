import Pako from "pako"

interface IWsConfig {
  url: string
}

class WsClient {
  private wsUrl: string
  private wss!: WebSocket
  lockReconnect: Boolean = false
  reconnectTimer: NodeJS.Timeout | null = null
  constructor ({ url }: IWsConfig) {
    this.wsUrl = url
    this.createWs()

    this.initOnMethod()
  }

  createWs = () => {
    this.wss = new WebSocket(this.wsUrl)
  }

  initOnMethod = () => {
    this.wss.onopen = this.onOpen

    this.wss.onmessage = this.onMsg

    this.wss.onclose = this.onClose
    this.wss.onerror = this.onError
  }

  onOpen = () => {
    console.log("ws opened")
  }

  send = (data: Object) => {
    this.wss.send(JSON.stringify(data))
  }

  onMsg = (msg: MessageEvent) => {
    if (msg.data instanceof Blob) {
      const blob = msg.data
      const fileRender = new FileReader()

      fileRender.onload = (e: any) => {
        const ploydata = new window.Uint8Array(e.target.result)
        const data = JSON.parse(Pako.inflate(ploydata, { to: 'string' }))
        console.log(data)
      }
      fileRender.readAsArrayBuffer(blob)
      // 
      // console.log(data)
    } else {
      console.log(msg.data)
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
      this.lockReconnect = false
    }, 4000)
  }
}

export default WsClient