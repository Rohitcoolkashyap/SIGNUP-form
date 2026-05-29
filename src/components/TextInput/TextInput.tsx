import type { InputHTMLAttributes, ReactNode } from 'react';
import './TextInput.css';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  suffix?: ReactNode;
}

export function TextInput({
  label,
  hint,
  error,
  suffix,
  id,
  className = '',
  ...rest
}: TextInputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
  const hasError = Boolean(error);

  return (
    <div className={`field ${hasError ? 'field--error' : ''} ${className}`.trim()}>
      <label className="field__label" htmlFor={inputId}>
        {label}
        {rest.required && <span className="field__required">*</span>}
      </label>
      <div className="field__control">
        <input
          id={inputId}
          className="field__input"
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...rest}
        />
        {suffix && <div className="field__suffix">{suffix}</div>}
      </div>
      {hint && (
        <p
          className={`field__hint ${hasError ? 'field__hint--muted' : ''}`}
          id={`${inputId}-hint`}
        >
          {hint}
        </p>
      )}
      {hasError && (
        <p className="field__error" id={`${inputId}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
