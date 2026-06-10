import { useRef, useCallback } from 'react'
import { NOTE_SOUNDS, soundUrl } from '../data/sounds'

// ── useAudio ──────────────────────────────────────────────────────────────────
// Preloads all piano sample files as AudioBuffers on first use, then plays
// them through AudioBufferSourceNodes for near-zero latency on iOS/Android.
//
// Falls back to Web Audio synthesis for any note that has no sample file.

export function useAudio() {
  const ctxRef     = useRef(null)
  const buffersRef = useRef({})    // note → AudioBuffer
  const loadedRef  = useRef(false)

  // ── AudioContext (lazy, iOS-safe) ─────────────────────────────────────────
  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  // ── Preload all samples ───────────────────────────────────────────────────
  // Called once after the first user gesture (AudioContext requires it).
  const preload = useCallback(async () => {
    if (loadedRef.current) return
    loadedRef.current = true
    const ctx = getCtx()
    await Promise.all(
      Object.keys(NOTE_SOUNDS).map(async note => {
        try {
          const url  = soundUrl(note)
          const resp = await fetch(url)
          const buf  = await resp.arrayBuffer()
          buffersRef.current[note] = await ctx.decodeAudioData(buf)
        } catch (err) {
          console.warn(`[useAudio] failed to load sample for ${note}:`, err)
        }
      }),
    )
  }, [getCtx])

  // ── Play a note ───────────────────────────────────────────────────────────
  const playNote = useCallback((note) => {
    const ctx = getCtx()
    const buf = buffersRef.current[note]

    if (buf) {
      // ── Sample playback ──
      const source = ctx.createBufferSource()
      source.buffer = buf
      source.connect(ctx.destination)
      source.start(ctx.currentTime)
    } else {
      // ── Synthesis fallback (notes without a sample file) ──
      const freq = FALLBACK_FREQS[note]
      if (!freq) return
      const now    = ctx.currentTime
      const osc1   = ctx.createOscillator()
      const osc2   = ctx.createOscillator()
      const osc3   = ctx.createOscillator()
      const gain   = ctx.createGain()
      const filter = ctx.createBiquadFilter()
      osc1.type = 'triangle'; osc1.frequency.value = freq
      osc2.type = 'sine';     osc2.frequency.value = freq * 2
      osc3.type = 'sine';     osc3.frequency.value = freq * 3
      filter.type = 'lowpass'; filter.frequency.value = freq * 8; filter.Q.value = 0.4
      ;[osc1, osc2, osc3].forEach(o => o.connect(filter))
      filter.connect(gain)
      gain.connect(ctx.destination)
      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(0.4, now + 0.015)
      gain.gain.exponentialRampToValueAtTime(0.25, now + 0.12)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6)
      ;[osc1, osc2, osc3].forEach(o => { o.start(now); o.stop(now + 1.6) })
    }
  }, [getCtx])

  return { playNote, preload, getCtx }
}

// Fallback frequencies for notes without sample files
const FALLBACK_FREQS = {
  'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
  'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
  'C5': 523.25, 'D5': 587.33,
  'C#4': 277.18, 'D#4': 311.13, 'F#4': 369.99,
  'G#4': 415.30, 'A#4': 466.16, 'C#5': 554.37,
}
