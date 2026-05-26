import { serviceVisuals } from '../data/visualAssets'

const services = [
  {
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'Crafting intuitive interfaces with premium visual systems for memorable brand experiences.',
    features: ['Interface Design', 'User Research', 'Wireframing', 'Prototyping'],
    image: serviceVisuals[0].src,
  },
  {
    icon: '💻',
    title: 'Web Development',
    description: 'Building sleek, responsive websites with modern interactions and polished performance.',
    features: ['Frontend Development', 'Backend Development', 'CMS Integration', 'API Development'],
    image: serviceVisuals[1].src,
  },
  {
    icon: '📱',
    title: 'Mobile Apps',
    description: 'Designing cross-platform mobile experiences that feel premium, intuitive, and beautifully crafted.',
    features: ['iOS Development', 'Android Development', 'React Native', 'App Store Optimization'],
    image: serviceVisuals[2].src,
  },
  {
    icon: '🎯',
    title: 'Brand Identity',
    description: 'Developing distinctive brand systems that communicate clarity, confidence, and creative leadership.',
    features: ['Logo Design', 'Brand Strategy', 'Visual Identity', 'Brand Guidelines'],
    image: serviceVisuals[3].src,
  },
  {
    icon: '📊',
    title: 'Digital Marketing',
    description: 'Helping brands reach audiences with polished campaigns and thoughtful growth strategies.',
    features: ['SEO', 'Social Media', 'Content Strategy', 'Analytics'],
    image: serviceVisuals[4].src,
  },
  {
    icon: '🚀',
    title: 'E-Commerce',
    description: 'Creating elegant commerce platforms designed to convert with premium presentation and trust.',
    features: ['Store Development', 'Payment Integration', 'Inventory Management', 'Performance Optimization'],
    image: serviceVisuals[5].src,
  },
]

interface ServicesProps {
  onNavigate?: (page: 'home' | 'about' | 'projects' | 'contact') => void
}

function Services({ onNavigate }: ServicesProps) {
  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(241,228,200,0.12),transparent_50%)]"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-primary mb-4">Services</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            What I <span className="text-primary">Offer</span>
          </h2>
          <p className="text-lg text-text-secondary">
            Comprehensive digital solutions designed to help your brand feel more refined, cohesive, and visually captivating.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="group overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_20px_40px_rgba(0,0,0,0.25)] transition-all hover:-translate-y-2 hover:border-primary">
              <div className="relative h-52 overflow-hidden">
                <img src={service.image} alt={service.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.35em] text-accent">{service.title}</div>
              </div>
              <div className="p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-3xl bg-background-secondary text-2xl">{service.icon}</div>
                <p className="text-text-secondary mb-5 leading-relaxed">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-text-muted flex items-center gap-2">
                      <span className="text-primary">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                {onNavigate ? (
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary-hover"
                  >
                    Learn More <span className="ml-2">→</span>
                  </button>
                ) : (
                  <a href="#contact" className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary-hover">
                    Learn More <span className="ml-2">→</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services