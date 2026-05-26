let audioContext: AudioContext | null = null
let clickBuffer: AudioBuffer | null = null
const clickSoundUrl = new URL('../../assets/clicksound.mp3', import.meta.url).href

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
  if (!AudioContextClass) return null
  if (!audioContext) {
    audioContext = new AudioContext()
  }
  return audioContext
}

export const loadClickSound = async (): Promise<void> => {
  if (clickBuffer) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const response = await fetch(clickSoundUrl)
    const arrayBuffer = await response.arrayBuffer()
    clickBuffer = await ctx.decodeAudioData(arrayBuffer)
  } catch {
    clickBuffer = null
  }
}

export const playButtonClickSound = async (): Promise<void> => {
  const ctx = getAudioContext()
  if (!ctx) return

  if (ctx.state === 'suspended') {
    await ctx.resume().catch(() => {})
  }

  if (!clickBuffer) {
    await loadClickSound()
    if (!clickBuffer) return
  }

  const source = ctx.createBufferSource()
  source.buffer = clickBuffer
  source.connect(ctx.destination)
  source.start()
}
