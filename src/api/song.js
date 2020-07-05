import axios from 'axios'

export function getLyric(rid) {
  const url = 'https://api.itooi.cn/kuwo/lrc'

  return axios.get(url, {
    params: {
      id: rid
    }
  })
}

export function getPlayUrl(rid) {
  const url = 'https://api.itooi.cn/kuwo/url'

  const params = {
    id: rid,
    quality: 128,
    isRedirect: 0
  }

  return axios.get(url, {
    params
  })

  // 回傳data 取data[0]
}
