<template>
  <transition name="slide" appear>
    <music-list :title="title" :bg-image="bgImage" :songs="songs" :songsNum="songsNum" :rank="rank"></music-list>
  </transition>
</template>

<script type="ecmascript-6">
import MusicList from 'components/music-list/music-list'
import { getMusicList } from 'api/rank'
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
      rank: true,
      songsNum: 0
    }
  },
  computed: {
    ...mapGetters(['topList']),
    title() {
      return this.topList.name
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].pic
      }
      return ''
    }
  },
  created() {
    this._getMusicList()
  },
  methods: {
    _getMusicList() {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return false
      }

      getMusicList(this.topList.id).then(res => {
        if (res.status === 200 && res.data.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.data.musicList)
        }
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
  transition all 0.3s ease
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
