import axios from 'axios'
import { getLyric } from 'api/song'

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res, err) => {
        if (res.code === '0') {
          this.lyric = res.data.lyric
          resolve(this.lyric)
        } else {
          reject(err)
        }
      })
    })
  }
}

export async function createSong(musicData) {
  const url = `/qqapi/music/song?songmid=${musicData.songmid}&guid=126548448`
  let playUrl = ''
  const {
    status,
    data: { data, code }
  } = await axios.get(url)
  if (status === 200 && code === '0') {
    playUrl = data.musicUrl
  }

  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: playUrl
  })
}

function filterSinger(singer) {
  const ret = []
  if (!singer) return ''
  singer.forEach(singer => {
    ret.push(singer.name)
  })
  return ret.join('/')
}
