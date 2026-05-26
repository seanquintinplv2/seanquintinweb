interface FooterProps {
  onNavigate?: (page: 'home' | 'about' | 'projects' | 'contact') => void
}

function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = [
    { name: 'Home', href: '#home', page: 'home' as const },
    { name: 'About', href: '#about', page: 'about' as const },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects', page: 'projects' as const },
    { name: 'Partnership', href: '#partnership' },
    { name: 'Contact', href: '#contact', page: 'contact' as const },
  ]

  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-3 pb-10 border-b border-border mb-10">
          <div className="max-w-xs">
            {onNavigate ? (
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="inline-flex items-center gap-2 font-display text-2xl font-bold tracking-widest text-text mb-4"
              >
                <span>SEAN QUINTIN</span>
                <span className="h-2.5 w-2.5 rounded-full bg-primary"></span>
              </button>
            ) : (
              <a href="#home" className="inline-flex items-center gap-2 font-display text-2xl font-bold tracking-widest text-text mb-4">
                <span>SEAN QUINTIN</span>
                <span className="h-2.5 w-2.5 rounded-full bg-primary"></span>
              </a>
            )}
            <p className="text-sm text-text-secondary leading-relaxed">
              Crafting premium digital experiences with elegant visuals and modern detail.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  {link.page && onNavigate ? (
                    <button
                      type="button"
                      onClick={() => onNavigate(link.page)}
                      className="text-sm text-text-secondary hover:text-primary hover:pl-1 transition-all"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a href={link.href} className="text-sm text-text-secondary hover:text-primary hover:pl-1 transition-all">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text mb-4">Get In Touch</h4>
            <p className="text-sm text-text-secondary mb-1">seanquintin@example.com</p>
            <p className="text-sm text-text-secondary mb-4">Philippines</p>
            {onNavigate ? (
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm text-text transition-all hover:border-primary hover:text-primary"
              >
                Contact or Resume
              </button>
            ) : (
              <a href="#contact" className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm text-text transition-all hover:border-primary hover:text-primary">
                Contact or Resume
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
          <p className="text-sm text-text-muted">© {currentYear} Sean Quintin. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3">
            {['FB', 'TW', 'IG', 'LI'].map((social) => (
              <a 
                key={social}
                href="#" 
                className="flex h-10 w-10 items-center justify-center rounded-3xl border border-border bg-surface text-xs font-semibold text-text-secondary transition-all hover:border-primary hover:text-primary"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer