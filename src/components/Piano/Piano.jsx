import { WHITE_KEY_DEFS, BLACK_KEY_DEFS } from '../../data/keys'
import { WhiteKey } from './WhiteKey'
import { BlackKey } from './BlackKey'

export function Piano({ pressedNotes, guideNote, onNotePress, dims, shellPad = 16 }) {
  const { kw, kh, bw, bh, gap } = dims

  const getBlackLeft = afterWhite =>
    afterWhite * (kw + gap) + kw + gap / 2 - bw / 2

  const totalW = WHITE_KEY_DEFS.length * kw + (WHITE_KEY_DEFS.length - 1) * gap

  return (
    <div
      className="piano-shell"
      style={{
        background: 'linear-gradient(180deg, #2c2c3e 0%, #1a1a2e 100%)',
        borderRadius: 16,
        padding: `12px ${shellPad}px 20px`,
        boxShadow: '0 0 0 2px rgba(255,255,255,0.07)',
      }}
    >
      <div style={{ display: 'flex', position: 'relative', width: totalW, height: kh }}>
        {WHITE_KEY_DEFS.map((def, i) => (
          <WhiteKey
            key={def.note}
            def={def}
            kw={kw} kh={kh} gap={gap}
            isLast={i === WHITE_KEY_DEFS.length - 1}
            isPressed={pressedNotes.has(def.note)}
            isGuide={guideNote === def.note}
            onPress={onNotePress}
          />
        ))}
        {BLACK_KEY_DEFS.map(def => (
          <BlackKey
            key={def.note}
            def={def}
            bw={bw} bh={bh}
            leftPx={getBlackLeft(def.afterWhite)}
            isPressed={pressedNotes.has(def.note)}
            isGuide={guideNote === def.note}
            onPress={onNotePress}
          />
        ))}
      </div>
    </div>
  )
}
