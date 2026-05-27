import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

type Page = 'home' | 'about' | 'projects' | 'contact'

interface NavbarProps {
  activePage: Page
  onNavigate: (page: Page) => void
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  audioMuted: boolean
  audioLevel: number
  onToggleMute: () => void
}

const navLinks: Array<{ name: string; page: Page }> = [
  { name: 'Home', page: 'home' },
  { name: 'About', page: 'about' },
  { name: 'Projects', page: 'projects' },
  { name: 'Contact', page: 'contact' },
]

function Navbar({ activePage, onNavigate, theme, onToggleTheme, audioMuted, audioLevel, onToggleMute }: NavbarProps) {
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
    <motion.nav 
      initial={{ y: 0 }}
      animate={{ y: hideNav ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 ${scrolled ? 'bg-background/95 border-b border-border backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.12)]' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(event) => {
            event.preventDefault()
            handleNavigate('home')
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 font-display text-lg sm:text-xl lg:text-2xl font-bold tracking-widest text-text transition-colors flex-shrink-0"
        >
          <span className="hidden sm:inline">SEAN QUINTIN</span>
          <span className="sm:hidden text-base font-bold">SQ</span>
          <motion.span 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-2 w-2 rounded-full bg-primary"
          />
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center px-4 lg:px-8">
          <motion.ul className="flex items-center gap-3 lg:gap-8">
            {navLinks.map((link, index) => (
              <motion.li 
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <motion.button
                  type="button"
                  onClick={() => handleNavigate(link.page)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative text-xs sm:text-sm font-semibold transition-colors duration-300 px-3 py-2 rounded-lg ${activePage === link.page ? 'text-primary' : 'text-text-secondary hover:text-text'}`}
                >
                  {link.name}
                  
                  {/* Animated underline indicator */}
                  <motion.div 
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-primary/70 rounded-full"
                    animate={{ 
                      opacity: activePage === link.page ? 1 : 0,
                      scaleX: activePage === link.page ? 1 : 0
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 40 }}
                  />
                  
                  {/* Hover glow effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-lg bg-primary/10 -z-10"
                    animate={{ opacity: activePage === link.page ? 0.2 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* Theme Toggle */}
          <motion.button
            type="button"
            onClick={onToggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-8 sm:h-9 w-8 sm:w-9 items-center justify-center rounded-full bg-surface/90 text-text transition hover:bg-primary/15 hover:text-primary shadow-sm shadow-black/20"
            aria-label="Toggle theme"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'light' ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.36-7.36-1.42 1.42M7.05 16.95l-1.42 1.42M19.78 16.95l-1.42-1.42M7.05 7.05 5.64 5.64M12 6a6 6 0 100 12 6 6 0 000-12Z" />
                </svg>
              )}
            </motion.div>
          </motion.button>

          {/* Audio Toggle */}
          <motion.button
            type="button"
            onPointerDown={onToggleMute}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onToggleMute()
              }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="inline-flex h-8 sm:h-10 min-w-[32px] sm:min-w-[44px] items-center justify-center rounded-2xl bg-surface/90 text-text transition hover:bg-primary/15 hover:text-primary shadow-sm shadow-black/20"
            aria-label={audioMuted ? 'Unmute audio' : 'Mute audio'}
            style={{ touchAction: 'manipulation' }}
          >
            <SoundBarIcon level={audioLevel} />
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex h-9 sm:h-11 w-9 sm:w-11 items-center justify-center rounded-full border border-border bg-surface text-text transition hover:border-primary hover:text-primary md:hidden"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50"
          >
            <motion.ul className="flex flex-col items-center gap-2 px-4 py-6">
              {navLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="w-full"
                >
                  <motion.button
                    type="button"
                    onClick={() => handleNavigate(link.page)}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-center py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                      activePage === link.page 
                        ? 'bg-primary/20 text-primary border border-primary/30' 
                        : 'text-text-secondary hover:text-text hover:bg-surface/50'
                    }`}
                  >
                    <motion.div
                      animate={{ scale: activePage === link.page ? 1.05 : 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                    >
                      {link.name}
                    </motion.div>
                  </motion.button>
                </motion.li>
              ))}
            </motion.ul>

            {/* Mobile bottom controls */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex justify-center gap-3 px-4 pb-6"
            >
              <motion.button
                type="button"
                onClick={onToggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface/90 text-text transition hover:bg-primary/15 hover:text-primary shadow-sm shadow-black/20"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.36-7.36-1.42 1.42M7.05 16.95l-1.42 1.42M19.78 16.95l-1.42-1.42M7.05 7.05 5.64 5.64M12 6a6 6 0 100 12 6 6 0 000-12Z" />
                  </svg>
                )}
              </motion.button>
              <motion.button
                type="button"
                onPointerDown={onToggleMute}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onToggleMute()
                  }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="inline-flex h-10 min-w-[44px] items-center justify-center rounded-2xl bg-surface/90 text-text transition hover:bg-primary/15 hover:text-primary shadow-sm shadow-black/20"
                aria-label={audioMuted ? 'Unmute audio' : 'Mute audio'}
                style={{ touchAction: 'manipulation' }}
              >
                <SoundBarIcon level={audioLevel} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar

const SoundBarIcon = ({ level }: { level: number }) => {
  const baseHeights = [0.26, 0.55, 0.40, 0.72]
  const audioMuted = level === 0
  const normalized = audioMuted ? 0.08 : Math.max(0.08, Math.min(1, level * 1.2 + 0.08))

  return (
    <span className="inline-flex items-end justify-center gap-1">
      {baseHeights.map((base, index) => {
        const height = Math.max(4, Math.round((base + normalized * (index + 1) * 0.18) * 20))
        return (
          <motion.span
            key={index}
            className="block w-1.5 rounded-full bg-current"
            animate={{ height: `${height}px` }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            style={{ opacity: audioMuted ? 0.4 : 1 }}
          />
        )
      })}
    </span>
  )
}
