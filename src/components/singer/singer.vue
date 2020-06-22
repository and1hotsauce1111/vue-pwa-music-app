<template>
  <div class="singer">
    <list-view
      :data="singerList"
      :shortCut="shortCut"
      v-on:selectSinger="selectSinger"
    ></list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import ListView from 'base/listview/listview'
import Singer from 'common/js/singer'
import { mapMutations } from 'vuex'

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
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      // change vuex state
      this.setSinger(singer)
    },
    _getSingerList() {
      getSingerList()
        .then(res => {
          if (res.code === ERR_OK) {
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
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<style lang="stylus" scoped></style>
