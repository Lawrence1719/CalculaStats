import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/hooks/use-toast";
import { StatisticsResults } from "./types";
import {
  calculateStatistics as calculateStatsUtil,
  formatNumber,
} from "./statistics";
import DataInputSection from "./components/data_input_section";
import ChartSection from "./components/chart_section";
import ResultsSection from "./components/result_section";
import FormulaReference from "./components/formula_reference";
import { formulas } from "./formula";

export default function StatisticsCalculator() {
  const [input, setInput] = useState("");
  const [numbers, setNumbers] = useState<number[]>([]);
  const [results, setResults] = useState<StatisticsResults>({
    mean: null,
    median: null,
    mode: [],
    range: null,
    min: null,
    max: null,
    variance: null,
    standardDeviation: null,
    count: null,
    sum: null,
    q1: null,
    q3: null,
    iqr: null,
    outliers: [],
  });

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState({
    mean: false,
    median: false,
    mode: false,
    range: false,
    min: false,
    max: false,
    variance: false,
    standardDeviation: false,
    q1: false,
    q3: false,
    iqr: false,
    outliers: false,
  });
  const { toast } = useToast();
  const [activeFormula, setActiveFormula] = useState<string | null>("mean");

  // Parse input when it changes
  useEffect(() => {
    if (input.trim() === "") {
      setNumbers([]);
      return;
    }

    try {
      // Parse the input text into numbers
      const parsedNumbers = input
        .split(",")
        .map((num) => num.trim())
        .filter((num) => num !== "")
        .map((num) => {
          const parsed = Number(num);
          if (isNaN(parsed)) throw new Error("Invalid number");
          return parsed;
        });

      setNumbers(parsedNumbers);
      setError(null);
    } catch (err) {
      setError("Please enter only valid numbers separated by commas");
    }
  }, [input]);

  // Remove a number chip
  const removeNumber = (index: number) => {
    const newNumbers = [...numbers];
    newNumbers.splice(index, 1);

    // Update the input to match the new numbers array
    setInput(newNumbers.join(", "));
  };

  const calculateStatistics = () => {
    // Hide results during calculation for animation effect
    setShowResults(false);

    // Check if we have numbers to calculate
    if (numbers.length === 0) {
      setError("Please enter at least one number");
      return;
    }

    // Calculate statistics using utility function
    const calculatedResults = calculateStatsUtil(numbers);
    setResults(calculatedResults);
    setError(null);

    // Show results with a slight delay for animation
    setTimeout(() => setShowResults(true), 100);
  };

  const resetCalculator = () => {
    setInput("");
    setNumbers([]);
    setResults({
      mean: null,
      median: null,
      mode: [],
      range: null,
      min: null,
      max: null,
      variance: null,
      standardDeviation: null,
      count: null,
      sum: null,
      q1: null,
      q3: null,
      iqr: null,
      outliers: [],
    });

    setError(null);
    setShowResults(false);
    setShowBreakdown({
      mean: false,
      median: false,
      mode: false,
      range: false,
      min: false,
      max: false,
      variance: false,
      standardDeviation: false,
      q1: false,
      q3: false,
      iqr: false,
      outliers: false,
    });
  };

  const copyResults = () => {
    if (results.mean === null) return;

    const resultsText = `
Statistics Results:
Mean: ${formatNumber(results.mean)}
Median: ${formatNumber(results.median)}
Mode: ${
      results.mode.length > 0
        ? results.mode.map((m) => formatNumber(m)).join(", ")
        : "No mode (all values appear equally)"
    }
Range: ${formatNumber(results.range)}
Minimum: ${formatNumber(results.min)}
Maximum: ${formatNumber(results.max)}
Variance: ${formatNumber(results.variance)}
    `.trim();

    navigator.clipboard.writeText(resultsText);
    toast({
      title: "Copied to clipboard",
      description: "Results have been copied to your clipboard",
      duration: 3000,
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 p-4 transition-colors duration-300">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row gap-6 items-start">
        {/* Main Calculator Card */}
        <Card className="w-full lg:w-3/5 shadow-lg transition-all duration-300 dark:bg-slate-800 dark:border-slate-700">
          <CardHeader className="bg-slate-100 rounded-t-lg transition-colors duration-300 dark:bg-slate-800 dark:border-b dark:border-slate-700">
            <CardTitle className="text-slate-700 dark:text-slate-200">
              Statistics Calculator
            </CardTitle>
            <CardDescription className="dark:text-slate-400">
              Enter numbers separated by commas
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 pb-2">
            <div className="space-y-4">
              <DataInputSection
                input={input}
                setInput={setInput}
                numbers={numbers}
                removeNumber={removeNumber}
                error={error}
              />

              {numbers.length > 0 && (
                <ChartSection numbers={numbers} results={results} />
              )}

              {results.mean !== null && (
                <ResultsSection
                  results={results}
                  numbers={numbers}
                  showResults={showResults}
                  showBreakdown={showBreakdown}
                  setShowBreakdown={setShowBreakdown}
                  setActiveFormula={setActiveFormula}
                />
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2 gap-2 flex-wrap">
            <div className="flex gap-2">
              <Button
                onClick={resetCalculator}
                variant="outline"
                size="sm"
                className="border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Reset
              </Button>

              {results.mean !== null && (
                <Button
                  onClick={copyResults}
                  variant="outline"
                  size="sm"
                  className="border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              )}
            </div>

            <Button
              onClick={calculateStatistics}
              className="bg-slate-700 hover:bg-slate-800 transition-colors dark:bg-indigo-600 dark:hover:bg-indigo-700"
            >
              Calculate
            </Button>
          </CardFooter>
        </Card>

        {/* Formula Reference Card */}
        <FormulaReference
          formulas={formulas} // Pass the formulas object
          activeFormula={activeFormula}
          setActiveFormula={setActiveFormula}
        />
      </div>
    </div>
  );
}
