interface PerformanceMetricsProps {
  comparisons: number
  swaps: number
  elapsedTime: number
  algorithm: string
}

export function PerformanceMetrics({ comparisons, swaps, elapsedTime, algorithm }: PerformanceMetricsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
      <div className="text-center">
        <div className="text-2xl font-bold">{comparisons}</div>
        <div className="text-sm text-muted-foreground">Comparisons</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">{swaps}</div>
        <div className="text-sm text-muted-foreground">Swaps</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">{elapsedTime.toFixed(2)}s</div>
        <div className="text-sm text-muted-foreground">Time</div>
      </div>
    </div>
  )
}

