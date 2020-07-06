import { ERR_OK } from 'api/config'
import { getLyric, getPlayUrl } from 'api/song'

export default class Song {
  constructor({ musicrid, rid, artist, name, album, albumid, duration, pic }) {
    this.musicrid = musicrid
    this.rid = rid
    this.artist = artist
    this.name = name
    this.album = album
    this.albumid = albumid
    this.duration = duration
    this.pic = pic
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.rid).then(res => {
        if (res.status === 200 && res.data !== '') {
          this.lyric = res.data
          resolve(res)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }

  getPlayUrl() {
    if (this.rid) {
      return new Promise((resolve, reject) => {
        getPlayUrl(this.rid).then(res => {
          if (res.status === 200 && res.data.code === ERR_OK) {
            resolve(res.data.data)
          } else {
            reject(new Error('查無歌曲'))
          }
        })
      })
    }
  }
}

export function createSong(musicData) {
  return new Song({
    musicrid: musicData.musicrid,
    rid: musicData.rid,
    artist: musicData.artist,
    name: musicData.name,
    album: musicData.album,
    albumid: musicData.albumid,
    duration: musicData.duration,
    pic: musicData.pic
  })
}
