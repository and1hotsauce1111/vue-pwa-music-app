import axios from 'axios'
import { commonParams } from './config'

export function getAllSingerList(prefix = '') {
  const url = '/api/www/artist/artistInfo'

  const singerParams = Object.assign({}, commonParams, {
    category: 0,
    rn: 30,
    prefix: encodeURIComponent(prefix)
  })

  return axios.get(url, {
    params: singerParams
  })
}

export function getSingerDetail(artistid) {
  const url = '/api/www/artist/artistMusic'

  const params = Object.assign({}, commonParams, {
    artistid
  })

  return axios.get(url, {
    params
  })
}
