<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs" :songsNum="songsNum"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import MusicList from 'components/music-list/music-list'

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
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters(['singer'])
  },
  created() {
    // 接收songs format data
    this.songs = []
    this._getDetail()
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          const songList = res.data.list
          // 紀錄總歌曲數 用於子組件 laoding playlist顯示用
          this.songsNum = songList.length
          this._noramlizeSongs(songList).forEach(list => {
            list.then(res => {
              this.songs.push(res)
            })
          })
        }
      })
    },
    _noramlizeSongs(songList) {
      const ret = []
      songList.forEach(song => {
        const { musicData } = song
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'

.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter
  transform translate3d(100%, 0, 0)
.slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
