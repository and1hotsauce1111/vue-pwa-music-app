import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/utils'

export const playlistMixin = {
  computed: {
    ...mapGetters(['playlist'])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}

export const playerMixin = {
  computed: {
    /* eslint-disable */
    iconMode() {
      return this.mode === playMode.sequence
        ? 'icon-sequence'
        : this.mode === playMode.loop
        ? 'icon-loop'
        : 'icon-random'
    },
    /* eslint-enable */
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'mode',
      'playlist',
      'favoriteList'
    ])
  },
  methods: {
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    resetCurrentIndex(list) {
      const index = list.findIndex(item => item.rid === this.currentSong.rid)
      this.setCurrentIndex(index)
    },
    getFavoriteIcon(song) {
      if (this.isFavorite(song)) {
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
    },
    toggleFavorite(song) {
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song)
      } else {
        this.saveFavoriteList(song)
      }
    },
    isFavorite(song) {
      const index = this.favoriteList.findIndex(item => item.rid === song.rid)
      return index > -1
    },
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST'
    }),
    ...mapActions(['saveFavoriteList', 'deleteFavoriteList'])
  }
}

export const searchMixin = {
  data() {
    return {
      query: '',
      clearSuggest: false,
      refreshDelay: 100
    }
  },
  computed: {
    ...mapGetters(['searchHistory'])
  },
  methods: {
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    onQueryChange(query) {
      this.query = query
    },
    ...mapActions(['saveSearchHistory', 'deleteSearchHistory'])
  }
}
