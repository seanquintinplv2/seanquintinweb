import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  page: string
}

const customEasing = [0.4, 0, 0.2, 1]

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
  },
}

const pageTransition = {
  duration: 0.5,
  ease: customEasing as any,
  staggerChildren: 0.05,
  delayChildren: 0.1,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}

const containerTransition = {
  staggerChildren: 0.08,
  delayChildren: 0.15,
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
}

export function PageTransition({ children, page }: PageTransitionProps) {
  return (
    <motion.div
      key={page}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}

export function ContainerTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={containerTransition}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}

export function ItemTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div 
      variants={itemVariants}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {children}
    </motion.div>
  )
}
