"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ComplexityViewProps {
  algorithm: string
}

const complexityData: Record<string, { time: string; space: string }> = {
  bubble: { time: "O(n²)", space: "O(1)" },
  selection: { time: "O(n²)", space: "O(1)" },
  insertion: { time: "O(n²)", space: "O(1)" },
  merge: { time: "O(n log n)", space: "O(n)" },
  quick: { time: "O(n log n)", space: "O(log n)" },
  heap: { time: "O(n log n)", space: "O(1)" },
}

export function ComplexityView({ algorithm }: ComplexityViewProps) {
  const complexity = complexityData[algorithm]

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Time Complexity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <span className="font-medium">Worst case:</span> {complexity.time}
            </div>
            <div>
              <span className="font-medium">Average case:</span> {complexity.time}
            </div>
            <div>
              <span className="font-medium">Best case:</span>{" "}
              {algorithm === "bubble" || algorithm === "insertion" ? "O(n)" : complexity.time}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Space Complexity</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <span className="font-medium">Worst case:</span> {complexity.space}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

