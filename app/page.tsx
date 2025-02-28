"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { AlgorithmVisualizer } from "./components/algorithm-visualizer"
import { CodeView } from "./components/code-view"
import { ComplexityView } from "./components/complexity-view"
import { generateRandomArray } from "./lib/utils"
import { ArrayCustomization } from "./components/array-customization"

export default function SortingVisualizer() {
  const [arrays, setArrays] = useState<{ [key: string]: number[] }>(() => {
    const initialSize = 10
    return {
      bubble: generateRandomArray(initialSize),
      selection: generateRandomArray(initialSize),
      insertion: generateRandomArray(initialSize),
      merge: generateRandomArray(initialSize),
      quick: generateRandomArray(initialSize),
      heap: generateRandomArray(initialSize),
    }
  })
  const [speed, setSpeed] = useState(500)
  const [arraySize, setArraySize] = useState(10)
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>(["bubble"])
  const [isRunning, setIsRunning] = useState(false)

  const algorithms = [
    { id: "bubble", name: "Bubble Sort" },
    { id: "selection", name: "Selection Sort" },
    { id: "insertion", name: "Insertion Sort" },
    { id: "merge", name: "Merge Sort" },
    { id: "quick", name: "Quick Sort" },
    { id: "heap", name: "Heap Sort" },
  ]

  const handleGenerateNewArray = () => {
    if (!isRunning) {
      const newArrays: typeof arrays = {}
      Object.keys(arrays).forEach((key) => {
        newArrays[key] = generateRandomArray(arraySize)
      })
      setArrays(newArrays)
    }
  }

  const handleAlgorithmToggle = (algorithmId: string) => {
    setSelectedAlgorithms((prev) => {
      if (prev.includes(algorithmId)) {
        return prev.filter((id) => id !== algorithmId)
      } else {
        return [...prev, algorithmId]
      }
    })
  }

  const handleArrayUpdate = (newArray: number[]) => {
    if (!isRunning) {
      const newArrays: typeof arrays = {}
      Object.keys(arrays).forEach((key) => {
        newArrays[key] = [...newArray]
      })
      setArrays(newArrays)
      setArraySize(newArray.length)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Sorting Algorithm Visualization</h1>

      <div className="max-w-7xl mx-auto space-y-8">
        <Card className="p-6">
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Speed (ms): {speed}</label>
              <Slider
                value={[speed]}
                onValueChange={(value) => setSpeed(value[0])}
                min={50}
                max={1000}
                step={50}
                disabled={isRunning}
              />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Array Customization</h2>
            <ArrayCustomization onArrayUpdate={handleArrayUpdate} disabled={isRunning} />
          </div>

          <div className="flex gap-2 mb-6">
            <Button variant="destructive" onClick={handleGenerateNewArray} disabled={isRunning}>
              Generate New Array
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {algorithms.map((algo) => (
              <div key={algo.id} className="flex items-center space-x-2">
                <Checkbox
                  id={algo.id}
                  checked={selectedAlgorithms.includes(algo.id)}
                  onCheckedChange={() => handleAlgorithmToggle(algo.id)}
                  disabled={isRunning}
                />
                <label
                  htmlFor={algo.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {algo.name}
                </label>
              </div>
            ))}
          </div>

          <Tabs defaultValue="visualization" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="visualization">Visualization</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsTrigger value="complexity">Complexity</TabsTrigger>
            </TabsList>
            <TabsContent value="visualization">
              <AlgorithmVisualizer
                arrays={arrays}
                speed={speed}
                selectedAlgorithms={selectedAlgorithms}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
              />
            </TabsContent>
            <TabsContent value="code">
              <CodeView algorithm={selectedAlgorithms[0]} />
            </TabsContent>
            <TabsContent value="complexity">
              <ComplexityView algorithm={selectedAlgorithms[0]} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

