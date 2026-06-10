import { useState, useEffect } from 'react'

// Only enforce landscape on small phones (both dimensions < 600px).
// Tablets and desktops work fine in any orientation.
export function useIsLandscape() {
  const check = () => {
    const w = window.innerWidth
    const h = window.innerHeight
    if (w >= 600 || h >= 600) return true
    return w > h
  }
  const [landscape, setLandscape] = useState(check)
  useEffect(() => {
    const update = () => setTimeout(() => setLandscape(check()), 120)
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])
  return landscape
}
