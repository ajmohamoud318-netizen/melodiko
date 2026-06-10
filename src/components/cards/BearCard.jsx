import { useRef } from 'react'

export function BearCard({ onSelect, disabled, style }) {
  const btnRef = useRef(null)

  const handleClick = () => {
    if (disabled) return
    onSelect(btnRef.current?.getBoundingClientRect())
  }

  return (
    <button ref={btnRef} className="song-card" style={style} onClick={handleClick}>
      <div className="song-card-art">
        <img
          src="/story-cards/kucuk-kurbaga.svg"
          alt="Küçük Kurbağa"
          className="song-card-img story-img"
        />
      </div>
      <span className="song-card-label">Küçük Kurbağa</span>
    </button>
  )
}
