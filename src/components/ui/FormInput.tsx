import { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
}

export function FormInput({
  label,
  error,
  helperText,
  icon,
  className,
  ...rest
}: FormInputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {rest.required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute left-3 top-3 text-gray-400">{icon}</div>}
        <input
          className={clsx(
            'w-full px-4 py-2 border rounded-lg font-body transition-colors duration-200',
            icon && 'pl-10',
            error
              ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200'
              : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-success focus:border-transparent',
            className
          )}
          {...rest}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {helperText && !error && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
    </div>
  )
}

interface FormTextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  rows?: number
}

export function FormTextarea({
  label,
  error,
  helperText,
  className,
  rows = 4,
  ...rest
}: FormTextareaProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {rest.required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <textarea
        rows={rows}
        className={clsx(
          'w-full px-4 py-2 border rounded-lg font-body transition-colors duration-200',
          error
            ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200'
            : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-success focus:border-transparent',
          className
        )}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {helperText && !error && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
    </div>
  )
}

interface FormCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function FormCheckbox({ label, error, className, disabled, ...rest }: FormCheckboxProps) {
  return (
    <div className="mb-4 flex items-start">
      <input
        type="checkbox"
        disabled={disabled}
        className={clsx(
          'w-5 h-5 mt-0.5 border-gray-300 rounded text-success focus:ring-2 focus:ring-success cursor-pointer',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...rest}
      />
      {label && (
        <label className={clsx('ml-3 text-sm font-body cursor-pointer', disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700')}>
          {label}
          {rest.required && <span className="text-red-500"> *</span>}
        </label>
      )}
      {error && <p className="text-red-500 text-sm mt-1 block w-full">{error}</p>}
    </div>
  )
}

interface FormSelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: Array<{ value: string; label: string }>
}

export function FormSelect({
  label,
  error,
  helperText,
  options,
  className,
  ...rest
}: FormSelectProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {rest.required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <select
        className={clsx(
          'w-full px-4 py-2 border rounded-lg font-body transition-colors duration-200',
          error
            ? 'border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200'
            : 'border-gray-300 focus:outline-none focus:ring-2 focus:ring-success focus:border-transparent',
          className
        )}
        {...rest}
      >
        <option value="">Selecciona una opción</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {helperText && !error && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
    </div>
  )
}

interface FormGroupProps {
  children: React.ReactNode
  className?: string
}

export function FormGroup({ children, className }: FormGroupProps) {
  return <fieldset className={clsx('space-y-4', className)}>{children}</fieldset>
}
