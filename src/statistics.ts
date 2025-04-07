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

  // Calculate quartiles
  // Q1 (25th percentile)
  const q1Index = Math.floor(sortedNumbers.length * 0.25)
  const q1 = sortedNumbers.length % 4 === 0 
    ? (sortedNumbers[q1Index - 1] + sortedNumbers[q1Index]) / 2 
    : sortedNumbers[q1Index]

  // Q3 (75th percentile)
  const q3Index = Math.floor(sortedNumbers.length * 0.75)
  const q3 = sortedNumbers.length % 4 === 0 
    ? (sortedNumbers[q3Index - 1] + sortedNumbers[q3Index]) / 2 
    : sortedNumbers[q3Index]

  // Calculate IQR (Interquartile Range)
  const iqr = q3 - q1

  // Calculate outliers (values below Q1 - 1.5*IQR or above Q3 + 1.5*IQR)
  const lowerBound = q1 - 1.5 * iqr
  const upperBound = q3 + 1.5 * iqr
  const outliers = sortedNumbers.filter(num => num < lowerBound || num > upperBound)

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
    sum,
    q1,
    q3,
    iqr,
    outliers
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