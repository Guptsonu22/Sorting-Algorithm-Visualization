"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateRandomArray, generateReversedArray, generateNearlySortedArray, parseManualInput } from "../lib/utils"

interface ArrayCustomizationProps {
  onArrayUpdate: (newArray: number[]) => void
  disabled?: boolean
}

const ARRAY_PRESETS = {
  small: 10,
  medium: 50,
  large: 100,
}

export function ArrayCustomization({ onArrayUpdate, disabled }: ArrayCustomizationProps) {
  const [arraySize, setArraySize] = useState<keyof typeof ARRAY_PRESETS>("small")
  const [manualInput, setManualInput] = useState("")
  const [error, setError] = useState("")
  const [currentArray, setCurrentArray] = useState(() => generateRandomArray(ARRAY_PRESETS.small))

  const updateArray = (newArray: number[]) => {
    setCurrentArray(newArray)
    onArrayUpdate(newArray)
    setError("")
  }

  const handleSizeChange = (newSize: keyof typeof ARRAY_PRESETS) => {
    setArraySize(newSize)
    updateArray(generateRandomArray(ARRAY_PRESETS[newSize]))
  }

  const handleManualInput = () => {
    const parsedArray = parseManualInput(manualInput)
    if (parsedArray) {
      updateArray(parsedArray)
    } else {
      setError("Invalid input. Please enter comma-separated numbers.")
    }
  }

  const handleGenerateArray = (type: "random" | "reversed" | "nearlySorted") => {
    const size = ARRAY_PRESETS[arraySize]
    let newArray: number[]

    switch (type) {
      case "random":
        newArray = generateRandomArray(size)
        break
      case "reversed":
        newArray = generateReversedArray(size)
        break
      case "nearlySorted":
        newArray = generateNearlySortedArray(size)
        break
      default:
        newArray = generateRandomArray(size)
    }

    updateArray(newArray)
  }

  return (
    <div className="space-y-6 p-6 bg-muted rounded-lg">
      <div className="space-y-2">
        <Label>Array Size Preset</Label>
        <Select
          value={arraySize}
          onValueChange={(value: keyof typeof ARRAY_PRESETS) => handleSizeChange(value)}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select array size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small (10 elements)</SelectItem>
            <SelectItem value="medium">Medium (50 elements)</SelectItem>
            <SelectItem value="large">Large (100 elements)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Manual Input (comma-separated numbers)</Label>
        <div className="flex gap-2">
          <Input
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            placeholder="Example: 5, 2, 8, 1, 9"
            disabled={disabled}
          />
          <Button onClick={handleManualInput} disabled={disabled}>
            Apply
          </Button>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <div className="space-y-2">
        <Label>Generate Array</Label>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => handleGenerateArray("random")} disabled={disabled}>
            Random
          </Button>
          <Button variant="outline" onClick={() => handleGenerateArray("reversed")} disabled={disabled}>
            Reversed
          </Button>
          <Button variant="outline" onClick={() => handleGenerateArray("nearlySorted")} disabled={disabled}>
            Nearly Sorted
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Current Array Preview</Label>
        <div className="p-4 bg-background rounded border overflow-x-auto">
          <div className="flex gap-1 flex-wrap">
            {currentArray.map((num, i) => (
              <span key={i} className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded">
                {num}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

