// ── Note → audio file mapping ─────────────────────────────────────────────────
// Files live in public/piano-notes/*.mp3
// Named by the shape-marker colour + shape visible on each key.

export const NOTE_SOUNDS = {
  // White keys — octave 4 (circle markers)
  'C4': 'red-circle',
  'D4': 'orange-circle',
  'E4': 'yellow-circle',
  'F4': 'green-circle',
  'G4': 'blue-circle',
  'A4': 'pink-circle',
  'B4': 'purple-circle',

  // White keys — octave 5 (star markers)
  'C5': 'red-star',
  'D5': 'orange-star',

  // Active black keys (triangle / square markers)
  'F#4': 'green-triangle',
  'G#4': 'blue-triangle',
  'A#4': 'purple-triangle',
  'C#5': 'red-square',
}

export function soundUrl(note) {
  const name = NOTE_SOUNDS[note]
  return name ? `/piano-notes/${name}.mp3` : null
}
