<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper">
        <div
          class="progress-btn"
          ref="progressBtn"
          @touchstart.prevent="progressTouchStart"
          @touchmove.prevent="progressTouchMove"
          @touchend.prevent="progressTouchEnd"
        ></div>
      </div>
    </div>
  </div>
</template>

<script type="ecmascript-6">
import { prefixStyle } from 'common/js/dom'

const PROGRESSBAR_BTN_WIDTH = 16
const transform = prefixStyle('transform')

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  watch: {
    percent(newVal) {
      if (newVal >= 0 && !this.touch.initiated) {
        const barWidth =
          this.$refs.progressBar.clientWidth - PROGRESSBAR_BTN_WIDTH
        const offsetWidth = newVal * barWidth
        this._offset(offsetWidth)
      }
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    progressTouchStart(e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchMove(e) {
      if (!this.touch.initiated) return false
      const deltaX = e.touches[0].pageX - this.touch.startX
      // 避免因為拖動太長 超過progress bar width 且 最小width 0
      const offsetWidth = Math.min(
        this.$refs.progressBar.clientWidth - PROGRESSBAR_BTN_WIDTH,
        Math.max(0, this.touch.left + deltaX)
      )
      this._offset(offsetWidth)
    },
    progressTouchEnd(e) {
      this.touch.initiated = false
      this._triggerPercent()
    },
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const offestWidth = e.pageX - rect.left
      this._offset(offestWidth)
      this._triggerPercent()
    },
    _offset(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style[
        transform
      ] = `translate3d(${offsetWidth}px,0,0)`
    },
    _triggerPercent() {
      const barWidth =
        this.$refs.progressBar.clientWidth - PROGRESSBAR_BTN_WIDTH
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChange', percent)
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'

.progress-bar
  height 30px
  .bar-inner
    position relative
    top 13px
    height 4px
    background rgba(0, 0, 0, 0.3)
    .progress
      position absolute
      height 100%
      background $color-theme
    .progress-btn-wrapper
      position absolute
      left -8px
      top -13px
      width 30px
      height 30px
      .progress-btn
        position relative
        top 7px
        left 7px
        box-sizing border-box
        width 16px
        height 16px
        border 3px solid $color-text
        border-radius 50%
        background $color-theme
</style>
