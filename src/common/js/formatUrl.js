export function formatUrl(url, params) {
  for (const k in params) {
    let value = params[k] !== undefined ? params[k] : ''

    if (typeof params[k] === 'object') {
      value = JSON.stringify(value)
    }

    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
