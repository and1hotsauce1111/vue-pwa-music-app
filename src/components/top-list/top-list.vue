<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs" :songsNum="songsNum" :rank="rank"></music-list>
  </transition>
</template>

<script type="ecmascript-6">
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getMusicList } from 'api/rank'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'

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
      return this.topList.topTitle
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return ''
    }
  },
  created() {
    this._getMusicList()
  },
  methods: {
    _getMusicList(topid) {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return false
      }
      const topId = this.topList.id
      getMusicList(topId).then(res => {
        if (res.code === ERR_OK) {
          this.songsNum = res.songlist.length
          this._normalizeSongs(res.songlist).forEach(list => {
            list.then(res => {
              this.songs.push(res)
            })
          })
        }
      })
    },
    _normalizeSongs(list) {
      const ret = []
      list.forEach(item => {
        const musicData = item.data
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })

      return ret
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus"></style>