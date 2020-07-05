<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div class="slider-wrapper">
          <slider ref="slider">
            <div v-for="(item, index) in bannerImg" :key="index">
              <a href="javascript:;">
                <img @load="bannerImgLoad" alt="banner" class="needsclick" :src="item" />
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">熱門歌單推薦</h1>
          <ul>
            <li class="item" v-for="item in discList" :key="item.id" @click="selectItem(item)">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.img" alt="icon" />
              </div>
              <div class="text">
                <h2 class="name">{{ item.name }}</h2>
                <p class="desc">{{ item.uname }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="laoding-container" v-show="!discList.length">
        <loading />
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { ERR_OK } from 'api/config'
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
      bannerImg: [
        `${require('@/common/image/banner/banner01.jpg')}`,
        `${require('@/common/image/banner/banner02.jpg')}`,
        `${require('@/common/image/banner/banner03.jpg')}`,
        `${require('@/common/image/banner/banner04.jpg')}`,
        `${require('@/common/image/banner/banner05.jpg')}`,
        `${require('@/common/image/banner/banner06.jpg')}`
      ],
      discList: []
    }
  },
  created() {
    this._getRecommend()
  },
  methods: {
    selectItem(item) {
      console.log(item)
      this.$router.push({
        path: `/recommend/${item.id}`
      })
      this.setDisc(item)
    },
    bannerImgLoad() {
      // 避免因為獲取非同步資料時 造成better-scroll計算錯誤
      if (!this.checkloaded) {
        this.checkloaded = true
        this.$refs.scroll.refresh()
      }
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : 0
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    _getRecommend() {
      getRecommend().then(res => {
        if (res.status === 200 && res.data.code === ERR_OK) {
          this.discList = res.data.data.data
        }
      })
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  }
}
</script>

<style lang="stylus" scoped>
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
