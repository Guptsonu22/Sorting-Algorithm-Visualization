export function generateRandomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5)
}

export function generateReversedArray(size: number): number[] {
  return Array.from({ length: size }, (_, i) => size - i)
}

export function generateNearlySortedArray(size: number): number[] {
  const arr = Array.from({ length: size }, (_, i) => i + 1)
  // Swap ~10% of elements randomly
  const swaps = Math.floor(size * 0.1)
  for (let i = 0; i < swaps; i++) {
    const idx1 = Math.floor(Math.random() * size)
    const idx2 = Math.floor(Math.random() * size)
    ;[arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
  }
  return arr
}

export function parseManualInput(input: string): number[] | null {
  try {
    const numbers = input.split(",").map((num) => {
      const parsed = Number.parseInt(num.trim())
      if (isNaN(parsed)) throw new Error("Invalid number")
      return parsed
    })
    if (numbers.length === 0) throw new Error("Empty array")
    return numbers
  } catch (error) {
    return null
  }
}

