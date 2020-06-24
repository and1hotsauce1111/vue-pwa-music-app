// import { commonParams } from './config'
import axios from 'axios'

export function getLyric(mid) {
  const url = `/qqapi/music/lyric?songmid=${mid}`
  return axios
    .get(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(e => {
      console.log(e)
    })
}
