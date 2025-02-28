"use client"

import { useEffect, useRef } from "react"

export function useSoundEffects() {
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    audioContextRef.current = new AudioContext()
    return () => {
      audioContextRef.current?.close()
    }
  }, [])

  const playComparisonSound = () => {
    if (audioContextRef.current) {
      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)

      oscillator.frequency.value = 440
      gainNode.gain.value = 0.1

      oscillator.start()
      oscillator.stop(audioContextRef.current.currentTime + 0.1)
    }
  }

  const playSwapSound = () => {
    if (audioContextRef.current) {
      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)

      oscillator.frequency.value = 880
      gainNode.gain.value = 0.1

      oscillator.start()
      oscillator.stop(audioContextRef.current.currentTime + 0.1)
    }
  }

  return { playComparisonSound, playSwapSound }
}

