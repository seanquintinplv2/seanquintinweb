import { featureAssets, visualAssets, videoAssets } from '../data/visualAssets'

interface ProjectsProps {
  onNavigate?: (page: 'home' | 'about' | 'projects' | 'contact') => void
}

const featuredProjects = [
  {
    category: 'Brand & Web',
    title: 'Malanday Concept System',
    description: 'A premium brand experience built for a modern digital platform with elevated visual storytelling.',
    type: 'image',
    src: featureAssets.malanday,
    tags: ['Brand', 'Web', 'Visual']
  },
  {
    category: 'Motion Study',
    title: 'Final Expression Film',
    description: 'A cinematic motion piece showcasing expressive character design and fluid storytelling.',
    type: 'video',
    src: videoAssets.finalExpression,
    tags: ['Video', 'Animation', 'Art Direction']
  },
  {
    category: 'Interface Design',
    title: 'Interactive Gallery',
    description: 'A sleek interface concept that balances polished visuals with intuitive navigation.',
    type: 'image',
    src: featureAssets.website1,
    tags: ['UI', 'Experience', 'Design']
  },
  {
    category: 'Product Simulation',
    title: 'Visual System Simulation',
    description: 'A layered simulation concept combining motion, product imagery, and premium atmosphere.',
    type: 'video',
    src: videoAssets.simulationVideo,
    tags: ['Simulation', 'Motion', 'Concept']
  },
  {
    category: 'Creative Concept',
    title: 'Golden Feather Studio',
    description: 'A refined creative identity built around premium visual cues and polished composition.',
    type: 'image',
    src: featureAssets.goldenFeather,
    tags: ['Creative', 'Identity', 'Art']
  },
  {
    category: 'Visual Narrative',
    title: 'Front Car Concept',
    description: 'A sophisticated product portrait with bold lighting and premium mood.',
    type: 'image',
    src: featureAssets.frontCar,
    tags: ['Product', 'Illustration', 'Mood']
  }
]

function Projects({ onNavigate }: ProjectsProps) {
  return (
    <section id="projects" className="py-24 bg-background-secondary relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-primary mb-4">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-lg text-text-secondary">
            A curated selection of premium work that demonstrates refined visual systems, polished digital interfaces, and imaginative storytelling.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <div key={index} className="group overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_24px_70px_rgba(0,0,0,0.25)] transition-colors duration-300 hover:border-primary hover:bg-surface/95">
              <div className="relative overflow-hidden bg-background-tertiary">
                {project.type === 'video' ? (
                  <video src={project.src} muted loop playsInline className="h-72 w-full object-cover" controls />
                ) : (
                  <img src={project.src} alt={project.title} className="h-72 w-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute left-6 top-6 rounded-full bg-background-secondary/70 px-4 py-2 text-xs uppercase tracking-[0.35em] text-accent">{project.category}</span>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-semibold text-text mb-3">{project.title}</h3>
                <p className="text-text-secondary leading-relaxed mb-5">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="rounded-full bg-background-tertiary px-3 py-1 text-xs uppercase tracking-[0.25em] text-text-muted">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          {onNavigate ? (
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center rounded-full border border-border-light px-8 py-3 text-text font-medium transition-all hover:border-primary hover:text-primary"
            >
              Commission a Premium Project
            </button>
          ) : (
            <a href="#contact" className="inline-flex items-center rounded-full border border-border-light px-8 py-3 text-text font-medium transition-all hover:border-primary hover:text-primary">
              Commission a Premium Project
            </a>
          )}
        </div>

        <div className="mt-24">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-block text-sm font-semibold uppercase tracking-widest text-primary mb-2">Visual Archive</span>
              <h3 className="text-3xl font-display font-bold text-text">Every existing asset brought into a cohesive premium gallery.</h3>
            </div>
            <div className="text-sm text-text-secondary">
              Hover through the collection to explore imagery, motion, and polished creative assets.
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visualAssets.map((asset, index) => (
              <article key={index} className="overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_18px_45px_rgba(0,0,0,0.20)] transition-colors duration-300 hover:border-primary/70 hover:bg-surface/95">
                {asset.type === 'image' && (
                  <img src={asset.src} alt={asset.title} className="h-64 w-full object-cover" />
                )}
                {asset.type === 'video' && (
                  <video src={asset.src} muted loop playsInline controls className="h-64 w-full object-cover" />
                )}
                {asset.type === 'pdf' && (
                  <a href={asset.src} target="_blank" rel="noreferrer" className="block h-64 overflow-hidden">
                    <img src={asset.preview} alt={asset.title} className="h-full w-full object-cover" />
                  </a>
                )}
                <div className="p-5 border-t border-border bg-background">
                  <h4 className="text-lg font-semibold text-text mb-2">{asset.title}</h4>
                  <p className="text-sm text-text-muted">{asset.type === 'pdf' ? 'Downloadable resume asset' : asset.type === 'video' ? 'Motion asset' : 'Visual asset'}</p>
                  {asset.type === 'pdf' && (
                    <a href={asset.src} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:text-primary-hover">
                      View PDF <span className="ml-2">↗</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects