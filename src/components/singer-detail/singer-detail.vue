<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs" :songsNum="songsNum"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import { mapGetters } from 'vuex'

export default {
  components: {
    MusicList
  },
  data() {
    return {
      songs: [],
      songsNum: 0
    }
  },
  computed: {
    ...mapGetters(['singer']),
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    }
  },
  created() {
    // 接收songs format data
    this._getDetail()
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.status === 200 && res.data.code === ERR_OK) {
          this.songs = []
          this.songs = this._normalizeSongs(res.data.data.list)
        }
      })
    },
    _normalizeSongs(list) {
      const ret = []
      list.forEach(item => {
        if (item.rid && item.albumid) {
          ret.push(createSong(item))
        }
      })
      return ret
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter
  transform translate3d(100%, 0, 0)
.slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
