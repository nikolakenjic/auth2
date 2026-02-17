'use client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FormTextareaProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  isRequired?: boolean;
  error?: string;
  touched?: boolean;
  rows?: number;
  helperText?: string;
  disabled?: boolean;
}

export function FormTextarea({
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  isRequired = false,
  error,
  touched,
  rows = 4,
  helperText,
  disabled = false,
}: FormTextareaProps) {
  return (
    <div>
      <Label htmlFor={name}>
        {label} {isRequired && <span className="text-red-500">*</span>}
      </Label>
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={touched && error ? 'border-red-500' : ''}
      />
      {touched && error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      {helperText && !error && (
        <p className="text-xs text-gray-500 mt-1">{helperText}</p>
      )}
    </div>
  );
}
