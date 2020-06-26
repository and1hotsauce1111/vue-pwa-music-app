import jsonp from 'common/js/jsonp'
import { commonParams } from './config'

export function getTopList() {
  const url = '/cApi/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    playform: 'h5',
    needNewCode: 1
  })

  const option = {
    param: 'jsonpCallback',
    prefix: 'MusicJsonCallback'
  }

  return jsonp(url, data, option)
}

export function getMusicList(topid) {
  const url = '/cApi/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    playform: 'h5',
    needNewCode: 1,
    page: 'detail',
    tpl: 3,
    type: 'top',
    topid
  })

  const option = {
    param: 'jsonpCallback',
    prefix: 'MusicJsonCallback'
  }

  return jsonp(url, data, option)
}
