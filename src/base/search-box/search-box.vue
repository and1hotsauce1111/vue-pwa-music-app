<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" type="text" class="box" :placeholder="placeholder" />
    <i class="icon-dismiss" @click="clear"></i>
  </div>
</template>

<script>
import { debounce } from 'common/js/utils'

export default {
  props: {
    placeholder: {
      type: String,
      default: '搜尋歌曲、歌手'
    },
    clearQuery: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      query: ''
    }
  },
  created() {
    this.$watch(
      'query',
      debounce(newQuery => {
        this.$emit('query', newQuery)
      }, 200)
    )
  },
  watch: {
    clearQuery() {
      this.query = ''
    }
  },
  methods: {
    clear() {
      this.query = ''
    },
    setQuery(query) {
      this.query = query
    },
    blur() {
      this.$refs.query.blur()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.search-box
  display flex
  align-items center
  box-sizing border-box
  width 100%
  padding 0 0.37rem
  height 2.5rem
  background $color-highlight-background
  border-radius 6px
  .icon-search
    font-size 24px
    color $color-background
  .box
    flex 1
    margin 0 0.5rem
    line-height 1rem
    background $color-highlight-background
    color $color-text
    font-size $font-size-medium
    &::placeholder
      color $color-text-d
  .icon-dismiss
    font-size 1rem
    color $color-background
</style>
