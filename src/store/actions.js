import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/utils'
import {
  saveSearch,
  deleteSearch,
  clearSearch,
  savePlaySong,
  saveFavorite,
  deleteFavorite
} from 'common/js/cache'

function findIndex(list, song) {
  return list.findIndex(item => item.id === song.id)
}

export const selectPlay = ({ commit, state }, { list, index }) => {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    const randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = ({ commit }, { list }) => {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  const randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function({ commit, state }, song) {
  const playlist = state.playlist.slice()
  const sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex

  // 紀錄當前歌曲
  const currentSong = playlist[currentIndex]
  // 判斷當前歌曲是否已在列表之中
  const fpIndex = findIndex(playlist, song)
  // 因為插入歌曲 索引+1
  currentIndex++
  playlist.splice(currentIndex, 0, song)

  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }

  // sequenceList 要插入的位置
  const currentSIndex = findIndex(sequenceList, currentSong) + 1
  const fsIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentSong, 0, song)

  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const deleteSong = function({ commit, state }, song) {
  const playlist = state.playlist.slice()
  const sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex

  const pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)

  const sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)

  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  const playingState = playlist.length > 0
  commit(types.SET_PLAYING_STATE, playingState)
}

export const saveSearchHistory = function({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function({ commit }) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const deleteSongList = function({ commit }) {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}

export const savePlayHistory = function({ commit }, song) {
  commit(types.SET_PLAY_HISTORY, savePlaySong(song))
}

export const saveFavoriteList = function({ commit }, song) {
  commit(types.SET_FAVORTIE_LIST, saveFavorite(song))
}

export const deleteFavoriteList = function({ commit }, song) {
  commit(types.SET_FAVORTIE_LIST, deleteFavorite(song))
}
