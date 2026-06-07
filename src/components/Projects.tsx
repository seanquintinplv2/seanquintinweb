import { featureAssets, videoAssets } from '../data/visualAssets'
import { AnimatePresence, motion } from 'framer-motion'
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
  websiteUrl?: string
}

const featuredProjects: ProjectItem[] = [
  {
    category: 'Website',
    title: 'Malanday Edutrack',
    description: 'Developed a web-based document request system with QR code integration for faster processing and verification.',
    type: 'image',
    src: featureAssets.malanday,
    tags: ['School Website', 'QR Code', 'Database'],
    size: 'large',
    websiteUrl: 'https://malanday-edutrack-tau.vercel.app/'
  },
  {
    category: 'Website',
    title: 'Kamora',
    description: 'Developed a modern restaurant frontend interface emphasizing responsive design and user-centered experience.',
    type: 'image',
    src: featureAssets.kamora,
    tags: ['Restaurant UI', 'Responsive', 'Design', 'Commission','Prototype'],
    size: 'medium',
    websiteUrl: 'https://kamora.netlify.app/'
  },
  {
    category: 'Website ',
    title: 'PaWook Ui',
    description: 'A refined creative identity built around premium visual cues and polished composition.',
    type: 'image',
    src: featureAssets.website1,
    tags: ['Prototype', 'UI', 'Website'],
    size: 'small'
  },
  {
    category: '3D',
    title: 'low Poly & High Poly Car Concept',
    description: 'A sophisticated product portrait with bold lighting and premium mood.',
    type: 'image',
    src: featureAssets.frontCar,
    tags: ['Car', 'Sculpture', '3D ','Project','Blender'],
    size: 'medium'
  },


  
  {
    category: 'Simulation',
    title: 'Simulation Detector',
    description: 'A layered simulation concept combining motion, product imagery, and premium atmosphere.',
    type: 'video',
    src: videoAssets.simulationVideo,
    tags: ['Intern Project', '3D', 'Simulation','Blender'],
    size: 'small'
  }

  
]

const archiveProjects: ProjectItem[] = [
 {
    category: 'Character Modeling',
    title: 'Lexi Illustration',
    description: 'A character-focused creative study with expressive form and color.',
    type: 'image',
    src: new URL('../../assets/Lexi.png', import.meta.url).href,
    tags: ['Character', '3D', 'Blender'],
    size: 'small'
  },

  {
    category: 'Face Modelling',
    title: 'Creating Face Expression',
    description: 'A dynamic still frame exploring character and visual storytelling.',
    type: 'image',
    src: new URL('../../assets/expression.png', import.meta.url).href,
    tags: ['Visual', 'Expression', '3D', 'Blender'],
    size: 'small'
  },
 {
    category: 'Character Expression',
    title: 'Animating Expression',
    description: 'A polished asset showing a final art direction and character mood.',
    type: 'image',
    src: new URL('../../assets/finalizing expression.png', import.meta.url).href,
    tags: ['3D', 'Blender'],
    size: 'small'
  },

 
  {
    category: 'Video',
    title: 'Final Expression',
    description: 'A motion asset from the archive showcasing pacing, atmosphere, and storytelling.',
    type: 'video',
    src: new URL('../../assets/final expression.mp4', import.meta.url).href,
    tags: ['Animation', '3D', 'Blender'],
    size: 'small'
  },
  {
    category: 'Video',
    title: 'Animating Expression',
    description: 'A motion asset from the archive showcasing pacing, atmosphere, and storytelling.',
    type: 'video',
    src: new URL('../../assets/video expression.mp4', import.meta.url).href,
    tags: ['3D', 'Animation','Blender'],
    size: 'small'
  },
 {
    category: '3D',
    title: 'Lexi',
    description: 'An anatomy-driven sketch study with dynamic motion and gesture.',
    type: 'image',
    src: new URL('../../assets/pose1.png', import.meta.url).href,
    tags: ['Fantasy', '3D', 'Blender'],
    size: 'small'
  },
  {
    category: '3D',
    title: 'Lexi New Variant',
    description: 'A companion study exploring alternate character styling and form.',
    type: 'image',
    src: new URL('../../assets/lexi2.png', import.meta.url).href,
    tags: ['Horror', '3D', 'Blender'],
    size: 'small'
  },
 
  {
    category: '3D',
    title: 'Product Donut',
    description: 'A quirky product visual with bright color and motion-ready style.',
    type: 'image',
    src: new URL('../../assets/donut.png', import.meta.url).href,
    tags: ['Product', 'Illustration', 'Visual'],
    size: 'small'
  },
  {
    category: 'Game Assets',
    title: 'Tears of Forgotten',
    description: 'A dramatic illustration exploring memory and emotion.',
    type: 'image',
    src: new URL('../../assets/tears of forgotten.png', import.meta.url).href,
    tags: ['Collectible', 'Power-ups', '2D'],
    size: 'small'
  },
  {
    category: 'Game Assets',
    title: 'Burning Coal',
    description: 'A bold study in contrast, lighting, and refined graphic tone.',
    type: 'image',
    src: new URL('../../assets/Burning coal.png', import.meta.url).href,
    tags: ['Collectible', 'Power-ups', '2D'],
    size: 'medium'
  },
  {
    category: 'Game Assets',
    title: 'Golden Feather',
    description: 'A premium visual identity asset with polished texture and mood.',
    type: 'image',
    src: new URL('../../assets/Golden Feather.png', import.meta.url).href,
    tags: ['Collectible', 'Power-ups', '2D'],
    size: 'small'
  },
  {
    category: 'Game Assets',
    title: 'Latern of Courage',
    description: 'A creative illustration exploring light, narrative, and atmosphere.',
    type: 'image',
    src: new URL('../../assets/Latern of Courage.png', import.meta.url).href,
    tags: ['Collectible', 'Power-ups', '2D'],
    size: 'small'
  },
 
  {
    category: 'Game Assets',
    title: 'Digital Anger',
    description: 'A conceptual piece with dramatic energy and visual impact.',
    type: 'image',
    src: new URL('../../assets/anger.png', import.meta.url).href,
    tags: ['Character ', '2D','Emotion', 'Concept'],
    size: 'small'
  },
  
  
  
  {
    category: 'Game Assets',
    title: 'Fear',
    description: 'A moody creative piece built around dramatic visual emotion.',
    type: 'image',
    src: new URL('../../assets/fear.png', import.meta.url).href,
    tags: ['Character ', '2D','Emotion'],
    size: 'small'
  },
 
  {
    category: 'Game Assets',
    title: 'Joy ',
    description: 'A vibrant piece with energetic color and joyful visual storytelling.',
    type: 'image',
    src: new URL('../../assets/joy.png', import.meta.url).href,
    tags: ['Emotion', '2D', 'Character'],
    size: 'small'
  },
  
  {
    category: 'Game Assets',
    title: 'Sadness',
    description: 'A portrait piece emphasizing mood and emotional detail.',
    type: 'image',
    src: new URL('../../assets/sad.png', import.meta.url).href,
    tags: ['Player','Character ', '2D','Emotion'],
    size: 'small'
  },
  
]

const allProjects: ProjectItem[] = [...featuredProjects, ...archiveProjects]

function ProjectCard({ project, onOpen }: { project: ProjectItem, onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group overflow-hidden rounded-[1.75rem] border border-border bg-background-tertiary text-left transition-all duration-200 hover:-translate-y-1 hover:border-primary"
    >
      <div className="h-52 overflow-hidden bg-black/5">
        {project.type === 'video' ? (
          <video className="h-full w-full object-cover" src={project.src} muted loop playsInline />
        ) : (
          <img className="h-full w-full object-cover" src={project.src} alt={project.title} />
        )}
      </div>
      <div className="p-5 space-y-3">
        <p className="text-xs uppercase tracking-[0.28em] text-primary/80">{project.category}</p>
        <h3 className="text-xl font-semibold text-text">{project.title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="rounded-full bg-background-secondary px-3 py-1 text-xs text-text-secondary">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}

function ProjectModal({ project, onClose, onNext, onPrev }: { project: ProjectItem | null, onClose: () => void, onNext: () => void, onPrev: () => void }) {
  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const scrollY = window.scrollY || window.pageYOffset || 0
    const prev = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight
    }

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`

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
      document.body.style.position = prev.position
      document.body.style.top = prev.top
      document.body.style.left = prev.left
      document.body.style.width = prev.width
      document.body.style.overflow = prev.overflow
      document.body.style.paddingRight = prev.paddingRight
      window.scrollTo(0, scrollY)
    }
  }, [onClose])

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0
  }, [project])

  if (!project) return null

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[1100px] max-h-[90vh] overflow-hidden rounded-[2rem] bg-background-secondary shadow-2xl border border-white/10"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="grid min-h-[26rem] grid-cols-1 gap-6 overflow-hidden md:grid-cols-[1.8fr_1fr] p-6">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-background-tertiary md:max-h-[70vh]">
            {project.type === 'video' ? (
              <video src={project.src} controls autoPlay className="h-full w-full object-contain" />
            ) : (
              <img src={project.src} alt={project.title} className="h-full w-full object-contain" />
            )}
          </div>

          <div className="flex min-h-0 flex-col justify-between rounded-[1.75rem] bg-background-secondary">
            <div ref={contentRef} className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-2 text-[0.7rem] uppercase tracking-[0.24em] text-primary border border-primary/20">
                {project.category}
              </span>
              <h2 id="project-modal-title" className="mt-5 text-3xl font-bold text-text">
                {project.title}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-text-secondary">{project.description}</p>

              <div className="mt-8">
                <p className="text-sm uppercase tracking-[0.24em] text-gray-400 mb-3">Key features</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="rounded-full bg-background-tertiary px-3 py-2 text-xs font-medium text-text-secondary border border-border">
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
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-hover"
                >
                  Open PDF Preview
                </a>
              )}
            </div>

            <div className="border-t border-border bg-background-secondary p-4 md:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={onPrev}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-sm font-medium text-text hover:border-primary hover:text-primary"
                >
                  ← Previous
                </button>

                {project.websiteUrl ? (
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-hover"
                  >
                    Visit Website
                  </a>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={onNext}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-sm font-medium text-text hover:border-primary hover:text-primary"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
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
    <section id="projects" className="py-24 bg-background-secondary">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-14 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-primary/80 mb-4">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-text">Projects</h2>
          <p className="mx-auto max-w-2xl text-base text-text-secondary">
            Simple project cards with a clean modal layout. Edit the content and styles directly here.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {allProjects.map((project, index) => (
            <ProjectCard key={index} project={project} onOpen={() => handleOpenProject(index)} />
          ))}
        </div>
      </div>

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
