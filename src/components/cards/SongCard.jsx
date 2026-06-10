// ── Generic SongCard ──────────────────────────────────────────────────────────
// Base card used by song picker. Pass `art` (any JSX) for the artwork area.
// The card handles the disabled/overlay state; animation is the child's job.

export function SongCard({ label, art, onClick, disabled, style, className = '' }) {
  return (
    <button
      className={`song-card ${className}`}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="song-card-art">{art}</div>
      <span className="song-card-label">{label}</span>
    </button>
  )
}
