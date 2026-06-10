// ── Note frequencies (Hz) ─────────────────────────────────────────────────────
export const FREQS = {
  'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
  'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
  'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46,
  'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
  'C#4': 277.18, 'D#4': 311.13, 'F#4': 369.99, 'G#4': 415.30, 'A#4': 466.16,
  'C#5': 554.37, 'D#5': 622.25, 'F#5': 739.99, 'G#5': 830.61, 'A#5': 932.33,
}

// ── White key definitions (left → right) ──────────────────────────────────────
export const WHITE_KEY_DEFS = [
  { note: 'C4', key: 'a', color: '#FF6B6B' },
  { note: 'D4', key: 's', color: '#FF9F43' },
  { note: 'E4', key: 'd', color: '#FFD93D' },
  { note: 'F4', key: 'f', color: '#6BCB77' },
  { note: 'G4', key: 'g', color: '#4ECDC4' },
  { note: 'A4', key: 'h', color: '#45B7D1' },
  { note: 'B4', key: 'j', color: '#A78BFA' },
  { note: 'C5', key: 'k', color: '#FF6B6B' },
  { note: 'D5', key: 'l', color: '#FF9F43' },
]

// ── Black key definitions ─────────────────────────────────────────────────────
// afterWhite: index of the white key this black key sits between (i and i+1)
// disabled:   true → key still renders for layout, but is not clickable, not
//             animated, and not triggerable from the keyboard.
export const BLACK_KEY_DEFS = [
  { note: 'C#4', key: 'w', afterWhite: 0, marker: false, disabled: true },
  { note: 'D#4', key: 'e', afterWhite: 1, marker: false, disabled: true },
  { note: 'F#4', key: 't', afterWhite: 3 },
  { note: 'G#4', key: 'y', afterWhite: 4 },
  { note: 'A#4', key: 'u', afterWhite: 5 },
  { note: 'C#5', key: 'o', afterWhite: 7 },
]

// Set of notes marked as disabled (derived from BLACK_KEY_DEFS).
export const DISABLED_NOTES = new Set(
  BLACK_KEY_DEFS.filter(d => d.disabled).map(d => d.note)
)

// ── Keyboard char → note lookup ───────────────────────────────────────────────
export const KEY_TO_NOTE = {}
WHITE_KEY_DEFS.forEach(k => { KEY_TO_NOTE[k.key] = k.note })
BLACK_KEY_DEFS.forEach(k => { KEY_TO_NOTE[k.key] = k.note })

// ── Solfège labels ────────────────────────────────────────────────────────────
export const NOTE_FRIENDLY = {
  C: 'Do', D: 'Re', E: 'Mi', F: 'Fa', G: 'Sol', A: 'La', B: 'Si',
}
