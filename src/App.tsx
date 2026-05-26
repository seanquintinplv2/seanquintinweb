import { useEffect, useRef, useState } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import HexagonalBackground from './components/HexagonalBackground'
import Navbar from './components/Navbar'
import { getAudioContext, loadClickSound, playButtonClickSound } from './utils/sound'

type Page = 'home' | 'about' | 'projects' | 'contact'

function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [activePage, setActivePage] = useState<Page>('home')
  const [pageReady, setPageReady] = useState(false)
  const [transitionStage, setTransitionStage] = useState<'idle' | 'closing' | 'opening'>('opening')
  const [transitionVariant, setTransitionVariant] = useState<'about' | 'projects' | 'contact' | 'home-return'>('about')
  const [audioMuted, setAudioMuted] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark'
    const saved = window.localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const transitionTimer = useRef<number | undefined>()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioMutedRef = useRef(audioMuted)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const animationRef = useRef<number | null>(null)
  const audioSrc = new URL('../assets/bgsound.mp3', import.meta.url).href

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    if (!audioRef.current) return

    audioRef.current.muted = audioMuted
    if (!audioMuted) {
      audioRef.current.play().catch(() => {})
    }
  }, [audioMuted])

  useEffect(() => {
    audioMutedRef.current = audioMuted
  }, [audioMuted])

  useEffect(() => {
    const audioEl = audioRef.current
    if (!audioEl) return

    const ctx = getAudioContext()
    if (!ctx) return

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }

    if (!sourceRef.current) {
      sourceRef.current = ctx.createMediaElementSource(audioEl)
    }

    if (!analyserRef.current) {
      analyserRef.current = ctx.createAnalyser()
      analyserRef.current.fftSize = 128
      sourceRef.current.connect(analyserRef.current)
      analyserRef.current.connect(ctx.destination)
    }

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)

    const updateLevel = () => {
      if (!analyserRef.current) return
      analyserRef.current.getByteFrequencyData(dataArray)
      const sum = dataArray.reduce((acc, value) => acc + value, 0)
      const level = sum / dataArray.length / 255
      setAudioLevel(level)
      animationRef.current = window.requestAnimationFrame(updateLevel)
    }

    animationRef.current = window.requestAnimationFrame(updateLevel)

    return () => {
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    loadClickSound().catch(() => {})

    const handleButtonClick = () => {
      if (audioMutedRef.current) return
      void playButtonClickSound()
    }

    document.addEventListener('click', handleButtonClick)
    return () => document.removeEventListener('click', handleButtonClick)
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIntroComplete(true)
      setPageReady(true)
      setTransitionStage('idle')
    }, 1400)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (transitionStage === 'idle') return
    return () => window.clearTimeout(transitionTimer.current)
  }, [transitionStage])

  const scrollToHome = () => {
    if (typeof document === 'undefined') return
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
  }

  const navigateTo = (page: Page) => {
    if (transitionStage === 'closing') return
    if (page === activePage) {
      if (page === 'home') {
        scrollToHome()
      }
      return
    }

    const goingHome = page === 'home'

    if (goingHome) {
      setTransitionVariant('home-return')
      setTransitionStage('closing')
      setIntroComplete(false)
      setPageReady(false)

      window.clearTimeout(transitionTimer.current)
      transitionTimer.current = window.setTimeout(() => {
        setActivePage(page)
        setTransitionStage('opening')
        setIntroComplete(true)
        setPageReady(true)
        window.clearTimeout(transitionTimer.current)
        transitionTimer.current = window.setTimeout(() => setTransitionStage('idle'), 450)
      }, 450)
      return
    }

    setTransitionVariant(page === 'about' ? 'about' : page === 'projects' ? 'projects' : 'contact')
    setTransitionStage('idle')
    setActivePage(page)
    setIntroComplete(true)
    setPageReady(true)
  }

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))

  const renderPage = () => {
    switch (activePage) {
      case 'about':
        return <About onNavigate={navigateTo} />
      case 'projects':
        return <Projects onNavigate={navigateTo} />
      case 'contact':
        return <Contact />
      case 'home':
      default:
        return <Hero onNavigate={navigateTo} />
    }
  }

  const showIntroOverlay = activePage === 'home' || transitionVariant === 'home-return'
  const isSideVariant = transitionVariant === 'projects' || transitionVariant === 'contact'
  const barOneDirection = isSideVariant ? 'intro-left' : 'intro-top'
  const barTwoDirection = isSideVariant ? 'intro-right' : 'intro-bottom'
  const barExtraClass = transitionVariant === 'contact' ? 'contact-mode' : ''
  const modeClass = transitionStage === 'closing' ? 'close-mode' : ''
  const barOneClasses = `intro-bar ${barOneDirection} ${barExtraClass} ${modeClass}`.trim()
  const barTwoClasses = `intro-bar ${barTwoDirection} ${barExtraClass} ${modeClass}`.trim()

  return (
    <>
      <HexagonalBackground />
      <audio ref={audioRef} src={audioSrc} preload="auto" loop playsInline />
      <Navbar
        activePage={activePage}
        onNavigate={navigateTo}
        theme={theme}
        onToggleTheme={toggleTheme}
        audioMuted={audioMuted}
        onToggleMute={() => setAudioMuted((current) => !current)}
        audioLevel={audioLevel}
      />
      {showIntroOverlay && (
        <div className="intro-overlay">
          <div className={barOneClasses} />
          <div className={barTwoClasses} />
        </div>
      )}
      <div className={`app transition-all duration-700 ${introComplete ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <main className={`app-page min-h-screen ${pageReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'} transition-all duration-500`}>
          {renderPage()}
        </main>
        {activePage === 'home' ? null : <Footer onNavigate={navigateTo} />}
      </div>
    </>
  )
}

export default App
