<template>
  <transition name="slide" appear>
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
      return this.disc.name
    },
    bgImage() {
      return this.disc.img
    }
  },
  created() {
    this._getSongList()
  },
  methods: {
    _getSongList() {
      // 重新整理無法獲取資料 重新導向
      if (!this.disc.id) {
        this.$router.push('/recommend')
        return false
      }
      getSongList(this.disc.id)
        .then(res => {
          if (res.status === 200 && res.data.code === ERR_OK) {
            const songList = res.data.data.musicList
            this.songsNum = songList.length
            this.songs = this._normalizeSongs(songList)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    _normalizeSongs(list) {
      const ret = []
      list.forEach(musicData => {
        if (musicData.musicrid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })

      return ret
    }
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>