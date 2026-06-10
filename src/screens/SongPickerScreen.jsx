import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { RedFishCard } from '../components/cards/RedFishCard'
import { BearCard } from '../components/cards/BearCard'

// ── Sea portal (appears when fish swims away) ─────────────────────────────────
function SeaPortal() {
  return (
    <div className="sea-portal">
      <div className="sp-ripple sp-ripple-1" />
      <div className="sp-ripple sp-ripple-2" />
      <div className="sp-ripple sp-ripple-3" />
      <div className="sp-bubble" style={{ '--bx': '22%', '--bd': '0.1s',  '--bs': '7px'  }} />
      <div className="sp-bubble" style={{ '--bx': '45%', '--bd': '0.55s', '--bs': '11px' }} />
      <div className="sp-bubble" style={{ '--bx': '68%', '--bd': '0.9s',  '--bs': '6px'  }} />
      <div className="sp-bubble" style={{ '--bx': '35%', '--bd': '1.3s',  '--bs': '9px'  }} />
      <div className="sp-bubble" style={{ '--bx': '58%', '--bd': '0.3s',  '--bs': '5px'  }} />
      <div className="sp-caustic sp-caustic-1" />
      <div className="sp-caustic sp-caustic-2" />
      <div className="sp-foam" />
    </div>
  )
}

const DOODADS = [
  { ch: '♪', x: '14%', y: '20%', c: '#8e44d6', d: '0s'   },
  { ch: '♫', x: '30%', y: '9%',  c: '#ef6430', d: '0.7s' },
  { ch: '★', x: '40%', y: '22%', c: '#ff9d00', d: '1.3s' },
  { ch: '♥', x: '24%', y: '14%', c: '#f0479b', d: '1.9s' },
  { ch: '♪', x: '66%', y: '21%', c: '#ef6430', d: '0.4s' },
  { ch: '♫', x: '78%', y: '10%', c: '#8e44d6', d: '1.1s' },
  { ch: '★', x: '58%', y: '12%', c: '#ffd000', d: '1.6s' },
  { ch: '♪', x: '88%', y: '46%', c: '#8e44d6', d: '0.9s' },
  { ch: '♥', x: '8%',  y: '52%', c: '#f0479b', d: '1.4s' },
]

function Sun() {
  return (
    <svg className="sp-sun" viewBox="0 0 100 100" aria-hidden="true">
      <g stroke="#ffb300" strokeWidth="6" strokeLinecap="round">
        {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
          <line key={a} x1="50" y1="6" x2="50" y2="16" transform={`rotate(${a} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="26" fill="#ffd000" stroke="#ffb300" strokeWidth="3" />
      <circle cx="42" cy="46" r="3" fill="#7a4a00" />
      <circle cx="58" cy="46" r="3" fill="#7a4a00" />
      <path d="M41 55 Q50 63 59 55" stroke="#7a4a00" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function Cloud({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 60" aria-hidden="true">
      <g fill="#fff" opacity="0.95">
        <ellipse cx="38" cy="42" rx="32" ry="17" />
        <ellipse cx="72" cy="36" rx="28" ry="20" />
        <ellipse cx="95" cy="45" rx="22" ry="13" />
      </g>
    </svg>
  )
}

function Bushes() {
  return (
    <svg className="sp-bushes" viewBox="0 0 1000 110" preserveAspectRatio="none" aria-hidden="true">
      <g fill="#3e9e3a">
        <ellipse cx="60"  cy="115" rx="150" ry="75" />
        <ellipse cx="330" cy="125" rx="190" ry="85" />
        <ellipse cx="640" cy="118" rx="180" ry="78" />
        <ellipse cx="930" cy="125" rx="170" ry="88" />
      </g>
      <g fill="#5cbb4f">
        <ellipse cx="180" cy="135" rx="170" ry="75" />
        <ellipse cx="490" cy="142" rx="200" ry="80" />
        <ellipse cx="810" cy="138" rx="190" ry="78" />
      </g>
      <g fill="#fff">
        <circle cx="150" cy="86" r="5" /><circle cx="470" cy="92" r="5" /><circle cx="780" cy="88" r="5" />
      </g>
      <g fill="#f0479b">
        <circle cx="300" cy="80" r="5" /><circle cx="620" cy="84" r="5" /><circle cx="920" cy="80" r="5" />
      </g>
    </svg>
  )
}

function PianoIcon() {
  return (
    <svg className="fp-piano" viewBox="0 0 36 24" aria-hidden="true">
      <rect width="36" height="24" rx="4" fill="#1d1d2b" />
      <rect x="3.5"  y="7" width="6" height="13.5" rx="1.5" fill="#fff" />
      <rect x="11"   y="7" width="6" height="13.5" rx="1.5" fill="#fff" />
      <rect x="18.5" y="7" width="6" height="13.5" rx="1.5" fill="#fff" />
      <rect x="26"   y="7" width="6" height="13.5" rx="1.5" fill="#fff" />
      <rect x="8.2"  y="7" width="3.4" height="8" rx="1" fill="#1d1d2b" />
      <rect x="15.7" y="7" width="3.4" height="8" rx="1" fill="#1d1d2b" />
      <rect x="23.2" y="7" width="3.4" height="8" rx="1" fill="#1d1d2b" />
    </svg>
  )
}

function Decorations() {
  return (
    <div className="sp-deco" aria-hidden="true">
      <Bushes />
      <Cloud className="sp-cloud sp-cloud-1" />
      <Cloud className="sp-cloud sp-cloud-2" />
      <Sun />
      {DOODADS.map((d, i) => (
        <span
          key={i}
          className="sp-doodad"
          style={{ left: d.x, top: d.y, color: d.c, animationDelay: d.d }}
        >
          {d.ch}
        </span>
      ))}
    </div>
  )
}

const OTHER_SONGS = [
  { key: 'mary',         img: '/story-cards/bak-postaci.svg',   label: 'Bak Postacı Geliyor'       },
  { key: 'birthday',     img: '/story-cards/karpuz-adam.svg',   label: 'Karpuz Adam'                },
  { key: 'twinkle_lily', img: '/story-cards/havada-bulut.svg',  label: 'Havada Bir Top Bulut Olsam' },
  { key: 'lullaby',      img: '/story-cards/iyi-ki-dogdun.svg', label: 'İyi Ki Doğdun'              },
  { key: 'old_mac',      img: '/story-cards/ari-viz.svg',       label: 'Arı Vız Vız Vız'            },
  { key: 'wheels',       img: '/story-cards/basparmak.svg',     label: 'Başparmağım Nerdesin?'      },
  { key: 'spider',       img: '/story-cards/ali-baba.svg',      label: "Ali Baba'nın Çiftliği"      },
  { key: 'star_song',    img: '/story-cards/daha-dun.svg',      label: 'Daha Dün Annemin'           },
]

export function SongPickerScreen() {
  const { setScreen, setActiveSong } = useApp()
  const [expandOverlay, setExpandOverlay] = useState(null)
  const [fishSwimming, setFishSwimming]   = useState(false)

  const handleSelect = (key, rect, delay = 520) => {
    if (expandOverlay) return
    const x = rect ? rect.left + rect.width  / 2 : window.innerWidth  / 2
    const y = rect ? rect.top  + rect.height / 2 : window.innerHeight / 2
    setExpandOverlay({ x, y })
    setTimeout(() => {
      if (key) setActiveSong(key)
      setScreen('piano')
      setExpandOverlay(null)
    }, delay)
  }

  return (
    <div className="song-picker">
      {expandOverlay && (
        <div
          className="card-expand-overlay"
          style={{ '--ox': `${expandOverlay.x}px`, '--oy': `${expandOverlay.y}px` }}
        />
      )}

      <Decorations />

      <h2 className="song-picker-title">Pick a Song!</h2>
      <div className="song-cards">
        {fishSwimming && <SeaPortal />}

        <BearCard
          style={{ '--card-delay': '0s' }}
          disabled={!!expandOverlay}
          onSelect={rect => handleSelect('twinkle', rect)}
        />

        <RedFishCard
          style={{ '--card-delay': '0.1s' }}
          disabled={!!expandOverlay}
          onSwimStart={() => setFishSwimming(true)}
          onSelect={rect => handleSelect('hot_cross', rect, 3300)}
        />

        {OTHER_SONGS.map((s, i) => (
          <button
            key={s.key}
            className="song-card"
            style={{ '--card-delay': `${(i + 2) * 0.1}s` }}
            onClick={e => handleSelect(s.key, e.currentTarget.getBoundingClientRect())}
            disabled={!!expandOverlay}
          >
            <div className="song-card-art">
              <img src={s.img} alt={s.label} className="song-card-img story-img" />
            </div>
            <span className="song-card-label">{s.label}</span>
          </button>
        ))}
      </div>

      <button
        className="song-picker-skip"
        onClick={e => handleSelect(null, e.currentTarget.getBoundingClientRect())}
        disabled={!!expandOverlay}
      >
        <PianoIcon />
        <span>Free Play →</span>
      </button>
    </div>
  )
}
