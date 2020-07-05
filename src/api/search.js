import axios from 'axios'
import { commonParams } from './config'

export function getHotKey() {
  const url = '/api/www/search/searchKey'

  const params = Object.assign({}, commonParams, {
    key: ''
  })

  return axios.get(url, {
    params
  })
}

export function search(type, key, pn, rn) {
  let url = type !== '' ? '' : '/api/search/searchArtistBykeyWord'
  if (type === '歌曲') {
    url = '/api/www/search/searchMusicBykeyWord'
  }
  if (type === '歌手') {
    url = '/api/www/search/searchArtistBykeyWord'
  }

  const params = Object.assign({}, commonParams, {
    key,
    pn,
    rn
  })

  return axios.get(url, {
    params
  })
}
