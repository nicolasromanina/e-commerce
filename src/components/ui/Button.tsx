import React from 'react';
import { cn } from '../../utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'relative inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 disabled:pointer-events-none disabled:opacity-50';
    
    const variantStyles = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
      secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 active:bg-gray-100 text-gray-700',
      ghost: 'bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700',
      link: 'bg-transparent underline-offset-4 hover:underline text-primary-600 hover:text-primary-700',
      danger: 'bg-error-600 text-white hover:bg-error-700 active:bg-error-800',
    };
    
    const sizeStyles = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
      icon: 'h-10 w-10',
    };
    
    return (
      <button
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg
              className="animate-spin h-5 w-5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        )}
        <span className={cn(isLoading && 'opacity-0')}>
          {iconPosition === 'left' && icon && (
            <span className="mr-2 -ml-1">{icon}</span>
          )}
          {children}
          {iconPosition === 'right' && icon && (
            <span className="ml-2 -mr-1">{icon}</span>
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;