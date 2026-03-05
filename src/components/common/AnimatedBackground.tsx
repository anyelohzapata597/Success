/**
 * Animated Winner Background Component
 * Features: Animated trophies, medals, and confetti celebrating success
 */
import { useEffect, useRef } from 'react'

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to window size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      rotation: number
      rotationSpeed: number
      icon: string
      size: number
      opacity: number
      age: number
      lifetime: number
    }

    const particles: Particle[] = []
    const icons = ['🏆', '🥇', '🥈', '🥉', '⭐', '✨', '🎖️', '👑']

    // Create initial particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 1 + 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.08,
        icon: icons[Math.floor(Math.random() * icons.length)],
        size: Math.random() * 15 + 20,
        opacity: Math.random() * 0.5 + 0.5,
        age: 0,
        lifetime: Math.random() * 3000 + 3000,
      })
    }

    let lastParticleTime = Date.now()

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const now = Date.now()

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]

        p.x += p.vx
        p.y += p.vy
        p.vy += 0.04
        p.rotation += p.rotationSpeed
        p.age += 16

        // Fade out end
        if (p.age > p.lifetime * 0.7) {
          p.opacity = Math.max(0, p.opacity - 0.02)
        }

        // Draw
        if (p.opacity > 0) {
          try {
            ctx.save()
            ctx.globalAlpha = p.opacity
            ctx.font = `${p.size}px Arial`
            ctx.translate(p.x, p.y)
            ctx.rotate(p.rotation)
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(p.icon, 0, 0)
            ctx.restore()
          } catch (e) {
            console.error('Canvas draw error:', e)
          }
        }

        if (p.age > p.lifetime) {
          particles.splice(i, 1)
        }
      }

      // Create new particles
      if (now - lastParticleTime > 250) {
        particles.push({
          x: Math.random() * canvas.width,
          y: -30,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 1 + 0.5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.08,
          icon: icons[Math.floor(Math.random() * icons.length)],
          size: Math.random() * 15 + 20,
          opacity: Math.random() * 0.5 + 0.5,
          age: 0,
          lifetime: Math.random() * 3000 + 3000,
        })
        lastParticleTime = now
      }

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
      }}
    />
  )
}
