import { useEffect, useRef, useState } from 'react'

type Page = 'home' | 'about' | 'projects' | 'contact'

interface NavbarProps {
  activePage: Page
  onNavigate: (page: Page) => void
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  audioMuted: boolean
  onToggleMute: () => void
}

const navLinks: Array<{ name: string; page: Page }> = [
  { name: 'Home', page: 'home' },
  { name: 'About', page: 'about' },
  { name: 'Projects', page: 'projects' },
  { name: 'Contact', page: 'contact' },
]

function Navbar({ activePage, onNavigate, theme, onToggleTheme, audioMuted, onToggleMute }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hideNav, setHideNav] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 20)

      if (currentY <= 20) {
        setHideNav(false)
      } else if (currentY > lastScrollY.current) {
        setHideNav(true)
      } else {
        setHideNav(false)
      }

      lastScrollY.current = currentY
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigate = (page: Page) => {
    setMenuOpen(false)
    onNavigate(page)
  }

  return (
    <nav className={`fixed left-0 right-0 top-0 z-50 transform transition-transform duration-500 ${hideNav ? '-translate-y-full' : 'translate-y-0'} ${scrolled ? 'bg-background/95 border-b border-border backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.12)]' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto flex items-center gap-4 px-6 py-4">
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault()
            handleNavigate('home')
          }}
          className="flex items-center gap-2 font-display text-2xl font-bold tracking-widest text-text transition-colors"
        >
          <span>SEAN QUINTIN</span>
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse-slow" />
        </a>

        <div className="hidden flex-1 justify-center md:flex">
          <ul className="flex flex-wrap items-center justify-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button
                  type="button"
                  onClick={() => handleNavigate(link.page)}
                  className={`relative text-sm font-medium transition duration-300 ${activePage === link.page ? 'text-text' : 'text-text-secondary hover:text-text'} group`}
                >
                  {link.name}
                  <span className={`absolute left-0 bottom-[-4px] h-0.5 bg-primary transition-all duration-300 ${activePage === link.page ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text transition hover:border-primary hover:text-primary"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.36-7.36-1.42 1.42M7.05 16.95l-1.42 1.42M19.78 16.95l-1.42-1.42M7.05 7.05 5.64 5.64M12 6a6 6 0 100 12 6 6 0 000-12Z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={onToggleMute}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text transition hover:border-primary hover:text-primary"
            aria-label={audioMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {audioMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M16.5 12a4.5 4.5 0 0 0-2.67-4.13v8.26A4.5 4.5 0 0 0 16.5 12Zm-2.57-6.15A8 8 0 0 1 18 12a8 8 0 0 1-4.07 6.83M5 9.5v5h4l5 5V4.5L9 9.5H5Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M16.5 12a4.5 4.5 0 0 0-2.67-4.13v8.26A4.5 4.5 0 0 0 16.5 12Zm-2.57-6.15A8 8 0 0 1 18 12a8 8 0 0 1-4.07 6.83M5 9.5v5h4l5 5V4.5L9 9.5H5Z" />
                <path d="M19 5 5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M5 5 19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text transition hover:border-primary hover:text-primary md:hidden"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-current transition duration-300 ${menuOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-6 bg-current transition duration-300 ${menuOpen ? 'opacity-0' : 'my-1.5'}`} />
            <span className={`block h-0.5 w-6 bg-current transition duration-300 ${menuOpen ? '-translate-y-1.5 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      <div className={`md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background/95 backdrop-blur-xl px-6 py-8 transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <ul className="flex flex-col items-center gap-6 text-2xl font-semibold text-text">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button
                type="button"
                onClick={() => handleNavigate(link.page)}
                className="text-text-secondary transition hover:text-text"
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text transition hover:border-primary hover:text-primary"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <button
            type="button"
            onClick={onToggleMute}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text transition hover:border-primary hover:text-primary"
            aria-label={audioMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {audioMuted ? '🔇' : '🔊'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
