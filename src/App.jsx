import { useLayoutEffect } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import { SplashScreen }     from './screens/SplashScreen'
import { HomeScreen }       from './screens/HomeScreen'
import { SongPickerScreen } from './screens/SongPickerScreen'
import { PianoScreen }      from './screens/PianoScreen'
import './App.css'

// ── Screen router ─────────────────────────────────────────────────────────────
// To add a new screen: add it to SCREENS and create its component in src/screens/.
const SCREENS = {
  splash:     SplashScreen,
  home:       HomeScreen,
  songpicker: SongPickerScreen,
  piano:      PianoScreen,
}

function AppShell() {
  const { screen } = useApp()

  // Keep body/html background and iOS theme-color in sync
  useLayoutEffect(() => {
    const bg = '#f6c300'
    document.body.style.background = bg
    document.documentElement.style.background = bg
    let meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'theme-color'
      document.head.appendChild(meta)
    }
    meta.content = bg
  }, [screen])

  const Screen = SCREENS[screen] ?? SplashScreen
  return <Screen />
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
