<template>
  <div class="rank" ref="rank">
    <scroll class="toplist" :data="topList" ref="toplist">
      <ul>
        <li class="item" v-for="item in topList" :key="item.id" @click="selectItem(item)">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.pic" />
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index) in item.musicList" :key="song.musicrid">
              <span>{{ index + 1 }}&nbsp;</span>
              <span>{{ song.artist }}-{{ song.album }}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading />
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { getTopList } from 'api/rank'
import { ERR_OK } from 'api/config'
import { playlistMixin } from 'common/js/mixin'
import { mapMutations } from 'vuex'

export default {
  mixins: [playlistMixin],
  components: {
    Scroll,
    Loading
  },
  data() {
    return {
      topList: []
    }
  },
  created() {
    this._getTopList()
  },
  watch: {
    topList() {
      setTimeout(() => {
        this.$Lazyload.lazyLoadHandler()
      }, 20)
    }
  },
  methods: {
    selectItem(item) {
      this.$router.push({
        path: `/rank/${item.id}`
      })
      this.setTopList(item)
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length ? '60px' : 0
      this.$refs.rank.style.bottom = bottom
      this.$refs.toplist.refresh()
    },
    _getTopList() {
      getTopList().then(res => {
        if (res.status === 200 && res.data.code === ERR_OK) {
          this.topList = this._normalizeTopList(res.data.data)
        }
      })
    },
    _normalizeTopList(list) {
      list.forEach(item => {
        item.musicList = item.musicList.slice(0, 3)
      })

      return list
    },
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.rank
  position fixed
  width 100%
  top 88px
  bottom 0
  .toplist
    height 100%
    overflow hidden
    .item
      display flex
      margin 0 20px
      padding-top 20px
      height 100px
      &:last-child
        padding-bottom 20px
      .icon
        flex 0 0 100px
        width 100px
        height 100px
      .songlist
        flex 1
        display flex
        flex-direction column
        justify-content center
        padding 0 20px
        height 100px
        overflow hidden
        background $color-highlight-background
        color $color-text-d
        font-size $font-size-small
        .song
          no-wrap()
          line-height 26px
    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>
