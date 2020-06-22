<template>
  <div class="singer">
    <list-view :data="singerList" :shortCut="shortCut"></list-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import ListView from 'base/listview/listview'
import Singer from 'common/js/singer'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  components: {
    ListView
  },
  data() {
    return {
      singerList: [],
      shortCut: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList()
        .then(res => {
          if (res.code === ERR_OK) {
            console.log(res.data.list)
            this.singerList = this._normalizeSinger(res.data.list)
          }
        })
        .catch(e => {})
    },
    _normalizeSinger(list) {
      const map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }

      list.forEach((list, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singer({
              id: list.Fsinger_mid,
              name: list.Fsinger_name
            })
          )
        }
        const key = list.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(
          new Singer({
            id: list.Fsinger_mid,
            name: list.Fsinger_name
          })
        )
      })

      // 有序排列
      const ret = []
      const hot = []
      for (const k in map) {
        const val = map[k]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
      return hot.concat(ret)
    }
  }
}
</script>

<style lang="stylus" scoped></style>
