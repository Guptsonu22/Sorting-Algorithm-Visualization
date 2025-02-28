"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { getSortingSteps } from "../lib/sorting-algorithms"
import { useSoundEffects } from "./sound-manager"
import { PerformanceMetrics } from "./performance-metrics"

interface AlgorithmVisualizerProps {
  arrays: { [key: string]: number[] }
  speed: number
  selectedAlgorithms: string[]
  isRunning: boolean
  setIsRunning: (isRunning: boolean) => void
}

export function AlgorithmVisualizer({
  arrays,
  speed,
  selectedAlgorithms,
  isRunning,
  setIsRunning,
}: AlgorithmVisualizerProps) {
  const [algorithmStates, setAlgorithmStates] = useState<{
    [key: string]: {
      array: number[]
      comparing: number[]
      swapping: number[]
      metrics: {
        comparisons: number
        swaps: number
        startTime: number
        elapsedTime: number
      }
    }
  }>({})
  const animationRef = useRef<NodeJS.Timeout>()
  const { playComparisonSound, playSwapSound } = useSoundEffects()

  useEffect(() => {
    const initialStates: typeof algorithmStates = {}
    selectedAlgorithms.forEach((algo) => {
      initialStates[algo] = {
        array: [...arrays[algo]],
        comparing: [],
        swapping: [],
        metrics: {
          comparisons: 0,
          swaps: 0,
          startTime: 0,
          elapsedTime: 0,
        },
      }
    })
    setAlgorithmStates(initialStates)
  }, [arrays, selectedAlgorithms])

  const handleSort = async () => {
    setIsRunning(true)
    const startTime = performance.now()

    const algorithmPromises = selectedAlgorithms.map(async (algorithm) => {
      const steps = getSortingSteps(algorithm, [...arrays[algorithm]])
      let comparisons = 0
      let swaps = 0

      for (const step of steps) {
        await new Promise<void>((resolve) => {
          animationRef.current = setTimeout(() => {
            setAlgorithmStates((prev) => ({
              ...prev,
              [algorithm]: {
                ...prev[algorithm],
                array: step.array,
                comparing: step.comparing || [],
                swapping: step.swapping || [],
                metrics: {
                  ...prev[algorithm].metrics,
                  comparisons: step.comparing ? comparisons++ : comparisons,
                  swaps: step.swapping ? swaps++ : swaps,
                  elapsedTime: (performance.now() - startTime) / 1000,
                },
              },
            }))

            if (step.comparing) playComparisonSound()
            if (step.swapping) playSwapSound()

            resolve()
          }, speed)
        })
      }
    })

    await Promise.all(algorithmPromises)
    setIsRunning(false)
  }

  const handleStop = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current)
    }
    setIsRunning(false)

    const resetStates: typeof algorithmStates = {}
    selectedAlgorithms.forEach((algo) => {
      resetStates[algo] = {
        array: [...arrays[algo]],
        comparing: [],
        swapping: [],
        metrics: {
          comparisons: 0,
          swaps: 0,
          startTime: 0,
          elapsedTime: 0,
        },
      }
    })
    setAlgorithmStates(resetStates)
  }

  const getProgress = (algorithm: string) => {
    const initialArray = arrays[algorithm]
    const currentArray = algorithmStates[algorithm]?.array
    if (!currentArray) return 0

    let sortedCount = 0
    for (let i = 0; i < currentArray.length - 1; i++) {
      if (currentArray[i] <= currentArray[i + 1]) sortedCount++
    }
    return (sortedCount / (initialArray.length - 1)) * 100
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-center gap-4">
        <Button onClick={handleSort} disabled={isRunning}>
          Start Sorting
        </Button>
        <Button variant="destructive" onClick={handleStop} disabled={!isRunning}>
          Stop
        </Button>
      </div>

      <div className="grid gap-8">
        {selectedAlgorithms.map((algorithm) => (
          <div key={algorithm} className="space-y-4">
            <h3 className="text-xl font-semibold text-center capitalize">{algorithm} Sort</h3>

            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-300"
                style={{ width: `${getProgress(algorithm)}%` }}
              />
            </div>

            <div className="flex justify-center items-end gap-2 h-64">
              {algorithmStates[algorithm]?.array.map((value, index) => (
                <div
                  key={index}
                  className={`w-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
                    ${
                      algorithmStates[algorithm].comparing.includes(index)
                        ? "bg-yellow-500"
                        : algorithmStates[algorithm].swapping.includes(index)
                          ? "bg-green-500"
                          : "bg-blue-500"
                    }`}
                  style={{
                    height: `${(value / Math.max(...algorithmStates[algorithm].array)) * 100}%`,
                    minHeight: "32px",
                  }}
                >
                  {value}
                </div>
              ))}
            </div>

            <PerformanceMetrics
              comparisons={algorithmStates[algorithm]?.metrics.comparisons || 0}
              swaps={algorithmStates[algorithm]?.metrics.swaps || 0}
              elapsedTime={algorithmStates[algorithm]?.metrics.elapsedTime || 0}
              algorithm={algorithm}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

