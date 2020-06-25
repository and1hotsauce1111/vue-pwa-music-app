<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs" :songsNum="songsNum"></music-list>
  </transition>
</template>

<script type="ecmascript-6">
import { mapGetters } from 'vuex'
import MusicList from 'components/music-list/music-list'
import { getSongList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'

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
    ...mapGetters(['disc']),
    title() {
      return this.disc.title
    },
    bgImage() {
      return this.disc.cover
    }
  },
  created() {
    this._getSongList()
  },
  methods: {
    _getSongList() {
      // 重新整理無法獲取資料 重新導向
      if (!this.disc.content_id) {
        this.$router.push('/recommend')
        return false
      }
      getSongList(this.disc.content_id)
        .then(res => {
          if (ERR_OK === res.code) {
            // console.log(res.cdlist[0].songlist)
            const songList = res.cdlist[0].songlist
            this.songsNum = songList.length
            this._normalizeSongs(songList).forEach(list => {
              list.then(res => {
                this.songs.push(res)
              })
            })
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    _normalizeSongs(list) {
      const ret = []
      list.forEach(musicData => {
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>