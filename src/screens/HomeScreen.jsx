import { useState } from 'react'
import { useApp } from '../context/AppContext'

const LETTERS = [
  { ch: 'M', x: 30,  color: '#0094d2' },
  { ch: 'e', x: 148, color: '#FF6B9D' },
  { ch: 'l', x: 225, color: '#f6c300' },
  { ch: 'o', x: 268, color: '#66b62f' },
  { ch: 'd', x: 349, color: '#FF8C00' },
  { ch: 'i', x: 430, color: '#8B5CF6' },
  { ch: 'k', x: 469, color: '#0094d2' },
  { ch: 'o', x: 546, color: '#66b62f' },
]

export function HomeScreen() {
  const { setScreen } = useApp()
  const [expandOverlay, setExpandOverlay] = useState(null)

  const handleNav = (dest, e) => {
    if (expandOverlay) return
    const rect = e.currentTarget.getBoundingClientRect()
    setExpandOverlay({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
    setTimeout(() => {
      setScreen(dest === 'songs' ? 'songpicker' : 'piano')
      setExpandOverlay(null)
    }, 520)
  }

  return (
    <div className="home-screen">
      {expandOverlay && (
        <div
          className="card-expand-overlay"
          style={{ '--ox': `${expandOverlay.x}px`, '--oy': `${expandOverlay.y}px` }}
        />
      )}

      <div className="home-content">
        <div className="home-logo-wrap">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="10 15 628 185" className="home-logo-svg">
            <g fontFamily="Nunito, Arial Rounded MT Bold, sans-serif" fontWeight="900" fontSize="120">
              {LETTERS.map(({ ch, x, color }) => (
                <text key={ch + x} x={x} y="150"
                  stroke="white" strokeWidth="30" paintOrder="stroke"
                  fill={color}
                >{ch}</text>
              ))}
            </g>
          </svg>
        </div>

        <div className="home-cards">
          {/* Songs */}
          <button
            className="home-card home-card--songs"
            onClick={e => handleNav('songs', e)}
            disabled={!!expandOverlay}
          >
            <div className="home-card-art">
              <svg className="home-card-icon" viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
                <polygon points="55,6 67,40 103,40 75,61 86,95 55,74 24,95 35,61 7,40 43,40"
                  fill="#FFD630" stroke="rgba(200,120,0,0.25)" strokeWidth="1.5"/>
                <polygon points="55,16 64,40 88,40 69,54 76,78 55,64 34,78 41,54 22,40 46,40"
                  fill="#FFE566" opacity="0.45"/>
                <circle cx="45" cy="52" r="4.5" fill="#b86e00"/>
                <circle cx="65" cy="52" r="4.5" fill="#b86e00"/>
                <circle cx="46.5" cy="50.5" r="1.8" fill="rgba(255,255,255,0.6)"/>
                <circle cx="66.5" cy="50.5" r="1.8" fill="rgba(255,255,255,0.6)"/>
                <path d="M43,62 Q55,72 67,62" fill="none" stroke="#b86e00" strokeWidth="3.2" strokeLinecap="round"/>
                <rect x="72" y="60" width="10" height="16" rx="5" fill="#9b59b6"/>
                <rect x="73.5" y="76" width="7" height="10" rx="1" fill="#7d3c98"/>
                <line x1="77" y1="86" x2="77" y2="92" stroke="#7d3c98" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="72" y1="92" x2="82" y2="92" stroke="#7d3c98" strokeWidth="2.5" strokeLinecap="round"/>
                <text x="10" y="38" fontSize="12" fill="rgba(255,255,255,0.9)" fontFamily="serif">♪</text>
                <text x="88" y="32" fontSize="10" fill="rgba(255,255,255,0.8)" fontFamily="serif">♫</text>
              </svg>
            </div>
            <div className="home-card-bottom">
              <strong className="home-card-name home-name--songs">Songs</strong>
              <span className="home-card-desc">Sing along with fun songs!</span>
              <div className="home-card-play-btn home-play--songs">▶</div>
            </div>
          </button>

          {/* Free play */}
          <button
            className="home-card home-card--free"
            onClick={e => handleNav('free', e)}
            disabled={!!expandOverlay}
          >
            <div className="home-card-art">
              <svg className="home-card-icon" viewBox="0 0 124 106" xmlns="http://www.w3.org/2000/svg">
                {[
                  { x: 2,  color: '#FF6B6B' },
                  { x: 26, color: '#FFD93D' },
                  { x: 50, color: '#6BCB77' },
                  { x: 74, color: '#4ECDC4' },
                  { x: 98, color: '#A78BFA' },
                ].map(({ x, color }) => (
                  <rect key={x} x={x} y="4" width="22" height="96" rx="5"
                    fill={color} stroke="rgba(0,0,0,0.08)" strokeWidth="1"/>
                ))}
                {[14, 38, 86].map((x, i) => (
                  <rect key={i} x={x} y="4" width="14" height="60" rx="4"
                    fill="rgba(10,30,80,0.6)"/>
                ))}
              </svg>
            </div>
            <div className="home-card-bottom">
              <strong className="home-card-name home-name--free">Play Freely</strong>
              <span className="home-card-desc">Explore instruments and sounds!</span>
              <div className="home-card-play-btn home-play--free">▶</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
