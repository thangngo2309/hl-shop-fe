import { useFormContext } from 'react-hook-form';
import { InputProps } from '@/model/input.model';

export function Input({ name, label, type, placeholder, inputClassName, rules }: InputProps) {
  const defaultInputClassName = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400";
  const { register, formState: { errors } } = useFormContext();
  const fieldError = errors[name];

  return (
    <div className="flex flex-col gap-1 mb-4">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        {...register(name, rules)}
        className={`${defaultInputClassName} ${inputClassName || ''} 
        ${fieldError ? 'border-red-500' : ''}`}
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
