<template>
  <scroll
    class="list-view"
    ref="listview"
    :data="data"
    :listen-scroll="listenScroll"
    :probe-type="probeType"
    @scroll="scroll"
  >
    <div class="list-group" ref="listGroup">
      <h2 class="list-group-title">{{ title }}</h2>
      <ul>
        <li
          class="list-group-item"
          v-for="(item, index) in singers"
          :key="index"
          @click="selectItem(item)"
        >
          <img class="avatar" v-lazy="item.avatar" />
          <span class="name">{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div v-show="data.length === 0" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

const TITLE_HEIGHT = 152

export default {
  components: {
    Scroll,
    Loading
  },
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 是否傳遞emit事件
    isHide: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      scrollY: -1
    }
  },
  computed: {
    title() {
      return this.data.length !== 0 ? this.data[0].title : ''
    },
    singers() {
      return this.data.length !== 0 ? this.data[0].items : []
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data.length !== 0 ? this.data[0].title : ''
    }
  },
  watch: {
    data() {
      setTimeout(() => {}, 20)
    },
    scrollY(newY) {
      if (this.isHide) {
        if (-newY >= TITLE_HEIGHT) {
          this.$emit('hideShortCut')
        } else if (-newY <= TITLE_HEIGHT) {
          this.$emit('showShortCut')
        }
      }
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    refresh() {
      this.$refs.listview.refresh()
    },
    scroll(pos) {
      this.scrollY = pos.y
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.list-view
  position relative
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
        width 3rem
        height 3rem
        border-radius 50%
      .name
        margin-left 1.25rem
        color $color-text-l
        font-size $font-size-medium
    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>
