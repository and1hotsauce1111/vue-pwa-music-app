import jsonp from 'common/js/jsonp'
import { commonParams } from './config'

export function getHotKey() {
  const url = '/cApi/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1
  })

  const option = {
    param: 'jsonpCallback',
    prefix: 'MusicJsonCallback'
  }

  return jsonp(url, data, option)
}

export function search(query, page, zhida, perpage) {
  const url = '/cApi/soso/fcgi-bin/search_for_qq_cp'

  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage,
    n: perpage,
    remoteplace: 'txt.mqq.all',
    uid: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  const option = {
    param: 'jsonpCallback',
    prefix: 'MusicJsonCallback'
  }

  return jsonp(url, data, option)
}
