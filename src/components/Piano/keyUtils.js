// ── Note decoration helpers ───────────────────────────────────────────────────

export const PITCH_COLORS = {
  C: '#FF4444', D: '#FF9F43', E: '#FFD93D', F: '#6BCB77',
  G: '#4ECDC4', A: '#FF6B9D', B: '#A78BFA',
}

export function parseNote(note) {
  const m = note.match(/^([A-G])(#?)(\d)$/)
  return m ? { pitch: m[1], sharp: m[2] === '#', octave: Number(m[3]) } : null
}

export function shadeHex(hex, amount) {
  const n = hex.replace('#', '')
  const r = parseInt(n.slice(0, 2), 16)
  const g = parseInt(n.slice(2, 4), 16)
  const b = parseInt(n.slice(4, 6), 16)
  const mix = c =>
    amount >= 0
      ? Math.round(c + (255 - c) * amount)
      : Math.round(c * (1 + amount))
  const toHex = c => Math.min(255, Math.max(0, c)).toString(16).padStart(2, '0')
  return `#${toHex(mix(r))}${toHex(mix(g))}${toHex(mix(b))}`
}

export function getDecoration(note, isBlack) {
  const parsed = parseNote(note)
  if (!parsed) return null
  const { pitch, sharp, octave } = parsed
  const defaultColor = PITCH_COLORS[pitch]

  // Per-note color overrides (for black-key triangle shapes).
  const overrides = {
    'F#4': '#6BCB77', // green
    'G#4': '#4ECDC4', // blue
    'A#4': '#A78BFA', // purple
    'C#5': '#FF4444', // red
  }
  const color = overrides[note] ?? defaultColor

  if (isBlack) {
    if (sharp && (pitch === 'C' || pitch === 'D')) {
      return pitch === 'C' && octave >= 5
        ? { shape: 'roundedSquare', color }
        : null
    }
    if (sharp && (pitch === 'F' || pitch === 'G' || pitch === 'A')) {
      return { shape: 'triangle', color }
    }
    return null
  }

  if (octave === 4) return { shape: 'circle', color }
  if (octave >= 5) return { shape: 'star', color }
  return { shape: 'circle', color }
}
