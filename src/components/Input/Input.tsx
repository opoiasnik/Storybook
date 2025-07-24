import React, { useState, forwardRef } from 'react';
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    clearable?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    size = 'md',
    error = false,
    errorMessage,
    helperText,
    clearable = false,
    startIcon,
    endIcon,
    className = '',
    type = 'text',
    value,
    onChange,
    ...props
}, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [internalValue, setInternalValue] = useState(value || '');

    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
            setInternalValue(e.target.value);
        }
        onChange?.(e);
    };

    const handleClear = () => {
        const event = {
            target: { value: '' },
            currentTarget: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>;

        if (!isControlled) {
            setInternalValue('');
        }
        onChange?.(event);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const inputType = type === 'password' && isPasswordVisible ? 'text' : type;
    const hasValue = String(inputValue).length > 0;
    const showClearButton = clearable && hasValue && !props.disabled && !props.readOnly;
    const showPasswordToggle = type === 'password';

    const sizeClasses = {
        sm: 'h-10 px-3 text-sm',
        md: 'h-12 px-4 text-base',
        lg: 'h-14 px-5 text-lg',
    };

    const iconSizeClasses = {
        sm: 'w-5 h-5',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    const baseInputClasses = `
    input-base
    ${sizeClasses[size]}
    ${error ? 'input-error' : ''}
    ${startIcon ? 'pl-12' : ''}
    ${(showClearButton || showPasswordToggle || endIcon) ? 'pr-16' : ''}
    ${props.disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}
    ${props.readOnly ? 'bg-gray-50' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {startIcon && (
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <div className={iconSizeClasses[size]}>
                            {startIcon}
                        </div>
                    </div>
                )}

                <input
                    ref={ref}
                    type={inputType}
                    value={inputValue}
                    onChange={handleChange}
                    className={baseInputClasses}
                    {...props}
                />

                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    {endIcon && !showClearButton && !showPasswordToggle && (
                        <div className={`text-gray-400 ${iconSizeClasses[size]}`}>
                            {endIcon}
                        </div>
                    )}

                    {showClearButton && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className={`text-gray-400 hover:text-gray-600 transition-colors ${iconSizeClasses[size]}`}
                            aria-label="Clear input"
                        >
                            <XMarkIcon />
                        </button>
                    )}

                    {showPasswordToggle && (
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className={`text-gray-400 hover:text-gray-600 transition-colors ${iconSizeClasses[size]}`}
                            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                        >
                            {isPasswordVisible ? <EyeSlashIcon /> : <EyeIcon />}
                        </button>
                    )}
                </div>
            </div>

            {(errorMessage || helperText) && (
                <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
                    {error ? errorMessage : helperText}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input; 