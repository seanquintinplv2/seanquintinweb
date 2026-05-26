type Page = 'home' | 'about' | 'projects' | 'contact'

const navLinks: Array<{ name: string; page: Page }> = [
  { name: 'Home', page: 'home' },
  { name: 'About', page: 'about' },
  { name: 'Projects', page: 'projects' },
  { name: 'Contact', page: 'contact' },
]

interface HeroProps {
  onNavigate: (page: Page) => void
}

function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center justify-center px-6 py-24">
      <div className="hero-overlay-glow" />
      <div className="hero-overlay-grid" />

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <p className="mb-8 text-xs md:text-sm uppercase tracking-[0.35em] text-text-muted opacity-90"></p>
        <h1 className="text-5xl md:text-6xl lg:text-[5.2rem] font-display uppercase tracking-[0.18em] leading-[0.95] text-text drop-shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
          SEAN QUINTIN
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm md:text-base uppercase tracking-[0.28em] text-text-secondary">
          GRAPHIC DESIGNER| FRONT-ENDDEVELOPER | 3D MODELING
        </p>

        <nav className="mt-14 inline-flex flex-wrap items-center justify-center gap-10 uppercase tracking-[0.28em] text-text-secondary">
          {navLinks.map((link) => (
            <button
              key={link.page}
              type="button"
              onClick={() => onNavigate(link.page)}
              className="group relative text-sm transition-all duration-300 hover:text-primary"
            >
              {link.name}
              <span className="absolute left-1/2 bottom-[-0.35rem] h-[1px] w-0 -translate-x-1/2 bg-primary transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>
      </div>
    </section>
  )
}

export default Hero
