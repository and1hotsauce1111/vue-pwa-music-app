// import axios from 'axios'
import jsonp from 'common/js/jsonp'
import { commonParams } from './config'
// import { formatUrl } from 'common/js/formatUrl'

// export async function getHotSingerList() {
//   const url = '/api/musics.fcg?-=getUCGI9770693717910748'
//   const params = Object.assign({}, options, {
//     sign: 'zzamjxzs90npsv2f3fef04bda3a286eeb40136f6b80f4a',
//     data: {
//       comm: { ct: 24, cv: 0 },
//       singerList: {
//         module: 'Music.SingerListServer',
//         method: 'get_singer_list',
//         param: { area: -100, sex: -100, genre: -100, index: -100, sin: 0, cur_page: 1 }
//       }
//     }
//   })

//   const newUrl = formatUrl(url, params)
//   const { status, data } = await axios.get(newUrl)

//   if (status === 200 && data.code === ERR_OK) {
//     return data
//   }
// }

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  return jsonp(url, data, {
    param: 'jsonpCallback'
  })
}

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 10,
    songstatus: 1,
    singermid: singerId
  })

  return jsonp(url, data, {
    param: 'jsonpCallback'
  })
}
