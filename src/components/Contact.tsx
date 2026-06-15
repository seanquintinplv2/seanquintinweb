const socialLinks = [
  {
    name: 'FB',
    href: 'https://www.facebook.com/Shinon.2324',
    icon: new URL('../../assets/fb.png', import.meta.url).href,
    alt: 'Facebook',
  },
  {
    name: 'IG',
    href: 'https://www.instagram.com/seaniee_quintin/',
    icon: new URL('../../assets/ig.png', import.meta.url).href,
    alt: 'Instagram',
  },
  {
    name: 'LI',
    href: 'https://www.linkedin.com/in/sean-quintin-de-guzman-28989636b/',
    icon: new URL('../../assets/li.png', import.meta.url).href,
    alt: 'LinkedIn',
  },
]

function Contact() {
  return (
    <section id="contact" className="py-24 bg-background-secondary relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top,rgba(241,228,200,0.14),transparent_50%)]"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-primary mb-4">Contact</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Let's <span className="text-primary">Connect</span>
            </h2>
            <p className="text-lg text-text-secondary mb-10 leading-relaxed">
              Have a project in mind or want to talk through creative ideas? Reach out and let's shape something sophisticated and memorable together.
            </p>

            <div className="space-y-1 mb-10 rounded-[2rem] border border-border bg-surface p-6">
              <div className="flex items-center gap-4 py-4 border-b border-border">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-2xl">📧</span>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">Email</h4>
                  <a href="mailto:seanquintin@example.com" className="text-text hover:text-primary transition-colors">seanquintindeguzman22@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4 py-4 border-b border-border">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-2xl">📱</span>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">Phone</h4>
                  <a href="tel:+639760519110" className="text-text hover:text-primary transition-colors">+63 9760519110</a>
                </div>
              </div>
              <div className="flex items-center gap-4 py-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-2xl">📍</span>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">Location</h4>
                  <span className="text-text">Philippines</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">Follow Me</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a 
                    key={social.name}
                    href={social.href}
                    className="flex h-11 w-11 items-center justify-center rounded-3xl border border-border bg-surface transition-colors duration-300 hover:border-primary"
                  >
                    <img src={social.icon} alt={social.alt} className="h-6 w-6 object-contain" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-surface p-8 shadow-[0_25px_70px_rgba(0,0,0,0.25)]">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Your name" 
                  required 
                  className="w-full rounded-3xl border border-border bg-background px-4 py-3.5 text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="your@email.com" 
                  required 
                  className="w-full rounded-3xl border border-border bg-background px-4 py-3.5 text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  placeholder="What's this about?" 
                  required 
                  className="w-full rounded-3xl border border-border bg-background px-4 py-3.5 text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  placeholder="Tell me about your project..." 
                  required 
                  className="w-full rounded-3xl border border-border bg-background px-4 py-3.5 text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full rounded-3xl bg-primary px-8 py-4 text-black font-medium transition-colors duration-300 hover:bg-primary-hover"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact