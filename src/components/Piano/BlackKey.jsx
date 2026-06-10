import { useRef } from 'react'
import { KeyShape } from './KeyShape'
import { getDecoration } from './keyUtils'

export function BlackKey({ def, bw, bh, leftPx, isPressed, isGuide, onPress }) {
  const ref = useRef(null)
  const decoration = def.marker === false ? null : getDecoration(def.note, true)
  const shapeSize  = Math.max(8, Math.floor(bw * 0.42))
  const isDisabled = def.disabled === true

  const handle = e => {
    // Swallow the event either way so it never reaches the white key behind us.
    e.stopPropagation()
    e.preventDefault()
    if (isDisabled) return
    onPress(def.note, ref.current)
  }

  return (
    <div
      ref={ref}
      onPointerDown={handle}
      style={{
        position: 'absolute',
        top: 0,
        left: leftPx,
        width: bw,
        height: bh,
        zIndex: 2,
        borderRadius: '0 0 6px 6px',
        background: isDisabled
          ? '#000'
          : isPressed
            ? 'linear-gradient(180deg, #555 0%, #222 100%)'
            : isGuide
              ? 'linear-gradient(180deg, #666 0%, #333 100%)'
              : 'linear-gradient(180deg, #2a2a2a 0%, #111 100%)',
        border: '1px solid #000',
        boxShadow: isPressed ? '0 1px 0 #000' : '0 5px 0 #000',
        transform: isPressed ? 'translateY(3px)' : 'none',
        filter: isGuide ? 'brightness(1.25) drop-shadow(0 0 5px rgba(255,220,80,0.8))' : 'none',
        transition: 'transform 0.07s, background 0.07s, box-shadow 0.07s, filter 0.07s',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: Math.max(4, Math.floor(bh * 0.08)),
        touchAction: 'none',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
        outline: isGuide ? '2px solid #ffd93d' : 'none',
        outlineOffset: 1,
        pointerEvents: 'auto',
      }}
    >
      <KeyShape decoration={decoration} size={shapeSize} />
    </div>
  )
}
