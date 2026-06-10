import { useApp } from '../context/AppContext'
import { Piano } from '../components/Piano/Piano'
import { usePianoDimensions } from '../hooks/usePianoDimensions'
import { useIsLandscape } from '../hooks/useIsLandscape'
import { useKeyboard } from '../hooks/useKeyboard'
import { SONGS } from '../data/songs'
import { NOTE_FRIENDLY } from '../data/keys'
import { BUBBLE_CONFIGS } from '../data/particles'

export function PianoScreen() {
  const {
    pressedNotes, lastNote, notePopKey,
    triggerKey, unlockAudio,
    activeSong, guideNote, handleSongBtn, stopSong,
    particles,
  } = useApp()

  const dims        = usePianoDimensions()
  const isLandscape = useIsLandscape()

  useKeyboard({ enabled: isLandscape, triggerKey, unlockAudio })

  const noteLabel = lastNote
    ? lastNote.includes('#')
      ? lastNote.replace('#', '♯')
      : NOTE_FRIENDLY[lastNote[0]] + ' ' + lastNote
    : '♪'

  if (!isLandscape) {
    return (
      <div className="rotate-prompt">
        <div className="rotate-icon">🎹</div>
        <div className="rotate-arrow">↺</div>
        <div className="rotate-text">Rotate your phone!</div>
        <div className="rotate-sub">This game works in landscape mode</div>
      </div>
    )
  }

  return (
    <div className="app" onPointerDownCapture={unlockAudio}>
      {/* Background bubbles */}
      <div className="bubbles" aria-hidden="true">
        {BUBBLE_CONFIGS.map(b => (
          <div
            key={b.id}
            className="bubble"
            style={{
              left:              b.left,
              width:             b.size,
              height:            b.size,
              animationDuration: `${b.duration}s`,
              animationDelay:    `${b.delay}s`,
              background:        b.color,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-row">
          <h1 className="title">🎹 Piano Fun!</h1>
          <div key={notePopKey} className="note-display pop">{noteLabel}</div>
        </div>

        <div className="song-bar">
          {Object.values(SONGS).map(song => (
            <button
              key={song.key}
              className={`song-btn${activeSong === song.key ? ' active' : ''}`}
              onClick={() => handleSongBtn(song.key)}
            >
              {song.label}
            </button>
          ))}
          {activeSong && (
            <button className="song-btn stop" onClick={stopSong}>⏹ Stop</button>
          )}
        </div>
      </header>

      {/* Piano */}
      <main className="piano-area">
        <Piano
          pressedNotes={pressedNotes}
          guideNote={guideNote}
          onNotePress={triggerKey}
          dims={dims}
          shellPad={dims.shellPad}
        />
      </main>

      <div className="hint-row">
        ⌨️ White keys: A S D F G H J K L &nbsp;|&nbsp; Black: W E T Y U O
      </div>

      {/* Particles */}
      {particles.map(p =>
        p.type === 'emoji' ? (
          <div key={p.id} className="particle-emoji" style={{ left: p.x - 12, top: p.y }}>
            {p.emoji}
          </div>
        ) : (
          <div
            key={p.id}
            className="particle-confetti"
            style={{
              left:              p.x,
              top:               p.y,
              background:        p.color,
              borderRadius:      p.round ? '50%' : '2px',
              animationDuration: `${p.dur}s`,
              animationDelay:    `${p.delay}s`,
            }}
          />
        ),
      )}
    </div>
  )
}
