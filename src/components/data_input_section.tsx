import React from 'react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, X } from "lucide-react";

interface DataInputSectionProps {
  input: string;
  setInput: (value: string) => void;
  numbers: number[];
  removeNumber: (index: number) => void;
  error: string | null;
}

const DataInputSection = ({ 
  input, 
  setInput, 
  numbers, 
  removeNumber, 
  error 
}: DataInputSectionProps) => {
  return (
    <>
      <div className="flex gap-2">
        <Input
          placeholder="e.g., 1, 2, 3, 4, 5"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 transition-all duration-200 focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500"
        />
      </div>

      {/* Number chips */}
      {numbers.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2 border rounded-md border-slate-200 dark:border-slate-700 min-h-[50px]">
          {numbers.map((num, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1 bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
            >
              {num}
              <button
                onClick={() => removeNumber(index)}
                className="ml-1 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-full"
                aria-label={`Remove ${num}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {error && (
        <Alert
          variant="destructive"
          className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800/30"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default DataInputSection;