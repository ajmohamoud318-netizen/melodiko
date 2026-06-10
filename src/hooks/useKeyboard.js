import { useEffect } from 'react'
import { KEY_TO_NOTE } from '../data/keys'

// Fires triggerKey(note, null) on keydown, respects held keys.
// Only active when `enabled` is true.
export function useKeyboard({ enabled, triggerKey, unlockAudio }) {
  useEffect(() => {
    if (!enabled) return

    const held = new Set()
    const onDown = e => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return
      const k = e.key.toLowerCase()
      if (held.has(k)) return
      held.add(k)
      const note = KEY_TO_NOTE[k]
      if (note) {
        unlockAudio()
        triggerKey(note, null)
      }
    }
    const onUp = e => held.delete(e.key.toLowerCase())
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
    }
  }, [enabled, triggerKey, unlockAudio])
}
