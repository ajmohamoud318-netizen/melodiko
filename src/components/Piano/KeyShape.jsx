// ── KeyShape ──────────────────────────────────────────────────────────────────
// Renders a shape marker (circle, star, triangle, roundedSquare) on a key.
// onColoredKey = true when the key itself has a background colour.

export function KeyShape({ decoration, size, onColoredKey = false, forceWhite = false }) {
  if (!decoration) return null
  const { shape, color } = decoration
  const fill   = forceWhite ? '#fff' : onColoredKey ? '#fff' : color
  const stroke = onColoredKey ? 'rgba(0,0,0,0.25)' : 'none'

  if (shape === 'circle') {
    return (
      <div style={{
        width: size, height: size,
        borderRadius: '50%',
        background: fill,
        border: onColoredKey ? `1.5px solid ${stroke}` : 'none',
        boxShadow: onColoredKey ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
        pointerEvents: 'none',
      }} />
    )
  }

  if (shape === 'star') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" style={{ pointerEvents: 'none' }}>
        <polygon
          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
          fill={fill}
          stroke={onColoredKey ? 'rgba(0,0,0,0.25)' : 'none'}
          strokeWidth={onColoredKey ? 1 : 0}
        />
      </svg>
    )
  }

  if (shape === 'triangle') {
    const h = size * 0.9
    return (
      <div style={{
        width: size, height: h,
        background: fill,
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        filter: onColoredKey ? 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))' : 'none',
        pointerEvents: 'none',
      }} />
    )
  }

  if (shape === 'roundedSquare') {
    return (
      <div style={{
        width: size * 0.85, height: size * 0.85,
        borderRadius: size * 0.22,
        background: fill,
        border: onColoredKey ? `1.5px solid ${stroke}` : 'none',
        boxShadow: onColoredKey ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
        pointerEvents: 'none',
      }} />
    )
  }

  return null
}
