import axios from 'axios'
import { commonParams } from './config'

export function getTopList() {
  const url = '/api/www/bang/index/bangList'

  return axios.get(url, {
    params: commonParams
  })
}

export function getMusicList(bangId) {
  const url = '/api/www/bang/bang/musicList'

  const params = Object.assign({}, commonParams, {
    bangId
  })

  return axios.get(url, {
    params
  })
}
