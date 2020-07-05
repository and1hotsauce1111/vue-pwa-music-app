<template>
  <div class="search">
    <switches :switches="switches" @switch="selectSearchType" :currentIndex="currentIndex" />
    <div class="search-box-wrapper">
      <search-box ref="searchBox" v-on:query="onQueryChange" :clearQuery="clearQuery"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query" ref="shortcutWrapper">
      <scroll :refreshDelay="refreshDelay" class="shortcut" :data="shortcut" ref="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">熱門搜尋</h1>
            <ul>
              <li class="item" v-for="(item, index) in hotKey" :key="index" @click="addQuery(item)">
                <span>{{ item }}</span>
              </li>
            </ul>
            <loading v-show="!hotKey.length" />
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索歷史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list :searches="searchHistory" @select="addQuery" @delete="deleteSearchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest
        :query="query"
        :searchType="searchType"
        @listScroll="blurInput"
        @select="saveSearch"
        :clearSuggest="clearSuggest"
        ref="suggest"
      />
    </div>
    <confirm ref="confirm" text="是否清空所有搜索歷史" confirmBtnText="清空" @confirm="clearSearchHistory" />
    <router-view></router-view>
  </div>
</template>

<script>
import Switches from 'base/switches/switches'
import Suggest from 'components/suggest/suggest'
import SearchBox from 'base/search-box/search-box'
import SearchList from 'base/search-list/search-list'
import Confirm from 'base/confirm/confirm'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { getHotKey } from 'api/search'
import { ERR_OK } from 'api/config'
import { mapActions } from 'vuex'
import { playlistMixin, searchMixin } from 'common/js/mixin'

export default {
  mixins: [playlistMixin, searchMixin],
  components: {
    Switches,
    SearchBox,
    Suggest,
    SearchList,
    Confirm,
    Scroll,
    Loading
  },
  data() {
    return {
      hotKey: [],
      switches: [{ name: '歌曲' }, { name: '歌手' }],
      currentIndex: 0,
      searchType: '歌曲',
      clearQuery: false
    }
  },
  computed: {
    shortcut() {
      return this.hotKey.concat(this.searchHistory)
    }
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  },
  created() {
    this._getHotKey()
  },
  methods: {
    selectSearchType(index) {
      this.currentIndex = index
      this.searchType = this.switches[index].name
      this.clearQuery = !this.clearQuery
    },
    clear() {
      this.clearSuggest = true
    },
    showConfirm() {
      this.$refs.confirm.show()
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : 0
      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.shortcut.refresh()
      this.$refs.searchResult.style.bottom = bottom
      this.$refs.suggest.refresh()
    },
    _getHotKey() {
      getHotKey().then(res => {
        if (res.status === 200 && res.data.code === ERR_OK) {
          this.hotKey = res.data.data
        }
      })
    },
    ...mapActions(['clearSearchHistory'])
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.search
  margin-top 0.5rem
  .search-box-wrapper
    margin 1.25rem
  .shortcut-wrapper
    position fixed
    top 13rem
    bottom 0
    width 100%
    .shortcut
      height 100%
      overflow hidden
      .hot-key
        margin 0 1.25rem 1.25rem 1.25rem
        .title
          margin-bottom 1.25rem
          font-size $font-size-medium
          color $color-text-l
        .item
          display inline-block
          padding 0.3rem 0.6rem
          margin 0 1.25rem 0.6rem 0
          border-radius 6px
          background $color-highlight-background
          font-size $font-size-medium
          color $color-text-d
      .search-history
        position relative
        margin 0 1.25rem
        .title
          display flex
          align-items center
          height 2.5rem
          font-size $font-size-medium
          color $color-text-l
          .text
            flex 1
          .clear
            extend-click()
            .icon-clear
              font-size $font-size-medium
              color $color-text-d
  .search-result
    position fixed
    width 100%
    top 13rem
    bottom 0
  .loading-container
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
</style>
