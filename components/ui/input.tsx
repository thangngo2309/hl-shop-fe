'use client'

import * as React from "react"
import { useFormContext } from 'react-hook-form';
import { cn } from "@/lib/utils"
import { InputProps } from '@/model/input.model';

function Input({ 
  name, 
  label, 
  type = 'text', 
  placeholder, 
  inputClassName, 
  rules,
  ...props 
}: InputProps & React.ComponentProps<"input">) {
  
  const { register, formState: { errors } } = useFormContext();
  const fieldError = errors[name];

  const defaultInputClassName = "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40";

  return (
    <div className="flex flex-col gap-1 mb-4">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        {...register(name, rules)}
        {...props}
        className={cn(
          defaultInputClassName,
          inputClassName,
          fieldError && 'border-red-500'
        )}
        type={type}
        placeholder={placeholder}
      />

      {fieldError && (
        <p className="text-red-500 text-sm mt-1">
          {fieldError.message?.toString()}
        </p>
      )}
    </div>
  );
}

export { Input }