import { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  required?: boolean;
}

export function Input({ label, error, required, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (  // có {&&} = nếu có label thì mới render, optional
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={
          className ||
          'px-3 py-2 rounded-lg border border-gray-300 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
        }
        required={required}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs">{error.message}</p>
      )}
    </div>
  );
}