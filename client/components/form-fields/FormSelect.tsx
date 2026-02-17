'use client';

import { Label } from '@/components/ui/label';

interface FormSelectProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  isRequired?: boolean;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export function FormSelect({
  name,
  label,
  value,
  onChange,
  onBlur,
  options,
  isRequired = false,
  error,
  touched,
  placeholder,
  disabled = false,
}: FormSelectProps) {
  return (
    <div>
      <Label htmlFor={name}>
        {label} {isRequired && <span className="text-red-500">*</span>}
      </Label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${
          touched && error ? 'border-red-500' : ''
        }`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {touched && error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
