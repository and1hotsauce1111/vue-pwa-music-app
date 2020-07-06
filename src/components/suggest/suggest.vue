<template>
  <scroll
    ref="suggest"
    class="suggest"
    :data="result"
    :pullup="pullup"
    :beforeScroll="beforeScroll"
    @scrollToEnd="searchMore"
    @beforeScroll="listScroll"
  >
    <ul class="suggest-list">
      <li
        class="suggest-item"
        v-for="(item, index) in result"
        :key="index"
        @click="selectItem(item)"
      >
        <div class="icon">
          <i :class="_getIconClass()"></i>
        </div>
        <div class="name">
          <p class="text" v-html="_getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title />
    </ul>
    <div v-show="!hasMore && result.length === 0" class="no-result-wrapper">
      <no-result title="抱歉，暫無搜尋結果" />
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import NoResult from 'base/no-result/no-result'
import { ERR_OK } from 'api/config'
import { search } from 'api/search'
import { createSong } from 'common/js/song'
import Singer from 'common/js/singer'
import { mapMutations, mapActions } from 'vuex'

const PER_PAGE = 20

export default {
  components: {
    Scroll,
    Loading,
    NoResult
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    searchType: {
      type: String,
      default: '歌曲'
    }
  },
  data() {
    return {
      page: 1,
      pullup: true, // 上拉加載
      beforeScroll: true,
      hasMore: true,
      result: []
    }
  },
  watch: {
    query(newQuery) {
      if (newQuery !== '') {
        this._search(newQuery)
      }
    },
    searchType() {
      this.result = []
    }
  },
  methods: {
    refresh() {
      this.$refs.suggest.refresh()
    },
    listScroll() {
      this.$emit('listScroll')
    },
    searchMore() {
      if (!this.hasMore) return false
      this.page++
      search(this.searchType, this.query, this.page, PER_PAGE).then(res => {
        if (res.status === 200 && res.data.code === ERR_OK) {
          if (this.searchType === '歌曲') {
            this.result = this.result.concat(
              this._normalizeSongs(res.data.data.list)
            )
            this._checkMore(res.data.data)
          }
          if (this.searchType === '歌手') {
            this.result = this.result.concat(
              this._normalizeSinger(res.data.data.artistList)
            )
          }
        }
      })
    },
    selectItem(item) {
      if (this.searchType === '歌手') {
        this.$router.push({
          path: `/search/${item.id}`
        })
        this.setSinger(item)
      }
      // 歌曲
      if (this.searchType === '歌曲') {
        this.$router.push({
          path: `/singer/${item.rid}`
        })
        this.insertSong(item)
      }
      this.$emit('select', item)
    },
    _search() {
      this.page = 1
      this.hasMore = true
      this.$refs.suggest.scrollTo(0, 0)
      search(this.searchType, this.query, this.page, PER_PAGE).then(res => {
        if (res.status === 200 && res.data.code === ERR_OK) {
          if (this.searchType === '歌曲') {
            this.result = this._normalizeSongs(res.data.data.list)
            this._checkMore(res.data.data)
          }
          if (this.searchType === '歌手') {
            this.result = this._normalizeSinger(res.data.data.artistList)
            this._checkMore(res.data.data)
          }
        }
      })
    },
    _normalizeSongs(list) {
      if (!list.length) return false
      const ret = []
      list.forEach(musicData => {
        if (musicData.musicrid && musicData.rid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    _normalizeSinger(list) {
      if (!list.length) return false
      const ret = []
      list.forEach(musicData => {
        if (musicData.id) {
          ret.push(
            new Singer({
              id: musicData.id,
              name: musicData.name,
              pic: musicData.pic300
            })
          )
        }
      })
      return ret
    },
    _checkMore(list) {
      const song = list.list
      if (song.length === 0 || this.result.length + song.length > list.total) {
        this.hasMore = false
      }
    },
    _getIconClass() {
      if (this.searchType === '歌手') {
        return 'icon-mine'
      }
      if (this.searchType === '歌曲') {
        return 'icon-music'
      }
    },
    _getDisplayName(item) {
      if (this.searchType === '歌手') {
        return item.name
      }
      if (this.searchType === '歌曲') {
        return `${item.name}-${item.artist}`
      }
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions(['insertSong'])
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.suggest
  height 100%
  overflow hidden
  .suggest-list
    padding 0 30px
    .suggest-item
      display flex
      align-items center
      padding-bottom 20px
    .icon
      flex 0 0 30px
      width 30px
      [class^='icon-']
        font-size 14px
        color $color-text-d
    .name
      flex 1
      font-size $font-size-medium
      color $color-text-d
      overflow hidden
      .text
        no-wrap()
  .no-result-wrapper
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>
