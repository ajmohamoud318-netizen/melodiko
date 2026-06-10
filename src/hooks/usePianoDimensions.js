import { useState, useEffect } from 'react'
import { WHITE_KEY_DEFS } from '../data/keys'

function computeDims() {
  const vw  = window.innerWidth
  const vh  = window.innerHeight
  const gap = 3
  const isPortrait = vh > vw

  const shellPad = vw < 480 ? 8 : 16
  const appPad   = vw < 480 ? 4 : 8

  const whiteCount = WHITE_KEY_DEFS.length
  const availW = vw - appPad * 2 - shellPad * 2 - gap * (whiteCount - 1)
  const maxKw  = vw >= 1200 ? 72 : vw >= 768 ? 58 : 999
  const kw = Math.min(maxKw, Math.max(22, Math.floor(availW / whiteCount)))

  const heightRatio = isPortrait ? 0.42 : 0.58
  const kh = Math.max(75, Math.min(300, Math.floor(vh * heightRatio)))

  const bw = Math.floor(kw * 0.85)
  const bh = Math.floor(kh * 0.72)
  return { kw, kh, bw, bh, gap, shellPad }
}

export function usePianoDimensions() {
  const [dims, setDims] = useState(computeDims)
  useEffect(() => {
    const update = () => setDims(computeDims())
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', () =>
      setTimeout(update, 120),
    )
    return () => window.removeEventListener('resize', update)
  }, [])
  return dims
}
