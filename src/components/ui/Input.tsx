import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const baseClasses =
  "w-full rounded-lg border-2 border-ink bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = "", id, ...rest }: InputProps) {
  const inputId = id ?? rest.name;
  return (
    <div className={className}>
      {label ? (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-semibold text-ink">
          {label}
        </label>
      ) : null}
      <input id={inputId} className={baseClasses} {...rest} />
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, className = "", id, ...rest }: TextareaProps) {
  const textareaId = id ?? rest.name;
  return (
    <div className={className}>
      {label ? (
        <label htmlFor={textareaId} className="mb-1.5 block text-sm font-semibold text-ink">
          {label}
        </label>
      ) : null}
      <textarea id={textareaId} className={baseClasses} {...rest} />
    </div>
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: ReactNode;
}

export function Select({ label, className = "", id, children, ...rest }: SelectProps) {
  const selectId = id ?? rest.name;
  return (
    <div className={className}>
      {label ? (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-semibold text-ink">
          {label}
        </label>
      ) : null}
      <select id={selectId} className={baseClasses} {...rest}>
        {children}
      </select>
    </div>
  );
}
