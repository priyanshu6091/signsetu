'use client';

import React, { forwardRef } from 'react';

type InputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
  label?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>((
  {
    type = 'text',
    placeholder,
    value,
    onChange,
    name,
    id,
    required = false,
    disabled = false,
    className = '',
    error,
    label,
  },
  ref
) => {
  const inputId = id || name;
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={inputId}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`
          w-full px-4 py-2 rounded-md border
          ${error ? 'border-red-500' : 'border-foreground/20'}
          bg-background text-foreground
          focus:outline-none focus:ring-2 focus:ring-foreground/30
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;