import { useState, useRef, useCallback } from 'react'
import { SONGS } from '../data/songs'

export function useSongEngine() {
  const [activeSong, setActiveSong] = useState(null)
  const [guideNote, setGuideNote]   = useState(null)
  const songRef = useRef({ active: null, step: 0, timer: null })

  const stepSong = useCallback(song => {
    const state = songRef.current
    if (state.active !== song.key) return

    if (state.step >= song.notes.length) {
      state.step = 0
      state.timer = setTimeout(() => stepSong(song), song.tempo * 2)
      return
    }

    const entry = song.notes[state.step++]
    const note  = Array.isArray(entry) ? entry[0] : entry
    const dur   = Array.isArray(entry) ? entry[1] : 1

    setGuideNote(note)
    state.timer = setTimeout(() => {
      setGuideNote(null)
      setTimeout(() => stepSong(song), 45)
    }, song.tempo * dur * 0.82)
  }, [])

  const stopSong = useCallback(() => {
    if (songRef.current.timer) clearTimeout(songRef.current.timer)
    songRef.current = { active: null, step: 0, timer: null }
    setActiveSong(null)
    setGuideNote(null)
  }, [])

  const playSong = useCallback(key => {
    if (songRef.current.timer) clearTimeout(songRef.current.timer)
    const song = SONGS[key]
    if (!song) return
    songRef.current = { active: key, step: 0, timer: null }
    setActiveSong(key)
    setGuideNote(null)
    stepSong(song)
  }, [stepSong])

  const handleSongBtn = useCallback(key => {
    if (songRef.current.active === key) stopSong()
    else playSong(key)
  }, [stopSong, playSong])

  return { activeSong, setActiveSong, guideNote, playSong, stopSong, handleSongBtn }
}
