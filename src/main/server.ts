import http from 'node:http'
import Ffmpeg from './ffmpeg'

class StreamServer {
  private port: number

  constructor(port = 9555) {
    this.port = port
  }

  start(): void {
    const ffmpeg = new Ffmpeg()
    ffmpeg.init()
    const server = http.createServer((request, response) => {
      console.log(request.url)
      ffmpeg.kill()
      const url = new URL(request.url || '', `http://${request.headers.host}`)
      const input = url.searchParams.get('v')
      if (input) {
        ffmpeg.create(input).pipe(response, { end: true })
      }
    })
    server.listen(this.port, () => {
      console.log(`video server listen on ${this.port}`)
    })
  }
}

export default StreamServer
