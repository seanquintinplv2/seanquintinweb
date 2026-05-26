import { useEffect, useRef } from 'react'

const profileImageSrc = new URL('../../assets/profile.jpg', import.meta.url).href

interface AboutProps {
  onNavigate?: (page: 'home' | 'about' | 'projects' | 'contact') => void
}

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

function About(_props: AboutProps) {
  // parallax tilt state
  const profileRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const target = useRef({ rx: 0, ry: 0 })
  const current = useRef({ rx: 0, ry: 0 })

  useEffect(() => {
    const el = profileRef.current
    if (!el) return

    const tick = () => {
      // lerp current toward target
      current.current.rx += (target.current.rx - current.current.rx) * 0.12
      current.current.ry += (target.current.ry - current.current.ry) * 0.12

      const rx = current.current.rx
      const ry = current.current.ry
      el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0) scale(${1 + Math.abs(ry) / 600})`

      rafRef.current = window.requestAnimationFrame(tick)
    }

    rafRef.current = window.requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = profileRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5 // -0.5 -> 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5

    // rotate limits
    const max = 16
    target.current.ry = relX * max * -1 // invert so movement feels natural
    target.current.rx = relY * max
  }

  const handleMouseLeave = () => {
    target.current.rx = 0
    target.current.ry = 0
  }

  // touch fallback: follow touch position
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    if (!touch) return
    const el = profileRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = (touch.clientX - rect.left) / rect.width - 0.5
    const relY = (touch.clientY - rect.top) / rect.height - 0.5
    const max = 12
    target.current.ry = relX * max * -1
    target.current.rx = relY * max
  }

  return (
    <section id="about" className="py-24 bg-background-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-56 bg-[radial-gradient(circle_at_top,rgba(191,165,106,0.12),transparent_55%)]"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-16 items-start">
          <div className="grid gap-6">
            <div className="space-y-6 mb-6 text-text-secondary leading-relaxed">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-tight">
                I'M <span className="text-primary">SEAN QUINTIN</span>
              </h1>

              <p className="text-base md:text-lg text-text-secondary">
                I’m a passionate designer, developer, and technology enthusiast who continuously explores different areas of IT to improve my creativity and technical skills. Over time, I discovered that design is the field that inspires me the most — creating visuals, interfaces, and digital experiences that are both meaningful and functional.
              </p>

              <p className="text-base md:text-lg text-text-secondary">
                I enjoy learning different approaches in web design, UI/UX, graphic design, and other creative work while continuously exploring new methods to improve my craft. Alongside design, I also have experience in programming, game development, and technical tasks that strengthened my problem-solving abilities and adaptability in technology.
              </p>

              <p className="text-base md:text-lg text-text-secondary">
                Beyond development and design, I also have hands-on experience in building PCs, troubleshooting systems, maintenance, cloning and optimizing computers, and providing technical support. I continue learning different aspects of IT because I believe combining creativity and technical knowledge helps create better digital solutions and allows me to grow into a more versatile technology professional.
              </p>
            </div>
          </div>

          <div>
             

            
              <div className="flex justify-center">
                <div
                  ref={profileRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleMouseLeave}
                  className="profile-card group w-full max-w-[18rem] aspect-square overflow-hidden rounded-[1rem] border border-border bg-surface shadow-[0_18px_40px_rgba(0,0,0,0.12)]"
                  aria-label="Profile"
                >
                  <img
                    src={profileImageSrc}
                    alt="Sean Quintin profile"
                    className="h-full w-full object-cover"
                    draggable="false"
                  />
                </div>
              </div>

              {/* skills moved under picture */}
              <div className="mt-8 rounded-[2rem] border border-border bg-surface p-6 shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
                <h3 className="text-sm uppercase tracking-[0.28em] text-text-muted mb-6">Additional Skills</h3>
                <div className="grid gap-6">
                  {skillGroups.map((group) => (
                    <div key={group.title} className="space-y-3">
                      <p className="text-xs uppercase tracking-[0.32em] text-text-muted">{group.title}</p>
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
              </div>
           

           
          </div>
        </div>
      </div>
    </section>
  )
}

export default About