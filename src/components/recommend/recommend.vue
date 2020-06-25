<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="recomPlayList">
      <div>
        <div class="slider-wrapper">
          <slider v-if="recommends.length">
            <div v-for="item in recommends" :key="item.content_id">
              <a href="javascript:;">
                <img @load="bannerImgLoad" :src="item.cover" alt />
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">熱門歌單推薦</h1>
          <ul>
            <li
              class="item"
              v-for="(item, index) in recomPlayList"
              :key="index"
              @click="selectItem(item)"
            >
              <div class="icon">
                <img width="60" height="60" v-lazy="item.cover" alt />
              </div>
              <div class="text">
                <h2 class="name">{{ item.username }}</h2>
                <p class="desc">{{ item.title }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="laoding-container" v-show="!recomPlayList.length">
        <loading />
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapMutations } from 'vuex'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { getRecommend } from 'api/recommend'
import { playlistMixin } from 'common/js/mixin'

export default {
  mixins: [playlistMixin],
  components: {
    Slider,
    Scroll,
    Loading
  },
  data() {
    return {
      recommends: [],
      recomPlayList: []
    }
  },
  created() {
    getRecommend().then(res => {
      this.recommends = res.recomPlaylist.data.v_hot
      this.recomPlayList = res.recomPlaylist.data.v_hot
    })
  },
  methods: {
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.content_id}`
      })
      this.setDisc(item)
    },
    bannerImgLoad() {
      // 避免因為獲取非同步資料時 造成better-scroll計算錯誤
      this.$refs.scroll.refresh()
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : 0
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'

.recommend
  position fixed
  width 100%
  top 5.5rem
  bottom 0
  .recommend-content
    height 100%
    overflow hidden
    .slider-wrapper
      position relative
      width 100%
      overflow hidden
    .recommend-list
      .list-title
        height 4.06rem
        line-height 4.06rem
        text-align center
        font-size $font-size-medium
        color $color-theme
      .item
        display flex
        box-sizing border-box
        align-items center
        padding 0 1.25rem 1.25rem 1.25rem
        .icon
          flex 0 0 3.75rem
          width 4.06rem
          padding-right 1.25rem
        .text
          display flex
          flex-direction column
          justify-content center
          flex 1
          line-height 1.25rem
          overflow hidden
          font-size $font-size-medium
          .name
            margin-bottom 10px
            color $color-text
          .desc
            color $color-text-d
    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>
