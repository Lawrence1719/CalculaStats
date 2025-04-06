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
};