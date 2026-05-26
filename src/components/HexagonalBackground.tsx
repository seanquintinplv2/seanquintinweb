import { useEffect, useRef } from 'react'

function HexagonalBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()

    const hexSize = 40
    const hexWidth = hexSize * 2
    const hexHeight = (Math.sqrt(3) / 2) * hexWidth

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mousePos.current.x = e.touches[0].clientX
        mousePos.current.y = e.touches[0].clientY
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('resize', setCanvasSize)

    const drawGlow = (x: number, y: number, radius: number, glowColor: string) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, glowColor)
      const fadedGlow = glowColor.replace(/rgba\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/, 'rgba($1,$2,$3,0.15)')
      gradient.addColorStop(0.5, fadedGlow)
      gradient.addColorStop(1, 'rgba(0,0,0,0)')

      ctx.fillStyle = gradient
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2)
    }

    let animationFrameId = 0
    const animate = () => {
      const rootStyles = getComputedStyle(document.documentElement)
      const canvasBg = rootStyles.getPropertyValue('--canvas-bg').trim() || '#04040f'
      const glowColor = rootStyles.getPropertyValue('--hexagon-glow').trim() || 'rgba(191, 165, 106, 0.35)'
      const dimColor = rootStyles.getPropertyValue('--hexagon-dim').trim() || '#6b6b54'

      ctx.fillStyle = canvasBg
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      drawGlow(mousePos.current.x, mousePos.current.y, 150, glowColor)

      const cols = Math.ceil(canvas.width / hexWidth) + 2
      const rows = Math.ceil(canvas.height / hexHeight) + 2

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * hexWidth + (row % 2) * (hexWidth / 2)
          const y = row * hexHeight * 0.75

          const dx = x - mousePos.current.x
          const dy = y - mousePos.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 300

          let opacity = 0.3
          if (distance < maxDistance) {
            opacity = 0.3 + (1 - distance / maxDistance) * 0.6
          }

          ctx.save()
          ctx.globalAlpha = opacity
          if (distance < maxDistance) {
            const blend = 1 - distance / maxDistance
            ctx.strokeStyle = `rgba(${Math.floor(191 + (255 - 191) * blend)}, ${Math.floor(165 + (200 - 165) * blend)}, ${Math.floor(106 + (100 - 106) * blend)}, 1)`
          } else {
            ctx.strokeStyle = dimColor
          }
          ctx.lineWidth = distance < maxDistance ? 2 : 1
          ctx.beginPath()

          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3
            const hx = x + hexSize * Math.cos(angle)
            const hy = y + hexSize * Math.sin(angle)
            if (i === 0) ctx.moveTo(hx, hy)
            else ctx.lineTo(hx, hy)
          }
          ctx.closePath()
          ctx.stroke()
          ctx.restore()
        }
      }

      animationFrameId = window.requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 block"
      style={{ pointerEvents: 'none' }}
    />
  )
}

export default HexagonalBackground
