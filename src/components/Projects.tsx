import { featureAssets, visualAssets, videoAssets } from '../data/visualAssets'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

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
    tags: ['Brand', 'Web', 'Visual'],
    size: 'large'
  },
  {
    category: 'Motion Study',
    title: 'Final Expression Film',
    description: 'A cinematic motion piece showcasing expressive character design and fluid storytelling.',
    type: 'video',
    src: videoAssets.finalExpression,
    tags: ['Video', 'Animation', 'Art Direction'],
    size: 'medium'
  },
  {
    category: 'Interface Design',
    title: 'Interactive Gallery',
    description: 'A sleek interface concept that balances polished visuals with intuitive navigation.',
    type: 'image',
    src: featureAssets.website1,
    tags: ['UI', 'Experience', 'Design'],
    size: 'medium'
  },
  {
    category: 'Product Simulation',
    title: 'Visual System Simulation',
    description: 'A layered simulation concept combining motion, product imagery, and premium atmosphere.',
    type: 'video',
    src: videoAssets.simulationVideo,
    tags: ['Simulation', 'Motion', 'Concept'],
    size: 'small'
  },
  {
    category: 'Creative Concept',
    title: 'Golden Feather Studio',
    description: 'A refined creative identity built around premium visual cues and polished composition.',
    type: 'image',
    src: featureAssets.goldenFeather,
    tags: ['Creative', 'Identity', 'Art'],
    size: 'small'
  },
  {
    category: 'Visual Narrative',
    title: 'Front Car Concept',
    description: 'A sophisticated product portrait with bold lighting and premium mood.',
    type: 'image',
    src: featureAssets.frontCar,
    tags: ['Product', 'Illustration', 'Mood'],
    size: 'medium'
  }
]

const getSizeClasses = (size: string) => {
  switch(size) {
    case 'large': return 'md:col-span-2 md:row-span-2'
    case 'medium': return 'md:col-span-1 md:row-span-1'
    case 'small': return 'md:col-span-1 md:row-span-1'
    default: return 'md:col-span-1'
  }
}

const getImageHeight = (size: string) => {
  switch(size) {
    case 'large': return 'h-96 md:h-full'
    case 'medium': return 'h-72'
    case 'small': return 'h-64'
    default: return 'h-72'
  }
}

function ProjectCard({ project, index, onOpen }: { project: typeof featuredProjects[0], index: number, onOpen: () => void }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
      className={`${getSizeClasses(project.size)} group relative overflow-hidden rounded-2xl cursor-pointer`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onOpen}
    >
      {/* Background media */}
      <div className={`relative w-full ${getImageHeight(project.size)} overflow-hidden bg-background-tertiary`}>
        {project.type === 'video' ? (
          <video 
            src={project.src} 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover"
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => {
              e.currentTarget.pause()
              e.currentTarget.currentTime = 0
            }}
          />
        ) : (
          <img 
            src={project.src} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Base gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          animate={{ opacity: isHovered ? 0.95 : 0.6 }}
          transition={{ duration: 0.3 }}
        />

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content overlay */}
      <motion.div 
        className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 text-white"
        animate={{ y: isHovered ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <motion.span 
            className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3 px-3 py-1.5 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {project.category}
          </motion.span>
        </div>

        <motion.div
          animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">{project.title}</h3>
          <motion.p 
            className="text-sm md:text-base text-gray-200 leading-relaxed mb-4 line-clamp-2 md:line-clamp-none"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {project.description}
          </motion.p>

          {/* Tags */}
          <motion.div 
            className="flex flex-wrap gap-2"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            {project.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 font-medium"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Corner accent */}
      <motion.div 
        className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl"
        animate={{ scale: isHovered ? 1.2 : 1, opacity: isHovered ? 0.8 : 0.4 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

function ProjectModal({ project, onClose, onNext, onPrev }: { project: typeof featuredProjects[0] | null, onClose: () => void, onNext: () => void, onPrev: () => void }) {
  if (!project) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] mx-4 rounded-2xl overflow-hidden bg-background-secondary"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors backdrop-blur-md"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="max-h-[90vh] overflow-y-auto">
          {/* Media */}
          <div className="relative w-full bg-background-tertiary max-h-[60vh] overflow-hidden">
            {project.type === 'video' ? (
              <video 
                src={project.src}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : (
              <img 
                src={project.src} 
                alt={project.title}
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {/* Details */}
          <div className="p-8 md:p-12">
            <div className="flex items-start justify-between mb-6">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  {project.category}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-text mb-4 leading-tight">
                  {project.title}
                </h2>
              </div>
            </div>

            <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-2xl">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {project.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-4 py-2 rounded-full bg-background-tertiary border border-border text-text-secondary font-medium text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="sticky bottom-0 flex items-center justify-between p-6 bg-gradient-to-t from-background-secondary to-transparent border-t border-border">
          <button
            onClick={onPrev}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-border text-text hover:border-primary hover:text-primary transition-colors"
          >
            <span>←</span> Previous
          </button>

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full bg-primary text-white hover:bg-primary-hover transition-colors font-medium"
          >
            Close
          </button>

          <button
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-border text-text hover:border-primary hover:text-primary transition-colors"
          >
            Next <span>→</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Projects({ onNavigate }: ProjectsProps) {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)
  const selectedProject = selectedProjectIndex !== null ? featuredProjects[selectedProjectIndex] : null

  const handleNextProject = () => {
    if (selectedProjectIndex !== null) {
      setSelectedProjectIndex((selectedProjectIndex + 1) % featuredProjects.length)
    }
  }

  const handlePrevProject = () => {
    if (selectedProjectIndex !== null) {
      setSelectedProjectIndex((selectedProjectIndex - 1 + featuredProjects.length) % featuredProjects.length)
    }
  }

  return (
    <section id="projects" className="py-24 bg-background-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="inline-block text-sm font-semibold uppercase tracking-widest text-primary mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Portfolio
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Featured <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            A curated selection of premium work that demonstrates refined visual systems, polished digital interfaces, and imaginative storytelling.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max mb-16">
          {featuredProjects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index}
              onOpen={() => setSelectedProjectIndex(index)}
            />
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

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProjectIndex !== null && (
          <ProjectModal 
            project={selectedProject}
            onClose={() => setSelectedProjectIndex(null)}
            onNext={handleNextProject}
            onPrev={handlePrevProject}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects