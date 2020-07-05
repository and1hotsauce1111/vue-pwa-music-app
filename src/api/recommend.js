import axios from 'axios'
import { commonParams } from './config'

export function getRecommend() {
  const url = '/api/pc/classify/playlist/getRcmPlayList'

  return axios.get(url, {
    params: commonParams
  })
}

export function getSongList(pid) {
  const url = '/api/www/playlist/playListInfo'

  const data = Object.assign({}, commonParams, {
    pid,
    reqId: 'edfd4e30-bb75-11ea-9a13-1900244dcd2e'
  })

  return axios.get(url, {
    params: data
  })
}
