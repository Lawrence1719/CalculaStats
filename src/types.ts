export interface StatisticsResults {
  mean: number | null
  median: number | null
  mode: (number | null)[]
  range: number | null
  min: number | null
  max: number | null
  variance: number | null
  standardDeviation: number | null  // Added standard deviation
  count?: number | null  // Added count for data summary
  sum?: number | null    // Added sum for data summary
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
  standardDeviation: boolean  // Added standard deviation breakdown
}