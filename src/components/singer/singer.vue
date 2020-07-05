<template>
  <div class="singer" ref="singer">
    <div class="singer-short_cut" ref="shortcutContainer">
      <ul>
        <!-- eslint-disable -->
        <li v-for="(item, index) in shortcutList" :key="index">
          <span
            :class="{ active: currentIndex === index }"
            ref="shortCuts"
            @click="selectIndex(item, index)"
          >{{ item }}</span>
        </li>
        <!-- eslint-enable -->
      </ul>
    </div>
    <list-view
      :data="singerList"
      :isHide="isHide"
      ref="listview"
      @hideShortCut="hideShortCut"
      @showShortCut="showShortCut"
      @select="selectSinger"
    ></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import ListView from 'base/listview/listview'
import Singer from 'common/js/singer'
import { getAllSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import { mapMutations } from 'vuex'
import { playlistMixin } from 'common/js/mixin'

export default {
  mixins: [playlistMixin],
  components: {
    ListView
  },
  data() {
    return {
      singerList: [],
      currentIndex: 0,
      isHide: true
    }
  },
  computed: {
    shortcutList() {
      // 字母排序表
      const order = []
      for (let i = 65; i < 91; i++) {
        order.push(String.fromCharCode(i))
      }
      order.unshift('熱門')
      order.push('#')
      return order
    }
  },
  created() {
    this._getSingerList()
  },
  mounted() {
    this.shortcutHeight = this.$refs.shortcutContainer.clientHeight
  },
  methods: {
    selectIndex(item, index) {
      item = item === '熱門' ? '' : item
      this.currentIndex = index
      this._getSingerList(item)
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    hideShortCut() {
      this.$refs.shortcutContainer.style.height = 0
    },
    showShortCut() {
      this.$refs.shortcutContainer.style.height = `${this.shortcutHeight}px`
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : 0
      this.$refs.singer.style.bottom = bottom
      this.$refs.listview.refresh()
    },
    _getSingerList(prefix) {
      this.singerList = []
      getAllSingerList(prefix).then(res => {
        if (res.status === 200 && res.data.code === ERR_OK) {
          const list = res.data.data.artistList
          this.singerList = this._noramlizeSingeList(list, prefix)
        }
      })
    },
    _noramlizeSingeList(list, prefix) {
      const ret = [
        {
          title: !prefix ? '熱門' : prefix,
          items: []
        }
      ]
      list.forEach(item => {
        ret[0].items.push(
          new Singer({
            id: item.id,
            name: item.name,
            pic: item.pic
          })
        )
      })

      return ret
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.singer
  position fixed
  top 5.5rem
  bottom 0
  width 100%
  .singer-short_cut
    transition all 0.3s
  .singer-short_cut ul
    display flex
    justify-content flex-start
    align-items center
    flex-wrap wrap
    padding 1rem
    text-align center
    margin-left 5%
    li
      flex 0 0 5%
      span
        display inline-block
        margin 0.25rem
        padding 0.1rem
        text-align center
        width 1.75rem
        height 1.75rem
        line-height 1.75rem
        border-radius 50%
        font-size $font-size-small
        &.active
          background $color-theme
          color $color-background
      &:nth-child(1)
        span
          width 1.75rem
          height 1.75rem
          border-radius 8px
</style>
