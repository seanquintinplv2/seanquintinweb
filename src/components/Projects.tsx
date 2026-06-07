import { featureAssets, visualAssets, videoAssets } from '../data/visualAssets'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type ProjectItem = {
  category: string
  title: string
  description: string
  type: 'image' | 'video' | 'pdf'
  src: string
  tags: string[]
  size: 'large' | 'medium' | 'small'
  pdfSrc?: string
}

const featuredProjects: ProjectItem[] = [
  {
    category: 'Website',
    title: 'Malanday Edutrack',
    description: 'Developed a web-based document request system with QR code integration for faster processing and verification.',
    type: 'image',
    src: featureAssets.malanday,
    tags: ['Database', 'School Website', 'QR Code'],
    size: 'large'
  },
  {
    category: 'Website',
    title: 'PaWook Website UI',
    description: 'Developed a fast-food restaurant frontend interface with responsive design and user-centered experience. ',
    type: 'image',
    src: featureAssets.website1,
    tags: ['Website', 'UI Design', 'User Experience'],
    size: 'medium'
  },
  {
    category: 'Website',
    title: 'Kamora',
    description: 'Developed a modern restaurant frontend interface emphasizing responsive design and user-centered experience.',
    type: 'image',
    src: featureAssets.kamora,
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

const archiveProjects: ProjectItem[] = visualAssets.map((asset, index) => ({
  category: asset.type === 'video' ? 'Motion Archive' : asset.type === 'pdf' ? 'Document Archive' : 'Visual Archive',
  title: asset.title,
  description: asset.type === 'video'
    ? 'A motion asset from the archive showcasing pacing, atmosphere, and visual storytelling.'
    : asset.type === 'pdf'
      ? 'A stored document preview with archive details and downloadable access.'
      : 'A premium visual archive asset polished for presentation and storytelling.',
  type: asset.type as 'image' | 'video' | 'pdf',
  src: asset.type === 'pdf' ? asset.preview ?? asset.src : asset.src,
  pdfSrc: asset.type === 'pdf' ? asset.src : undefined,
  tags: [asset.type === 'video' ? 'Motion' : asset.type === 'pdf' ? 'PDF' : 'Visual', 'Archive'],
  size: index % 5 === 0 ? 'medium' : 'small'
}))

const allProjects: ProjectItem[] = [...featuredProjects, ...archiveProjects]

function ProjectCard({ project, index, onOpen }: { project: ProjectItem, index: number, onOpen: () => void }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
      className="group relative overflow-hidden rounded-[2rem] border border-border bg-background-tertiary shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.22)] cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onOpen}
    >
      {/* Background media */}
      <div className="relative aspect-[4/3] overflow-hidden bg-background-tertiary sm:aspect-[16/11]">
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

function ProjectModal({ project, onClose, onNext, onPrev }: { project: ProjectItem | null, onClose: () => void, onNext: () => void, onPrev: () => void }) {
  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Lock scroll by fixing the body in place and preserving scroll position
    const scrollY = window.scrollY || window.pageYOffset || 0

    const prev = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight
    }

    // Compensate for scrollbar disappearance to avoid layout shift
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    if (scrollBarWidth > 0) document.body.style.paddingRight = `${scrollBarWidth}px`

    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)

      // restore previous body styles
      document.body.style.position = prev.position
      document.body.style.top = prev.top
      document.body.style.left = prev.left
      document.body.style.width = prev.width
      document.body.style.overflow = prev.overflow
      document.body.style.paddingRight = prev.paddingRight

      // restore scroll position
      window.scrollTo(0, scrollY)
    }
  }, [onClose])

  useEffect(() => {
    // Reset internal scroll when a project opens
    if (contentRef.current) contentRef.current.scrollTop = 0
  }, [project])

  if (!project) return null

  const modal = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-[95vw] max-w-[1200px] max-h-[90vh] overflow-hidden rounded-[2rem] bg-background-secondary shadow-2xl border border-white/10"
      >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors backdrop-blur-md"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid min-h-[24rem] max-h-full grid-cols-1 gap-6 overflow-hidden p-0 md:grid-cols-[1.8fr_1fr] md:p-6">
            <div className="relative h-[24rem] overflow-hidden rounded-[1.75rem] bg-background-tertiary md:h-auto md:max-h-[60vh]">
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

            <div className="flex min-h-0 flex-col justify-between overflow-hidden rounded-[1.75rem] bg-background-secondary">
              <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-primary border border-primary/20">
                  {project.category}
                </span>

                <h2 id="project-modal-title" className="mt-5 text-3xl md:text-4xl font-bold text-text leading-tight">
                  {project.title}
                </h2>

                <p className="mt-5 text-sm md:text-base text-text-secondary leading-relaxed max-w-prose">
                  {project.description}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-background-tertiary p-4 border border-border">
                    <p className="text-[0.675rem] uppercase tracking-[0.24em] text-gray-400 mb-2">Type</p>
                    <p className="text-sm font-semibold text-text">{project.type === 'pdf' ? 'PDF Document' : project.type === 'video' ? 'Video Presentation' : 'Image Showcase'}</p>
                  </div>
                  <div className="rounded-3xl bg-background-tertiary p-4 border border-border">
                    <p className="text-[0.675rem] uppercase tracking-[0.24em] text-gray-400 mb-2">Scope</p>
                    <p className="text-sm font-semibold text-text">{project.tags.join(' · ')}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-sm uppercase tracking-[0.24em] text-gray-400 mb-3">Key features</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-background-tertiary px-3 py-2 text-xs font-medium text-text-secondary border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {project.type === 'pdf' && project.pdfSrc && (
                  <a
                    href={project.pdfSrc}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                  >
                    Open PDF Preview
                  </a>
                )}
              </div>

              <div className="border-t border-border p-4 md:p-6 bg-background-secondary">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    onClick={onPrev}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary"
                  >
                    ← Previous
                  </button>

                  <button
                    onClick={onClose}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                  >
                    Close
                  </button>

                  <button
                    onClick={onNext}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>
      </motion.div>
    </motion.div>
  )

  return createPortal(modal, document.body)
}

type ProjectsProps = {
  onNavigate?: (page: 'home' | 'about' | 'projects' | 'contact') => void
}

function Projects(_props: ProjectsProps): JSX.Element {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)
  const selectedProject = selectedProjectIndex !== null ? allProjects[selectedProjectIndex] : null

  const handleOpenProject = (index: number) => {
    setSelectedProjectIndex(index)
  }

  const handleNextProject = () => {
    if (selectedProjectIndex !== null) {
      setSelectedProjectIndex((selectedProjectIndex + 1) % allProjects.length)
    }
  }

  const handlePrevProject = () => {
    if (selectedProjectIndex !== null) {
      setSelectedProjectIndex((selectedProjectIndex - 1 + allProjects.length) % allProjects.length)
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
          className="text-center max-w-2xl mx-auto mb-16"
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
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed">
            Explore a curated selection of responsive UI work, motion design, and visual asset concepts.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 mb-16">
          {allProjects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index}
              onOpen={() => handleOpenProject(index)}
            />
          ))}
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