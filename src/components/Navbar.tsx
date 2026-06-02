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
            className="hidden md:inline-flex h-8 sm:h-9 w-8 sm:w-9 items-center justify-center rounded-full bg-surface/90 text-text transition hover:bg-primary/15 hover:text-primary shadow-sm shadow-black/20"
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
            className="hidden md:inline-flex h-8 sm:h-10 min-w-[32px] sm:min-w-[44px] items-center justify-center rounded-2xl bg-surface/90 text-text transition hover:bg-primary/15 hover:text-primary shadow-sm shadow-black/20"
            aria-label={audioMuted ? 'Unmute audio' : 'Mute audio'}
            style={{ touchAction: 'manipulation' }}
          >
            <SoundBarIcon level={audioLevel} />
          </motion.button>

          {/* Mobile Menu Toggle */}
          {activePage !== 'home' && (
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
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && activePage !== 'home' && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col overflow-hidden rounded-l-[2.5rem] border-l border-border/40 bg-background/95 backdrop-blur-3xl shadow-[0_40px_120px_rgba(0,0,0,0.35)] md:hidden"
            >
              <div className="relative flex h-full flex-col justify-between px-5 pt-4 pb-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-end">
                    <motion.button
                      type="button"
                      onClick={() => setMenuOpen(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/60 bg-surface/90 text-text transition hover:border-primary/50 hover:text-primary"
                      aria-label="Close menu"
                    >
                      <X size={18} />
                    </motion.button>
                  </div>

                  <motion.ul className="space-y-3">
                    {navLinks.map((link, index) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.28, type: 'spring', stiffness: 280, damping: 24 }}
                      >
                        <motion.button
                          type="button"
                          onClick={() => handleNavigate(link.page)}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full rounded-3xl border px-5 py-4 text-left text-sm font-semibold transition-all duration-300 ${
                            activePage === link.page
                              ? 'border-primary/30 bg-primary/15 text-primary shadow-[inset_0_0_0_1px_rgba(191,165,106,0.12)]'
                              : 'border-border/60 bg-surface/90 text-text-secondary hover:border-primary/40 hover:bg-surface-hover hover:text-text'
                          }`}
                        >
                          {link.name}
                        </motion.button>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="grid gap-3"
                >
                  <motion.button
                    type="button"
                    onClick={onToggleTheme}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-3 rounded-3xl border border-border/60 bg-surface/90 px-4 py-4 text-sm font-semibold text-text transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                    aria-label="Toggle theme"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      {theme === 'dark' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79Z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                          <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.36-7.36-1.42 1.42M7.05 16.95l-1.42 1.42M19.78 16.95l-1.42-1.42M7.05 7.05 5.64 5.64M12 6a6 6 0 100 12 6 6 0 000-12Z" />
                        </svg>
                      )}
                    </span>
                    <span>Night mode</span>
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
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-3 rounded-3xl border border-border/60 bg-surface/90 px-4 py-4 text-sm font-semibold text-text transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                    aria-label={audioMuted ? 'Unmute audio' : 'Mute audio'}
                    style={{ touchAction: 'manipulation' }}
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <SoundBarIcon level={audioLevel} />
                    </span>
                    <span>{audioMuted ? 'Unmute audio' : 'Mute audio'}</span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </>
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
