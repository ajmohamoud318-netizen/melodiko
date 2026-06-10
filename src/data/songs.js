// ── Songs ─────────────────────────────────────────────────────────────────────
// Each note entry: 'NOTE' = quarter, ['NOTE', n] = n × quarter
// To add a new song: add an entry here. No other file needs to change.
export const SONGS = {
  twinkle: {
    key: 'twinkle',
    label: '🐟 Kırmızı Balık',
    tempo: 420,
    notes: [
      'C4', 'C4', 'G4', 'G4', 'A4', 'A4', ['G4', 2],
      'F4', 'F4', 'E4', 'E4', 'D4', 'D4', ['C4', 2],
      'G4', 'G4', 'F4', 'F4', 'E4', 'E4', ['D4', 2],
      'G4', 'G4', 'F4', 'F4', 'E4', 'E4', ['D4', 2],
      'C4', 'C4', 'G4', 'G4', 'A4', 'A4', ['G4', 2],
      'F4', 'F4', 'E4', 'E4', 'D4', 'D4', ['C4', 3],
    ],
  },
  mary: {
    key: 'mary',
    label: '🐑 Mary Had a Lamb',
    tempo: 380,
    notes: [
      'E4', 'D4', 'C4', 'D4', 'E4', 'E4', ['E4', 2],
      'D4', 'D4', ['D4', 2], 'E4', 'G4', ['G4', 2],
      'E4', 'D4', 'C4', 'D4', 'E4', 'E4', 'E4', 'E4',
      'D4', 'D4', 'E4', 'D4', ['C4', 3],
    ],
  },
  birthday: {
    key: 'birthday',
    label: '🎂 Happy Birthday',
    tempo: 460,
    notes: [
      'C4', 'C4', 'D4', ['C4', 1], 'F4', ['E4', 2],
      'C4', 'C4', 'D4', ['C4', 1], 'G4', ['F4', 2],
      'C4', 'C4', ['C5', 1], 'A4', 'F4', 'E4', ['D4', 2],
      'A#4', 'A#4', 'A4', 'F4', 'G4', ['F4', 3],
    ],
  },
  hot_cross: {
    key: 'hot_cross',
    label: '🥐 Hot Cross Buns',
    tempo: 420,
    notes: [
      ['E4', 1], ['D4', 1], ['C4', 2],
      ['E4', 1], ['D4', 1], ['C4', 2],
      'C4', 'C4', 'C4', 'C4',
      'D4', 'D4', 'D4', 'D4',
      ['E4', 1], ['D4', 1], ['C4', 2],
    ],
  },
}
