import { StatisticsResults, ChartDataPoint, DistributionDataPoint } from './types';

// Format a number with appropriate decimal places
export const formatNumber = (num: number | null) => {
  if (num === null) return "N/A"
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(num)
}

// Calculate all statistics
export const calculateStatistics = (numbers: number[]): StatisticsResults => {
  // Calculate count and sum
  const count = numbers.length
  const sum = numbers.reduce((acc, num) => acc + num, 0)
  
  // Calculate mean
  const mean = sum / count

  // Calculate median
  const sortedNumbers = [...numbers].sort((a, b) => a - b)
  const middle = Math.floor(sortedNumbers.length / 2)
  const median =
    sortedNumbers.length % 2 === 0 ? (sortedNumbers[middle - 1] + sortedNumbers[middle]) / 2 : sortedNumbers[middle]

  // Calculate mode
  const frequency: Record<number, number> = {}
  numbers.forEach((num) => {
    frequency[num] = (frequency[num] || 0) + 1
  })

  let maxFrequency = 0
  for (const num in frequency) {
    if (frequency[num] > maxFrequency) {
      maxFrequency = frequency[num]
    }
  }

  const mode = Object.keys(frequency)
    .filter((num) => frequency[Number(num)] === maxFrequency)
    .map(Number)

  // Calculate min, max, and range
  const min = Math.min(...numbers)
  const max = Math.max(...numbers)
  const range = max - min

  // Calculate variance
  const variance = numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / numbers.length

  // Calculate standard deviation
  const standardDeviation = Math.sqrt(variance)

  return {
    mean,
    median,
    mode: maxFrequency === 1 ? [] : mode, // If all numbers appear once, there's no mode
    range,
    min,
    max,
    variance,
    standardDeviation,
    count,
    sum
  }
}

// Prepare data for the charts
export const prepareChartData = (numbers: number[]): ChartDataPoint[] => {
  if (numbers.length === 0) return []

  // Count frequency of each number
  const frequency: Record<number, number> = {}
  numbers.forEach((num) => {
    frequency[num] = (frequency[num] || 0) + 1
  })

  // Convert to chart data format
  return Object.keys(frequency)
    .map((num) => ({
      value: Number(num),
      frequency: frequency[Number(num)],
    }))
    .sort((a, b) => a.value - b.value)
}

// Prepare distribution data for line chart
export const prepareDistributionData = (numbers: number[]): DistributionDataPoint[] => {
  if (numbers.length === 0) return []

  const sortedNumbers = [...numbers].sort((a, b) => a - b)
  const min = sortedNumbers[0]
  const max = sortedNumbers[sortedNumbers.length - 1]

  // Create bins for the distribution
  const binCount = Math.min(10, max - min + 1)
  const binSize = (max - min) / binCount

  const bins: Record<number, number> = {}
  for (let i = 0; i < binCount; i++) {
    const binStart = min + i * binSize
    const binEnd = binStart + binSize
    const binCenter = (binStart + binEnd) / 2

    bins[binCenter] = 0

    // Count numbers in this bin
    numbers.forEach((num) => {
      if (num >= binStart && (num < binEnd || (i === binCount - 1 && num <= binEnd))) {
        bins[binCenter]++
      }
    })
  }

  return Object.keys(bins).map((center) => ({
    value: Number(center),
    count: bins[Number(center)],
  }))
}