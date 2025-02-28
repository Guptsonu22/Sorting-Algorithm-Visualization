interface SortingStep {
  array: number[]
  comparing?: number[]
  swapping?: number[]
}

export function getSortingSteps(algorithm: string, array: number[]): SortingStep[] {
  switch (algorithm) {
    case "bubble":
      return getBubbleSortSteps(array)
    case "selection":
      return getSelectionSortSteps(array)
    // Add other algorithms here
    default:
      return getBubbleSortSteps(array)
  }
}

function getBubbleSortSteps(array: number[]): SortingStep[] {
  const steps: SortingStep[] = []
  const arr = [...array]
  
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      steps.push({ array: [...arr], comparing: [j, j + 1] })
      
      if (arr[j] > arr[j + 1]) {
        steps.push({ array: [...arr], swapping: [j, j + 1] })
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        steps.push({ array: [...arr] })
      }
    }
  }
  
  return steps
}

function getSelectionSortSteps(array: number[]): SortingStep[] {
  const steps: SortingStep[] = []
  const arr = [...array]
  
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i
    
    for (let j = i + 1; j < arr.length; j++) {
      steps.push({ array: [...arr], comparing: [minIdx, j] })
      
      if (arr[j] < arr[minIdx]) {
        minIdx = j
      }
    }
    
    if (minIdx !== i) {
      steps.push({ array: [...arr], swapping: [i, minIdx] })
      ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
      steps.push({ array: [...arr] })
    }
  }
  
  return steps
}

