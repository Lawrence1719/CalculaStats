import { FormulasCollection } from './types';

// Formula explanations
export const formulas: FormulasCollection = {
  mean: {
    title: "Mean (Average)",
    formula: "μ = (x₁ + x₂ + ... + xₙ) / n",
    description:
      "The mean is the sum of all values divided by the number of values. It represents the central tendency of the data.",
    steps: ["Add up all the values in your dataset", "Divide the sum by the number of values"],
    example: "For the dataset [2, 4, 6, 8, 10]:",
    calculation: "(2 + 4 + 6 + 8 + 10) / 5 = 30 / 5 = 6",
    notes: "The mean is sensitive to outliers and extreme values, which can skew the result.",
  },
  median: {
    title: "Median",
    formula: "For odd n: middle value\nFor even n: average of two middle values",
    description:
      "The median is the middle value when the data is arranged in order. It divides the dataset into two equal halves.",
    steps: [
      "Sort all values in ascending order",
      "If there's an odd number of values, take the middle one",
      "If there's an even number of values, take the average of the two middle values",
    ],
    example: "For the dataset [2, 4, 6, 8, 10]:",
    calculation: "Sorted: [2, 4, 6, 8, 10]\nMiddle value: 6",
    notes: "The median is less sensitive to outliers than the mean, making it useful for skewed distributions.",
  },
  mode: {
    title: "Mode",
    formula: "Value(s) that appear most frequently",
    description:
      "The mode is the value or values that appear most frequently in the dataset. A dataset can have one mode, multiple modes, or no mode.",
    steps: ["Count the frequency of each value in the dataset", "Identify the value(s) with the highest frequency"],
    example: "For the dataset [2, 4, 4, 6, 8, 8, 8, 10]:",
    calculation: "Frequencies: 2(1), 4(2), 6(1), 8(3), 10(1)\nMode: 8",
    notes:
      "If all values appear with the same frequency, there is no mode. If multiple values have the same highest frequency, the dataset is multimodal.",
  },
  range: {
    title: "Range",
    formula: "Range = Maximum value - Minimum value",
    description:
      "The range measures the spread or dispersion of the data. It is the difference between the largest and smallest values.",
    steps: [
      "Find the maximum value in the dataset",
      "Find the minimum value in the dataset",
      "Subtract the minimum from the maximum",
    ],
    example: "For the dataset [2, 4, 6, 8, 10]:",
    calculation: "Maximum: 10\nMinimum: 2\nRange: 10 - 2 = 8",
    notes:
      "The range is simple to calculate but is sensitive to outliers and doesn't provide information about the distribution of values between the extremes.",
  },
  min: {
    title: "Minimum",
    formula: "min(x₁, x₂, ..., xₙ)",
    description: "The minimum is the smallest value in the dataset.",
    steps: ["Compare all values in the dataset", "Identify the smallest value"],
    example: "For the dataset [2, 4, 6, 8, 10]:",
    calculation: "Minimum: 2",
    notes: "The minimum is useful for understanding the lower bound of your data.",
  },
  max: {
    title: "Maximum",
    formula: "max(x₁, x₂, ..., xₙ)",
    description: "The maximum is the largest value in the dataset.",
    steps: ["Compare all values in the dataset", "Identify the largest value"],
    example: "For the dataset [2, 4, 6, 8, 10]:",
    calculation: "Maximum: 10",
    notes: "The maximum is useful for understanding the upper bound of your data.",
  },
  variance: {
    title: "Variance",
    formula: "σ² = Σ(xᵢ - μ)² / n",
    description:
      "Variance measures how far each value in the dataset is from the mean. It's the average of the squared differences from the mean.",
    steps: [
      "Calculate the mean (μ) of the dataset",
      "For each value, subtract the mean and square the result",
      "Sum all the squared differences",
      "Divide by the number of values",
    ],
    example: "For the dataset [2, 4, 6, 8, 10] with mean = 6:",
    calculation: "[(2-6)² + (4-6)² + (6-6)² + (8-6)² + (10-6)²] / 5\n= [16 + 4 + 0 + 4 + 16] / 5\n= 40 / 5 = 8",
    notes:
      "A larger variance indicates greater dispersion of the data. The standard deviation (σ) is the square root of the variance and is often used because it's in the same units as the original data.",
  },
  standardDeviation: {
    title: "Standard Deviation",
    formula: "σ = √(σ²) = √[Σ(xᵢ - μ)² / n]",
    description:
      "Standard deviation is the square root of the variance. It measures the average distance between each data point and the mean.",
    steps: [
      "Calculate the variance (σ²) of the dataset",
      "Take the square root of the variance",
    ],
    example: "For the dataset [2, 4, 6, 8, 10] with variance = 8:",
    calculation: "σ = √(8) = 2.83",
    notes:
      "Standard deviation is in the same units as the original data, making it more interpretable than variance. A smaller standard deviation indicates that the values are clustered closer to the mean.",
  },
  q1: {
    title: "First Quartile (Q1)",
    formula: "Q1 = Median of the lower half of the dataset",
    description:
      "Q1 (the first quartile) is the median of the lower half of the dataset. It marks the 25th percentile.",
    steps: [
      "Sort the dataset in ascending order",
      "Find the median of the lower half (excluding the median if the dataset size is odd)"
    ],
    example: "For the dataset [2, 4, 6, 8, 10]:",
    calculation: "Lower half: [2, 4] → Q1 = (2 + 4) / 2 = 3",
    notes: "Q1 helps identify the lower spread of the data and is used in computing IQR."
  },
  q2: {
    title: "Second Quartile (Q2 / Median)",
    formula: "Q2 = Median of the dataset",
    description: "Q2 is the 50th percentile of the dataset, which is the same as the median.",
    steps: [
      "Sort the dataset in ascending order",
      "If odd number of items: Q2 = middle value",
      "If even: Q2 = average of the two middle values"
    ],
    example: "For [2, 4, 6, 8, 10]:",
    calculation: "Sorted: [2, 4, 6, 8, 10] → Q2 = 6",
    notes: "Q2 divides the dataset into two equal halves."
  },
  q3: {
    title: "Third Quartile (Q3)",
    formula: "Q3 = Median of the upper half of the dataset",
    description:
      "Q3 (the third quartile) is the median of the upper half of the dataset. It marks the 75th percentile.",
    steps: [
      "Sort the dataset in ascending order",
      "Find the median of the upper half (excluding the median if the dataset size is odd)"
    ],
    example: "For the dataset [2, 4, 6, 8, 10]:",
    calculation: "Upper half: [8, 10] → Q3 = (8 + 10) / 2 = 9",
    notes: "Q3 helps identify the upper spread of the data and is used in computing IQR."
  },
  iqr: {
    title: "Interquartile Range (IQR)",
    formula: "IQR = Q3 - Q1",
    description:
      "The IQR measures the range of the middle 50% of the data. It is the difference between the third and first quartiles.",
    steps: [
      "Find Q1 (25th percentile)",
      "Find Q3 (75th percentile)",
      "Subtract Q1 from Q3"
    ],
    example: "If Q1 = 3 and Q3 = 9:",
    calculation: "IQR = 9 - 3 = 6",
    notes: "The IQR is a robust measure of spread that is not affected by outliers."
  },
  outliers: {
    title: "Outliers",
    formula: "Outliers < Q1 - 1.5×IQR or > Q3 + 1.5×IQR",
    description:
      "Outliers are data points that lie significantly outside the range of the rest of the data.",
    steps: [
      "Calculate Q1 and Q3",
      "Compute IQR = Q3 - Q1",
      "Lower bound = Q1 - 1.5 × IQR",
      "Upper bound = Q3 + 1.5 × IQR",
      "Any values outside this range are considered outliers"
    ],
    example: "If Q1 = 3, Q3 = 9, IQR = 6:",
    calculation: "Lower bound = 3 - 1.5×6 = -6\nUpper bound = 9 + 1.5×6 = 18\nOutliers are values < -6 or > 18",
    notes: "Outliers can distort statistical measures and should be carefully considered before removing."
  },
};