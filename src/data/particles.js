// ── Particle / visual effect constants ────────────────────────────────────────

export const EMOJIS = ['🎵', '🎶', '✨', '⭐', '🌟', '💫', '🎈', '🌈', '🎉', '💥']

export const CONFETTI_COLORS = [
  '#FF6B6B', '#FFD93D', '#6BCB77', '#4ECDC4',
  '#A78BFA', '#FF9F43', '#45B7D1', '#FF6B9D',
]

// Background bubble configs (stable — computed once at module level)
export const BUBBLE_CONFIGS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${(i * 8.3 + 2) % 100}%`,
  size: 28 + i * 6,
  duration: 9 + i * 1.3,
  delay: i * 0.7,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
}))
