import { useRef } from 'react'
import { KeyShape } from './KeyShape'
import { getDecoration, shadeHex } from './keyUtils'

export function WhiteKey({ def, kw, kh, gap, isLast, isPressed, isGuide, onPress }) {
  const ref = useRef(null)
  const decoration = getDecoration(def.note, false)
  const keyColor   = decoration?.color ?? '#ffffff'
  const baseSize   = Math.max(10, Math.floor(kw * 0.38))
  const isStar     = decoration?.shape === 'star'
  const shapeSize  = isStar ? Math.max(14, Math.floor(kw * 0.55)) : baseSize

  const handle = e => {
    e.preventDefault()
    onPress(def.note, ref.current)
  }

  const keyTop          = shadeHex(keyColor,  0.28)
  const keyBottom       = shadeHex(keyColor,  0.08)
  const keyPressedTop   = shadeHex(keyColor, -0.12)
  const keyPressedBottom= shadeHex(keyColor, -0.22)
  const keyShadow       = shadeHex(keyColor, -0.35)

  return (
    <div
      ref={ref}
      onPointerDown={handle}
      style={{
        width: kw,
        height: kh,
        flexShrink: 0,
        marginRight: isLast ? 0 : gap,
        borderRadius: '4px 4px 10px 10px',
        background: isPressed
          ? `linear-gradient(180deg, ${keyPressedTop} 0%, ${keyPressedBottom} 100%)`
          : `linear-gradient(180deg, ${keyTop} 0%, ${keyBottom} 100%)`,
        border: 'none',
        boxShadow: isPressed
          ? `0 1px 0 ${keyShadow}, inset 0 2px 4px rgba(0,0,0,0.15)`
          : `0 6px 0 ${keyShadow}, inset 0 -3px 6px rgba(255,255,255,0.15)`,
        transform: isPressed
          ? 'translateY(4px) scaleY(0.98)'
          : isGuide
            ? 'translateY(-3px)'
            : 'none',
        filter: isGuide ? 'brightness(1.08) drop-shadow(0 0 6px rgba(255,220,80,0.9))' : 'none',
        transition: 'transform 0.07s, filter 0.07s, box-shadow 0.07s, background 0.07s',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: Math.max(6, Math.floor(kh * 0.06)),
        touchAction: 'none',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
        outline: isGuide ? '2px solid #ffd93d' : 'none',
        outlineOffset: 2,
      }}
    >
      <KeyShape decoration={decoration} size={shapeSize} onColoredKey />
    </div>
  )
}
