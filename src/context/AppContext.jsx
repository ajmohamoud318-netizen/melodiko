import { createContext, useContext, useState, useRef, useCallback } from 'react'
import { useAudio } from '../hooks/useAudio'
import { useSongEngine } from '../hooks/useSongEngine'
import { useParticles } from '../hooks/useParticles'
import { FREQS, DISABLED_NOTES } from '../data/keys'

// ── Screens ───────────────────────────────────────────────────────────────────
// 'splash' | 'home' | 'songpicker' | 'piano'
// Add new screens here as the app grows.

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [screen, setScreen]             = useState('splash')
  const [pressedNotes, setPressedNotes] = useState(() => new Set())
  const [lastNote, setLastNote]         = useState(null)
  const [notePopKey, setNotePopKey]     = useState(0)

  const audioReadyRef = useRef(false)
  const { playNote, preload } = useAudio()

  const { activeSong, setActiveSong, guideNote, playSong, stopSong, handleSongBtn } = useSongEngine()
  const { particles, spawnParticles } = useParticles()

  // ── Audio unlock (required by iOS before first playNote) ──────────────────
  // Also kicks off sample preloading so files are ready before the first tap.
  const unlockAudio = useCallback(() => {
    if (audioReadyRef.current) return
    audioReadyRef.current = true
    preload()
  }, [preload])

  // ── Trigger a key ─────────────────────────────────────────────────────────
  const triggerKey = useCallback((note, el) => {
    if (!FREQS[note]) return
    if (DISABLED_NOTES.has(note)) return
    if (!audioReadyRef.current) return
    playNote(note)           // passes note name — useAudio resolves to sample or synth
    setLastNote(note)
    setNotePopKey(k => k + 1)

    setPressedNotes(prev => new Set([...prev, note]))
    setTimeout(() => {
      setPressedNotes(prev => {
        const next = new Set(prev)
        next.delete(note)
        return next
      })
    }, 185)

    if (el) {
      const r = el.getBoundingClientRect()
      spawnParticles(r.left + r.width / 2, r.top + 18)
    }
  }, [playNote, spawnParticles])

  const value = {
    // Navigation
    screen,
    setScreen,

    // Piano state
    pressedNotes,
    lastNote,
    notePopKey,
    triggerKey,

    // Audio
    unlockAudio,

    // Song engine
    activeSong,
    setActiveSong,
    guideNote,
    playSong,
    stopSong,
    handleSongBtn,

    // Particles
    particles,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
