import { partnershipAssets } from '../data/visualAssets'

function Partnership() {
  const benefits = [
    {
      icon: '🤝',
      title: 'Collaborative Approach',
      description: 'Work directly with me on your projects—no middlemen or teams. You get personalized attention and consistent communication.'
    },
    {
      icon: '💡',
      title: 'Creative Innovation',
      description: 'Bring fresh perspectives and thoughtful solutions to every project. I help brands stand out with refined concept work.'
    },
    {
      icon: '⚡',
      title: 'Dependable Delivery',
      description: 'I uphold timelines with clear planning and efficient execution so every collaboration stays on track.'
    },
    {
      icon: '🎯',
      title: 'Long-term Partnership',
      description: 'Build ongoing relationships with clients who value premium work, consistent quality, and future-ready digital support.'
    }
  ]

  return (
    <section id="partnership" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_top,rgba(191,165,106,0.12),transparent_55%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-primary mb-4">Partnership</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              Let's build meaningful digital work—<span className="text-primary">together</span>.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed max-w-3xl mb-12">
              I’m inviting thoughtful collaborations with brands and creators who want a polished digital presence, strategic storytelling, and a partner who cares about every detail.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 mb-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="rounded-[2rem] border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary">
                  <div className="text-3xl mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold text-text mb-3">{benefit.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>

            <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-primary px-10 py-4 text-black font-semibold shadow-[0_18px_45px_rgba(191,165,106,0.16)] transition-all hover:bg-primary-hover">
              Start a Conversation
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {partnershipAssets.map((asset) => (
              <div key={asset.label} className="overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
                <img src={asset.src} alt={asset.label} className="h-64 w-full object-cover" />
                <div className="p-5">
                  <p className="text-sm uppercase tracking-[0.28em] text-text-muted">{asset.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partnership