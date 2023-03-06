import ffmpeg from 'fluent-ffmpeg'


class Ffmepg {
  private instance: ffmpeg.FfmpegCommand | null = null

  init(): void {
    ffmpeg.setFfmpegPath(require('@ffmpeg-installer/ffmpeg').path)
  }

  create(input: string): ffmpeg.FfmpegCommand {
    this.instance = ffmpeg()
      .input(input)
      .nativeFramerate()
      .videoCodec('libx264')
      .audioCodec('copy')
      .format('mp4')
      .outputOptions('-movflags', 'frag_keyframe+empty_moov+faststart')
      .on('progress', function (progress) {
        console.log('Timemark: ' + progress.timemark)
      })
      .on('error', function (err) {
        console.log('An error occurred: ' + err.message)
      })
      .on('end', function () {
        console.log('Processing finished!')
      })
    return this.instance
  }

  kill(): void {
    this.instance?.kill('')
  }
}

export default Ffmepg