import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  label?: string;
  error?: string;
  helperText?: string;
  onChange: (value: string) => void;
  fullWidth?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      options,
      label,
      error,
      helperText,
      onChange,
      value,
      fullWidth = false,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className={cn('space-y-1', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              'block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-600 sm:text-sm',
              error ? 'border-error-300 focus:ring-error-600' : '',
              fullWidth && 'w-full',
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        {error ? (
          <p className="text-sm text-error-600">{error}</p>
        ) : helperText ? (
          <p className="text-sm text-gray-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;