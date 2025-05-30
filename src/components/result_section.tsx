import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { StatisticsResults, BreakdownState } from "../types";

interface ResultsSectionProps {
  results: StatisticsResults;
  numbers: number[];
  showResults: boolean;
  showBreakdown: BreakdownState;
  setShowBreakdown: React.Dispatch<React.SetStateAction<BreakdownState>>;
  setActiveFormula: React.Dispatch<React.SetStateAction<string | null>>;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  results,
  numbers,
  showResults,
  showBreakdown,
  setShowBreakdown,
  setActiveFormula,
}) => {
  const formatNumber = (num: number | null) => {
    if (num === null) return "N/A";
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(num);
  };

  if (results.mean === null) return null;

  return (
    <div className="space-y-4">
      {/* Data Summary Card */}
      <Card className="bg-slate-100 dark:bg-slate-700/70 border-slate-200 dark:border-slate-600">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Data Summary</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Count (n):</span>
              <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{results.count}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Sum (∑):</span>
              <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{formatNumber(results.sum ?? null)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Mean:</span>
              <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{formatNumber(results.mean)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Std Dev:</span>
              <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{formatNumber(results.standardDeviation)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <div
        className={`rounded-lg bg-slate-50 p-4 border border-slate-200 dark:bg-slate-700/50 dark:border-slate-600 transition-all duration-300 ${
          showResults ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-4"
        }`}
      >
        <div className="grid gap-3">
          {/* Mean with breakdown */}
          <Collapsible
            open={showBreakdown.mean}
            onOpenChange={(open) => setShowBreakdown({ ...showBreakdown, mean: open })}
          >
            <div className="grid grid-cols-3 items-center">
              <span className="font-medium text-slate-700 dark:text-slate-300">Mean:</span>
              <span className="col-span-1 text-slate-900 dark:text-slate-100 font-mono">
                {formatNumber(results.mean)}
              </span>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-self-end"
                  onClick={() => setActiveFormula("mean")}
                >
                  {showBreakdown.mean ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-2 text-sm bg-slate-100 dark:bg-slate-600/50 p-3 rounded-md">
              <p className="text-slate-700 dark:text-slate-300 mb-1">
                Formula: Sum of all values ÷ Number of values
              </p>
              <div className="font-mono">
                <div>
                  Sum: {numbers.join(" + ")} = {numbers.reduce((a, b) => a + b, 0)}
                </div>
                <div>Count: {numbers.length}</div>
                <div>
                  Mean: {numbers.reduce((a, b) => a + b, 0)} ÷ {numbers.length} = {formatNumber(results.mean)}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Median with breakdown */}
          <Collapsible
            open={showBreakdown.median}
            onOpenChange={(open) => setShowBreakdown({ ...showBreakdown, median: open })}
          >
            <div className="grid grid-cols-3 items-center">
              <span className="font-medium text-slate-700 dark:text-slate-300">Median:</span>
              <span className="col-span-1 text-slate-900 dark:text-slate-100 font-mono">
                {formatNumber(results.median)}
              </span>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-self-end"
                  onClick={() => setActiveFormula("median")}
                >
                  {showBreakdown.median ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-2 text-sm bg-slate-100 dark:bg-slate-600/50 p-3 rounded-md">
              <p className="text-slate-700 dark:text-slate-300 mb-1">
                Formula: Middle value of sorted array (or average of two middle values if even length)
              </p>
              <div className="font-mono">
                <div>Sorted values: {[...numbers].sort((a, b) => a - b).join(", ")}</div>
                {numbers.length % 2 === 0 ? (
                  <>
                    <div>
                      Even number of values, taking average of middle two: (
                      {[...numbers].sort((a, b) => a - b)[Math.floor(numbers.length / 2) - 1]} +{" "}
                      {[...numbers].sort((a, b) => a - b)[Math.floor(numbers.length / 2)]}) ÷ 2
                    </div>
                    <div>Median: {formatNumber(results.median)}</div>
                  </>
                ) : (
                  <div>Odd number of values, middle value is: {formatNumber(results.median)}</div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Mode with breakdown */}
          <Collapsible
            open={showBreakdown.mode}
            onOpenChange={(open) => setShowBreakdown({ ...showBreakdown, mode: open })}
          >
            <div className="grid grid-cols-3 items-center">
              <span className="font-medium text-slate-700 dark:text-slate-300">Mode:</span>
              <span className="col-span-1 text-slate-900 dark:text-slate-100 font-mono">
                {results.mode.length > 0 ? results.mode.map((m) => formatNumber(m)).join(", ") : "No mode"}
              </span>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-self-end"
                  onClick={() => setActiveFormula("mode")}
                >
                  {showBreakdown.mode ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-2 text-sm bg-slate-100 dark:bg-slate-600/50 p-3 rounded-md">
              <p className="text-slate-700 dark:text-slate-300 mb-1">
                Formula: Value(s) that appear most frequently
              </p>
              <div className="font-mono">
                <div>Frequency count:</div>
                <ul className="list-disc pl-5">
                  {Object.entries(
                    numbers.reduce(
                      (acc, num) => {
                        acc[num] = (acc[num] || 0) + 1;
                        return acc;
                      },
                      {} as Record<number, number>
                    )
                  ).map(([num, count]) => (
                    <li key={num}>
                      {num}: {count} time{count !== 1 ? "s" : ""}
                    </li>
                  ))}
                </ul>
                <div className="mt-1">
                  {results.mode.length > 0
                    ? `Most frequent: ${results.mode.join(", ")}`
                    : "All values appear equally (no mode)"}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Range with breakdown */}
          <Collapsible
            open={showBreakdown.range}
            onOpenChange={(open) => setShowBreakdown({ ...showBreakdown, range: open })}
          >
            <div className="grid grid-cols-3 items-center">
              <span className="font-medium text-slate-700 dark:text-slate-300">Range:</span>
              <span className="col-span-1 text-slate-900 dark:text-slate-100 font-mono">
                {formatNumber(results.range)}
              </span>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-self-end"
                  onClick={() => setActiveFormula("range")}
                >
                  {showBreakdown.range ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-2 text-sm bg-slate-100 dark:bg-slate-600/50 p-3 rounded-md">
              <p className="text-slate-700 dark:text-slate-300 mb-1">
                Formula: Maximum value - Minimum value
              </p>
              <div className="font-mono">
                <div>Maximum: {formatNumber(results.max)}</div>
                <div>Minimum: {formatNumber(results.min)}</div>
                <div>
                  Range: {formatNumber(results.max)} - {formatNumber(results.min)} ={" "}
                  {formatNumber(results.range)}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Minimum */}
          <Collapsible
            open={showBreakdown.min}
            onOpenChange={(open) => setShowBreakdown({ ...showBreakdown, min: open })}
          >
            <div className="grid grid-cols-3 items-center">
              <span className="font-medium text-slate-700 dark:text-slate-300">Minimum:</span>
              <span className="col-span-1 text-slate-900 dark:text-slate-100 font-mono">
                {formatNumber(results.min)}
              </span>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-self-end"
                  onClick={() => setActiveFormula("min")}
                >
                  {showBreakdown.min ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-2 text-sm bg-slate-100 dark:bg-slate-600/50 p-3 rounded-md">
              <p className="text-slate-700 dark:text-slate-300 mb-1">The smallest value in the dataset</p>
              <div className="font-mono">
                <div>Values: {numbers.join(", ")}</div>
                <div>Minimum: {formatNumber(results.min)}</div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Maximum */}
          <Collapsible
            open={showBreakdown.max}
            onOpenChange={(open) => setShowBreakdown({ ...showBreakdown, max: open })}
          >
            <div className="grid grid-cols-3 items-center">
              <span className="font-medium text-slate-700 dark:text-slate-300">Maximum:</span>
              <span className="col-span-1 text-slate-900 dark:text-slate-100 font-mono">
                {formatNumber(results.max)}
              </span>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-self-end"
                  onClick={() => setActiveFormula("max")}
                >
                  {showBreakdown.max ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-2 text-sm bg-slate-100 dark:bg-slate-600/50 p-3 rounded-md">
              <p className="text-slate-700 dark:text-slate-300 mb-1">The largest value in the dataset</p>
              <div className="font-mono">
                <div>Values: {numbers.join(", ")}</div>
                <div>Maximum: {formatNumber(results.max)}</div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Variance */}
          <Collapsible
            open={showBreakdown.variance}
            onOpenChange={(open) => setShowBreakdown({ ...showBreakdown, variance: open })}
          >
            <div className="grid grid-cols-3 items-center">
              <span className="font-medium text-slate-700 dark:text-slate-300">Variance:</span>
              <span className="col-span-1 text-slate-900 dark:text-slate-100 font-mono">
                {formatNumber(results.variance)}
              </span>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-self-end"
                  onClick={() => setActiveFormula("variance")}
                >
                  {showBreakdown.variance ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-2 text-sm bg-slate-100 dark:bg-slate-600/50 p-3 rounded-md">
              <p className="text-slate-700 dark:text-slate-300 mb-1">
                Formula: Average of squared differences from the mean
              </p>
              <div className="font-mono">
                <div>Mean: {formatNumber(results.mean)}</div>
                <div>Squared differences from mean:</div>
                <ul className="list-disc pl-5">
                  {numbers.map((num, index) => (
                    <li key={index}>
                      ({num} - {formatNumber(results.mean)})² ={" "}
                      {formatNumber(Math.pow(num - (results.mean || 0), 2))}
                    </li>
                  ))}
                </ul>
                <div>
                  Sum of squared differences:{" "}
                  {formatNumber(
                    numbers.reduce((acc, num) => acc + Math.pow(num - (results.mean || 0), 2), 0)
                  )}
                </div>
                <div>
                  Variance:{" "}
                  {formatNumber(
                    numbers.reduce((acc, num) => acc + Math.pow(num - (results.mean || 0), 2), 0)
                  )}{" "}
                  ÷ {numbers.length} = {formatNumber(results.variance)}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Standard Deviation */}
          <Collapsible
            open={showBreakdown.standardDeviation}
            onOpenChange={(open) => setShowBreakdown({ ...showBreakdown, standardDeviation: open })}
          >
            <div className="grid grid-cols-3 items-center">
              <span className="font-medium text-slate-700 dark:text-slate-300">Std Deviation:</span>
              <span className="col-span-1 text-slate-900 dark:text-slate-100 font-mono">
                {formatNumber(results.standardDeviation)}
              </span>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-self-end"
                  onClick={() => setActiveFormula("standardDeviation")}
                >
                  {showBreakdown.standardDeviation ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-2 text-sm bg-slate-100 dark:bg-slate-600/50 p-3 rounded-md">
              <p className="text-slate-700 dark:text-slate-300 mb-1">
                Formula: Square root of the variance
              </p>
              <div className="font-mono">
                <div>Variance: {formatNumber(results.variance)}</div>
                <div>
                  Standard Deviation: √{formatNumber(results.variance)} = {formatNumber(results.standardDeviation)}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  (Standard deviation measures how spread out the values are from the mean)
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

    {/* Q1 (First Quartile) */}
    <Collapsible
      open={showBreakdown.q1}
      onOpenChange={(open) => setShowBreakdown({ ...showBreakdown, q1: open })}
    >
      <div className="grid grid-cols-3 items-center">
        <span className="font-medium text-slate-700 dark:text-slate-300">Q1 (25%):</span>
        <span className="col-span-1 text-slate-900 dark:text-slate-100 font-mono">
          {formatNumber(results.q1)}
        </span>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="justify-self-end"
            onClick={() => setActiveFormula("q1")}
          >
            {showBreakdown.q1 ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-2 text-sm bg-slate-100 dark:bg-slate-600/50 p-3 rounded-md">
        <p className="text-slate-700 dark:text-slate-300 mb-1">
          First quartile (25th percentile) - the median of the lower half of the data
        </p>
        <div className="font-mono">
          <div>Sorted values: {[...numbers].sort((a, b) => a - b).join(", ")}</div>
          <div>Position: 25% of {numbers.length} = {Math.floor(numbers.length * 0.25)}</div>
          <div>Q1 value: {formatNumber(results.q1)}</div>
        </div>
      </CollapsibleContent>
    </Collapsible>

    <Collapsible
  open={showBreakdown.median}
  onOpenChange={(open) => setShowBreakdown({ ...showBreakdown, median: open })}
>
  <div className="grid grid-cols-3 items-center">
    <span className="font-medium text-slate-700 dark:text-slate-300">Q2 (Median / 50%):</span>
    <span className="col-span-1 text-slate-900 dark:text-slate-100 font-mono">
      {formatNumber(results.median)}
    </span>
    <CollapsibleTrigger asChild>
      <Button
        variant="ghost"
        size="sm"
        className="justify-self-end"
        onClick={() => setActiveFormula("median")}
      >
        {showBreakdown.median ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>
    </CollapsibleTrigger>
  </div>
  <CollapsibleContent className="mt-2 text-sm bg-slate-100 dark:bg-slate-600/50 p-3 rounded-md">
    <p className="text-slate-700 dark:text-slate-300 mb-1">
      Median (Q2 / 50th percentile) - the middle value when data is sorted
    </p>
    <div className="font-mono">
      <div>Sorted values: {[...numbers].sort((a, b) => a - b).join(", ")}</div>
      <div>Median position: {Math.ceil(numbers.length / 2)}</div>
      <div>Q2 (Median): {formatNumber(results.median)}</div>
    </div>
  </CollapsibleContent>
</Collapsible>

    {/* Q3 (Third Quartile) */}
    <Collapsible
      open={showBreakdown.q3}
      onOpenChange={(open) => setShowBreakdown({ ...showBreakdown, q3: open })}
    >
      <div className="grid grid-cols-3 items-center">
        <span className="font-medium text-slate-700 dark:text-slate-300">Q3 (75%):</span>
        <span className="col-span-1 text-slate-900 dark:text-slate-100 font-mono">
          {formatNumber(results.q3)}
        </span>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="justify-self-end"
            onClick={() => setActiveFormula("q3")}
          >
            {showBreakdown.q3 ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-2 text-sm bg-slate-100 dark:bg-slate-600/50 p-3 rounded-md">
        <p className="text-slate-700 dark:text-slate-300 mb-1">
          Third quartile (75th percentile) - the median of the upper half of the data
        </p>
        <div className="font-mono">
          <div>Sorted values: {[...numbers].sort((a, b) => a - b).join(", ")}</div>
          <div>Position: 75% of {numbers.length} = {Math.floor(numbers.length * 0.75)}</div>
          <div>Q3 value: {formatNumber(results.q3)}</div>
        </div>
      </CollapsibleContent>
    </Collapsible>

    {/* IQR (Interquartile Range) */}
    <Collapsible
      open={showBreakdown.iqr}
      onOpenChange={(open) => setShowBreakdown({ ...showBreakdown, iqr: open })}
    >
      <div className="grid grid-cols-3 items-center">
        <span className="font-medium text-slate-700 dark:text-slate-300">IQR:</span>
        <span className="col-span-1 text-slate-900 dark:text-slate-100 font-mono">
          {formatNumber(results.iqr)}
        </span>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="justify-self-end"
            onClick={() => setActiveFormula("iqr")}
          >
            {showBreakdown.iqr ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-2 text-sm bg-slate-100 dark:bg-slate-600/50 p-3 rounded-md">
        <p className="text-slate-700 dark:text-slate-300 mb-1">
          Formula: Q3 - Q1 (Interquartile Range - measures the spread of the middle 50% of values)
        </p>
        <div className="font-mono">
          <div>Q1: {formatNumber(results.q1)}</div>
          <div>Q3: {formatNumber(results.q3)}</div>
          <div>
            IQR: {formatNumber(results.q3)} - {formatNumber(results.q1)} = {formatNumber(results.iqr)}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>

    {/* Outliers */}
    <Collapsible
      open={showBreakdown.outliers}
      onOpenChange={(open) => setShowBreakdown({ ...showBreakdown, outliers: open })}
    >
      <div className="grid grid-cols-3 items-center">
        <span className="font-medium text-slate-700 dark:text-slate-300">Outliers:</span>
        <span className="col-span-1 text-slate-900 dark:text-slate-100 font-mono">
          {results.outliers && results.outliers.length > 0 
            ? results.outliers.map(o => formatNumber(o)).join(", ") 
            : "None"}
        </span>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="justify-self-end"
            onClick={() => setActiveFormula("outliers")}
          >
            {showBreakdown.outliers ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-2 text-sm bg-slate-100 dark:bg-slate-600/50 p-3 rounded-md">
        <p className="text-slate-700 dark:text-slate-300 mb-1">
          Formula: Values below Q1 - 1.5*IQR or above Q3 + 1.5*IQR
        </p>
        <div className="font-mono">
          <div>Q1: {formatNumber(results.q1)}</div>
          <div>Q3: {formatNumber(results.q3)}</div>
          <div>IQR: {formatNumber(results.iqr)}</div>
          <div>Lower bound: {formatNumber(results.q1)} - 1.5*{formatNumber(results.iqr)} = {formatNumber((results.q1 || 0) - 1.5 * (results.iqr || 0))}</div>
          <div>Upper bound: {formatNumber(results.q3)} + 1.5*{formatNumber(results.iqr)} = {formatNumber((results.q3 || 0) + 1.5 * (results.iqr || 0))}</div>
          <div className="mt-1">
            Outliers: {results.outliers && results.outliers.length > 0 
              ? results.outliers.map(o => formatNumber(o)).join(", ") 
              : "None detected"}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;