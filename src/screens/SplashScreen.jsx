import { useEffect } from 'react'
import { useApp } from '../context/AppContext'

const LETTERS = [
  { ch: 'M', x: 30,  color: '#0094d2', delay: 0    },
  { ch: 'e', x: 148, color: '#FF6B9D', delay: 0.12 },
  { ch: 'l', x: 225, color: '#f6c300', delay: 0.24 },
  { ch: 'o', x: 268, color: '#66b62f', delay: 0.36 },
  { ch: 'd', x: 349, color: '#FF8C00', delay: 0.48 },
  { ch: 'i', x: 430, color: '#8B5CF6', delay: 0.60 },
  { ch: 'k', x: 469, color: '#0094d2', delay: 0.90 },
  { ch: 'o', x: 546, color: '#66b62f', delay: 1.05 },
]

export function SplashScreen() {
  const { setScreen } = useApp()

  useEffect(() => {
    const t = setTimeout(() => setScreen('home'), 3200)
    return () => clearTimeout(t)
  }, [setScreen])

  return (
    <div className="splash splash--logo" aria-label="Melodikoo loading">
      <div className="splash-inner">
        <div className="splash-logo-wrap">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="10 15 628 185" className="splash-logo-svg">
            <g fontFamily="Nunito, Arial Rounded MT Bold, sans-serif" fontWeight="900" fontSize="120">
              {LETTERS.map(({ ch, x, color, delay }) => (
                <text
                  key={ch + x}
                  x={x} y="150"
                  stroke="white" strokeWidth="30" paintOrder="stroke"
                  fill={color}
                  className="svg-letter"
                  style={{ animationDelay: `${delay}s` }}
                >{ch}</text>
              ))}
            </g>
          </svg>
        </div>

        <div className="splash-loader" aria-label="Loading">
          {LETTERS.map(({ ch, x, color, delay }) => (
            <span key={ch + x} style={{ '--d': `${delay}s`, '--c': color }} />
          ))}
        </div>
      </div>
    </div>
  )
}
