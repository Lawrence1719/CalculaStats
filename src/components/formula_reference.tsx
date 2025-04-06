import React from "react";
import { Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormulaInfo } from "../types";  // Import the FormulaInfo type

interface FormulaReferenceProps {
  formulas: Record<string, FormulaInfo>;  // Ensure this prop is passed correctly
  activeFormula: string | null;
  setActiveFormula: React.Dispatch<React.SetStateAction<string | null>>;
}

const FormulaReference: React.FC<FormulaReferenceProps> = ({
  formulas,
  activeFormula,
  setActiveFormula,
}) => {
  return (
    <Card className="w-full lg:w-2/5 shadow-lg transition-all duration-300 dark:bg-slate-800 dark:border-slate-700 sticky top-4">
      <CardHeader className="bg-slate-100 rounded-t-lg transition-colors duration-300 dark:bg-slate-800 dark:border-b dark:border-slate-700">
        <CardTitle className="text-slate-700 dark:text-slate-200 flex items-center">
          <Info className="h-5 w-5 mr-2" />
          Statistical Formulas
        </CardTitle>
        <CardDescription className="dark:text-slate-400">
          Reference guide for statistical calculations
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 pb-2 max-h-[calc(100vh-200px)] overflow-y-auto">
        <Tabs
          defaultValue="mean"
          value={activeFormula || "mean"}
          onValueChange={setActiveFormula}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="mean">Mean</TabsTrigger>
            <TabsTrigger value="median">Median</TabsTrigger>
            <TabsTrigger value="mode">Mode</TabsTrigger>
            <TabsTrigger value="range">Range</TabsTrigger>
          </TabsList>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="min">Min</TabsTrigger>
            <TabsTrigger value="max">Max</TabsTrigger>
            <TabsTrigger value="variance">Variance</TabsTrigger>
          </TabsList>

          {Object.entries(formulas).map(([key, formula]) => (
            <TabsContent key={key} value={key} className="mt-0 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">{formula.title}</h3>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-md border border-slate-200 dark:border-slate-700 font-mono text-sm mb-4 whitespace-pre-line">
                  {formula.formula}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-4">{formula.description}</p>

                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Steps to Calculate:</h4>
                <ol className="list-decimal pl-5 mb-4 text-slate-700 dark:text-slate-300 space-y-1">
                  {formula.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>

                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Example:</h4>
                <p className="text-slate-700 dark:text-slate-300 mb-1">{formula.example}</p>
                <div className="bg-slate-100 dark:bg-slate-700/50 p-2 rounded-md font-mono text-sm mb-4">
                  {formula.calculation}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md border border-blue-100 dark:border-blue-800/30">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Notes:</h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">{formula.notes}</p>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
    
  );
};

export default FormulaReference;
