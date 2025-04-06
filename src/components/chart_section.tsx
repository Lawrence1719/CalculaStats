import React from 'react';
import { BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import { StatisticsResults } from '../types';
import { prepareChartData, prepareDistributionData, formatNumber } from '../statistics';

interface ChartSectionProps {
  numbers: number[];
  results: StatisticsResults;
}

const ChartSection = ({ numbers, results }: ChartSectionProps) => {
  const chartData = prepareChartData(numbers);
  const distributionData = prepareDistributionData(numbers);

  return (
    <div className="mt-4 border rounded-md border-slate-200 dark:border-slate-700 p-3 bg-white dark:bg-slate-800">
      <h3 className="text-sm font-medium mb-3 text-slate-700 dark:text-slate-300 flex items-center">
        <BarChart3 className="h-4 w-4 mr-1" />
        Data Visualization
      </h3>

      <Tabs defaultValue="bar" className="w-full">
        <TabsList className="grid grid-cols-3 mb-2">
          <TabsTrigger value="bar">Bar Chart</TabsTrigger>
          <TabsTrigger value="line">Line Chart</TabsTrigger>
          <TabsTrigger value="area">Area Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="bar" className="mt-0">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis
                  dataKey="value"
                  label={{ value: "Value", position: "bottom", offset: 0 }}
                  className="text-xs text-slate-600 dark:text-slate-400"
                />
                <YAxis
                  label={{ value: "Frequency", angle: -90, position: "left" }}
                  className="text-xs text-slate-600 dark:text-slate-400"
                />
                <Tooltip
                  formatter={(value) => [`Frequency: ${value}`, "Count"]}
                  labelFormatter={(value) => `Value: ${value}`}
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                  }}
                />
                <Bar
                  dataKey="frequency"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                  animationDuration={500}
                />
                {results.mean !== null && (
                  <ReferenceLine
                    x={results.mean}
                    stroke="hsl(var(--destructive))"
                    strokeDasharray="3 3"
                    label={{
                      value: "Mean",
                      position: "top",
                      fill: "hsl(var(--destructive))",
                      fontSize: 12,
                    }}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="line" className="mt-0">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={distributionData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis
                  dataKey="value"
                  label={{ value: "Value", position: "bottom", offset: 0 }}
                  className="text-xs text-slate-600 dark:text-slate-400"
                />
                <YAxis
                  label={{ value: "Count", angle: -90, position: "left" }}
                  className="text-xs text-slate-600 dark:text-slate-400"
                />
                <Tooltip
                  formatter={(value) => [`Count: ${value}`, "Frequency"]}
                  labelFormatter={(value) => `Value: ${value}`}
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                  activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                  animationDuration={500}
                />
                {results.mean !== null && (
                  <ReferenceLine
                    x={results.mean}
                    stroke="hsl(var(--destructive))"
                    strokeDasharray="3 3"
                    label={{
                      value: "Mean",
                      position: "top",
                      fill: "hsl(var(--destructive))",
                      fontSize: 12,
                    }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="area" className="mt-0">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={distributionData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                <XAxis
                  dataKey="value"
                  label={{ value: "Value", position: "bottom", offset: 0 }}
                  className="text-xs text-slate-600 dark:text-slate-400"
                />
                <YAxis
                  label={{ value: "Count", angle: -90, position: "left" }}
                  className="text-xs text-slate-600 dark:text-slate-400"
                />
                <Tooltip
                  formatter={(value) => [`Count: ${value}`, "Frequency"]}
                  labelFormatter={(value) => `Value: ${value}`}
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                  animationDuration={500}
                />
                {results.mean !== null && (
                  <ReferenceLine
                    x={results.mean}
                    stroke="hsl(var(--destructive))"
                    strokeDasharray="3 3"
                    label={{
                      value: "Mean",
                      position: "top",
                      fill: "hsl(var(--destructive))",
                      fontSize: 12,
                    }}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
        {results.mean !== null && (
          <span className="inline-flex items-center">
            <span className="w-3 h-0.5 bg-red-500 inline-block mr-1"></span> Mean: {formatNumber(results.mean)}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChartSection;