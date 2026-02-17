'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface FormDateFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  maxDate?: string;
  minDate?: string;
}

export function FormDateField({
  name,
  label,
  value,
  onChange,
  onBlur,
  isRequired = false,
  error,
  touched,
  disabled = false,
  maxDate,
  minDate,
}: FormDateFieldProps) {
  return (
    <div>
      <Label htmlFor={name}>
        {label} {isRequired && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type="date"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        max={maxDate}
        min={minDate}
        className={touched && error ? 'border-red-500' : ''}
      />
      {touched && error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
