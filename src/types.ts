export interface StatisticsResults {
  mean: number | null
  median: number | null
  mode: (number | null)[]
  range: number | null
  min: number | null
  max: number | null
  variance: number | null
  standardDeviation: number | null
  count?: number | null      // Added count for data summary
  sum?: number | null        // Added sum for data summary
  q1: number | null          // First quartile (25th percentile)
  q3: number | null          // Third quartile (75th percentile)
  iqr: number | null         // Interquartile range
  outliers: number[]         // Array of outlier values
}

export interface ChartDataPoint {
  value: number
  frequency: number
}

export interface DistributionDataPoint {
  value: number
  count: number
}

export interface FormulaInfo {
  title: string
  formula: string
  description: string
  steps: string[]
  example: string
  calculation: string
  notes: string
}

export interface FormulasCollection {
  [key: string]: FormulaInfo
}

export interface BreakdownState {
  mean: boolean
  median: boolean
  mode: boolean
  range: boolean
  min: boolean
  max: boolean
  variance: boolean
  standardDeviation: boolean
  q1: boolean              // Added quartile 1 breakdown
  q3: boolean              // Added quartile 3 breakdown
  iqr: boolean             // Added IQR breakdown
  outliers: boolean        // Added outliers breakdown
}