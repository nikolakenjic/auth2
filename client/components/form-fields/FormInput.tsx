'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface FormInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isRequired?: boolean;
  error?: string;
  touched?: boolean;
  type?: string;
  disabled?: boolean;
}

export function FormInput({
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  isRequired = false,
  error,
  touched,
  type = 'text',
  disabled = false,
}: FormInputProps) {
  return (
    <div>
      <Label htmlFor={name}>
        {label} {isRequired && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={touched && error ? 'border-red-500' : ''}
      />
      {touched && error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
