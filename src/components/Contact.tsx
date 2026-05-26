import { contactDecor, resumeAsset } from '../data/visualAssets'

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
                  <a href="mailto:seanquintin@example.com" className="text-text hover:text-primary transition-colors">seanquintin@example.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4 py-4 border-b border-border">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-2xl">📱</span>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">Phone</h4>
                  <a href="tel:+1234567890" className="text-text hover:text-primary transition-colors">+1 (234) 567-890</a>
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
                {['FB', 'TW', 'IG', 'LI'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="flex h-11 w-11 items-center justify-center rounded-3xl border border-border bg-surface text-sm font-semibold text-text-secondary transition-colors duration-300 hover:border-primary hover:text-primary"
                  >
                    {social}
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

            <div className="mt-10 space-y-4 rounded-[2rem] border border-border bg-background p-5">
              <div className="grid gap-3 sm:grid-cols-3">
                {contactDecor.map((item) => (
                  <div key={item.label} className="overflow-hidden rounded-3xl border border-border bg-surface">
                    <img src={item.src} alt={item.label} className="h-32 w-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="rounded-3xl border border-border bg-surface p-4">
                <p className="text-sm uppercase tracking-[0.28em] text-text-muted mb-2">Career portfolio</p>
                <a href={resumeAsset.pdf} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-black transition-all hover:bg-primary-hover">
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact