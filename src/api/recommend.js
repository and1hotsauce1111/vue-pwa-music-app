import axios from 'axios'
import jsonp from 'common/js/jsonp'
import { ERR_OK, options, commonParams } from './config'
import { formatUrl } from 'common/js/formatUrl'

export async function getRecommend() {
  const url = '/api/cgi-bin/musics.fcg?-=recom14552685588515413'

  const params = Object.assign({}, options, {
    sign: 'zzaepu1h7akmjdgcff15c4441255ee9ef959d8dacccc3f88',
    data: {
      comm: { ct: 24 },
      category: {
        method: 'get_hot_category',
        param: { qq: '' },
        module: 'music.web_category_svr'
      },
      recomPlaylist: {
        method: 'get_hot_recommend',
        param: { async: 1, cmd: 2 },
        module: 'playlist.HotRecommendServer'
      },
      playlist: {
        method: 'get_playlist_by_category',
        param: { id: 8, curPage: 1, size: 40, order: 5, titleid: 8 },
        module: 'playlist.PlayListPlazaServer'
      },
      new_song: {
        module: 'newsong.NewSongServer',
        method: 'get_new_song_info',
        param: { type: 5 }
      },
      new_album: {
        module: 'newalbum.NewAlbumServer',
        method: 'get_new_album_info',
        param: { area: 1, sin: 0, num: 20 }
      },
      new_album_tag: {
        module: 'newalbum.NewAlbumServer',
        method: 'get_new_album_area',
        param: {}
      },
      toplist: {
        module: 'musicToplist.ToplistInfoServer',
        method: 'GetAll',
        param: {}
      },
      focus: {
        module: 'music.musicHall.MusicHallPlatform',
        method: 'GetFocus',
        param: {}
      }
    }
  })

  const newUrl = formatUrl(url, params)

  const { status, data } = await axios.get(newUrl)
  if (status === 200 && data.code === ERR_OK) {
    return data
  }
}

export async function getSongList(disstid) {
  const url = '/cApi/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })

  const option = {
    param: 'jsonpCallback',
    prefix: 'playlistinfoCallback'
  }

  return jsonp(url, data, option)
}
