<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
  </div>
</template>

<script type="text/ecmascript-6">
export default {

}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.m-header
  position: relative
  height: 2.75rem
  text-align: center
  color: $color-theme
  font-size: 0
  .icon
    display: inline-block
    vertical-align: top
    margin-top: 0.37rem
    width: 1.87rem
    height: 2rem
    margin-right: 0.56rem
    bg-image('logo')
    background-size: 1.87rem 2rem
  .text
    display: inline-block
    vertical-align: top
    line-height: 2.75rem
    font-size: $font-size-large
  .mine
    position: absolute
    top: 0
    right: 0
    .icon-mine
      display: block
      padding: 1.33rem
      font-size: $font-size-large-x
      color: $color-theme
</style>
