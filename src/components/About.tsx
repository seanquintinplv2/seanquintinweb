const skillGroups = [
  {
    title: 'Programming Languages',
    skills: ['C#', 'Java', 'JavaScript (ES6+)', 'TypeScript', 'PHP', 'HTML5', 'CSS3'],
  },
  {
    title: 'UI Assets & Visual Editing',
    skills: ['Figma', 'Canva', 'Piskel (for 2D games)', 'Capcut'],
  },
  {
    title: 'Technical Support',
    skills: ['Computer Troubleshooting', 'System Maintenance', 'Hardware/Software Support'],
  },
  {
    title: '3D Modeling & Rendering',
    skills: ['Blender', 'Onshape', 'Godot'],
  },
]

interface AboutProps {
  onNavigate?: (page: 'home' | 'about' | 'projects' | 'contact') => void
}

function About({ onNavigate }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-background-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-56 bg-[radial-gradient(circle_at_top,rgba(191,165,106,0.12),transparent_55%)]"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-16 items-start">
          <div className="grid gap-6">
            {skillGroups.map((group) => (
              <div key={group.title} className="rounded-[2rem] border border-border bg-surface p-6 shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
                <h3 className="text-sm uppercase tracking-[0.28em] text-text-muted mb-4">{group.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill) => (
                    <span key={skill} className="rounded-full bg-background-secondary px-4 py-2 text-sm text-text">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-primary mb-4">About Me</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              Transforming Ideas Into <span className="text-primary">Digital Reality</span>
            </h2>

            <div className="space-y-6 mb-10 text-text-secondary leading-relaxed">
              <p>
                Hello! I'm <strong className="text-text">Sean Quintin</strong>, a passionate designer and developer who builds immersive digital experiences for ambitious brands. My work brings thoughtful visuals, polished interaction, and strong technical foundations together in a refined package.
              </p>
              <p>
                With over 5 years of experience across creative direction, strategic branding, and bespoke web development, I help clients communicate confidently online and create products that feel premium from first glance.
              </p>
            </div>

            <div className="grid gap-4 mb-10 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-border bg-surface p-6">
                <h4 className="text-sm uppercase tracking-[0.28em] text-text-muted mb-3">Focus</h4>
                <p className="text-text">High-end digital experiences with strategic polish.</p>
              </div>
              <div className="rounded-[2rem] border border-border bg-surface p-6">
                <h4 className="text-sm uppercase tracking-[0.28em] text-text-muted mb-3">Approach</h4>
                <p className="text-text">Tailored visuals, intentional structure, and premium digital storytelling.</p>
              </div>
            </div>

            {onNavigate ? (
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-block rounded-full bg-primary px-8 py-4 text-black font-semibold hover:bg-primary-hover transition-all"
              >
                Let's Work Together
              </button>
            ) : (
              <a href="#contact" className="inline-block rounded-full bg-primary px-8 py-4 text-black font-semibold hover:bg-primary-hover transition-all">
                Let's Work Together
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About