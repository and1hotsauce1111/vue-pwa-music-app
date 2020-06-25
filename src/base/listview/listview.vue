<template>
  <scroll
    ref="listview"
    class="listview"
    :data="data"
    :listen-scroll="listenScroll"
    :probe-type="probeType"
    @scroll="scroll"
  >
    <ul>
      <li v-for="(group, index) in data" :key="index" ref="listGroup" class="list-group">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li
            v-for="(item, index) in group.items"
            :key="index"
            class="list-group-item"
            @click="selectSinger(item)"
          >
            <img class="avatar" v-lazy="item.avatar" alt />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="list-shortcut"
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
      @touchend.stop
    >
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          :key="index"
          class="item"
          :class="[item, { current: currentIndex === index }]"
          :data-index="index"
        >{{ item }}</li>
      </ul>
    </div>
    <div v-show="fixedTitle" class="list-fixed" ref="fixed">
      <h1 class="fixed-title">{{ fixedTitle }}</h1>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading />
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dom'
import Loading from 'base/loading/loading'

const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30 // 列表標題高度

export default {
  components: {
    Scroll,
    Loading
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1 // 當前listGroup上限與滾動距離的差
    }
  },
  computed: {
    shortcutList() {
      return this.data.map(group => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) return ''
      return this.data[this.currentIndex]
        ? this.data[this.currentIndex].title
        : ''
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY(newVal, oldVal) {
      const listHeight = this.listHeight
      if (newVal > 0) {
        this.currentIndex = 0
        return false
      }
      for (let i = 0; i < listHeight.length - 1; i++) {
        const item = listHeight[i]
        const nextItem = listHeight[i + 1]
        // !nextItem表示滾到最後一個
        if (-newVal >= item && -newVal < nextItem) {
          this.currentIndex = i
          this.diff = nextItem + newVal
          return false
        }
      }
      this.currentIndex = listHeight.length - 2
    },
    diff(newVal) {
      const fixedTop =
        newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) return false
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  },
  created() {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = [] // 每個分類歌手的列表高度
    this.probeType = 3
  },
  methods: {
    selectSinger(item) {
      this.$emit('selectSinger', item)
    },
    onShortcutTouchStart(e) {
      const anchorIndex = getData(e.target, 'index')
      const fisrtTouch = e.touches[0]
      this.touch.y1 = fisrtTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      const firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      const delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0
      const anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    refresh() {
      this.$refs.listview.refresh()
    },
    _scrollTo(index) {
      if (!index && index !== 0) return false
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'

.listview
  position fixed
  width 100%
  height 100%
  overflow hidden
  background $color-background
  .list-group
    padding-bottom 1.87rem
    .list-group-title
      height 1.87rem
      line-height 1.87rem
      padding-left 1.25rem
      font-size $font-size-small
      color $color-text-l
      background $color-highlight-background
    .list-group-item
      display flex
      align-items center
      padding 1.25rem 0 0 1.87rem
      .avatar
        width 3.12rem
        height 3.12rem
        border-radius 50%
      .name
        margin-left 1.25rem
        color $color-text-l
        font-size $font-size-medium
  .list-shortcut
    position absolute
    z-index 30
    right 0
    top 35%
    transform translateY(-35%)
    width 1.25rem
    padding 1.25rem 0
    border-radius 10px
    text-align center
    background $color-background-d
    font-family Helvetica
    .item
      padding 3px
      line-height 1
      color $color-text-l
      font-size $font-size-small
      &.current
        color $color-theme
  .list-fixed
    position absolute
    top 0
    left 0
    width 100%
    .fixed-title
      height 1.87rem
      line-height 1.87rem
      padding-left 1.25rem
      font-size $font-size-small
      color $color-text-l
      background $color-highlight-background
  .loading-container
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>
