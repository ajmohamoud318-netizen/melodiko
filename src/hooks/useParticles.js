import { useState, useRef, useCallback } from 'react'
import { EMOJIS, CONFETTI_COLORS } from '../data/particles'

export function useParticles() {
  const [particles, setParticles] = useState([])
  const particleIdRef = useRef(0)

  const spawnParticles = useCallback((x, y) => {
    const uid = ++particleIdRef.current
    const batch = [
      {
        id: `e${uid}`,
        x,
        y,
        type: 'emoji',
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      },
      ...Array.from({ length: 5 }, (_, i) => ({
        id: `c${uid}_${i}`,
        x: x + (Math.random() - 0.5) * 42,
        y,
        type: 'confetti',
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        dur:   0.38 + Math.random() * 0.42,
        delay: Math.random() * 0.1,
        round: Math.random() > 0.5,
      })),
    ]
    setParticles(prev => [...prev, ...batch])
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !batch.find(b => b.id === p.id)))
    }, 1100)
  }, [])

  return { particles, spawnParticles }
}
