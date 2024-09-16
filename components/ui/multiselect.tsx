import React, { useMemo } from 'react';
import Select, { MultiValue, StylesConfig } from 'react-select';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Option = {
  value: string;
  label: string;
};

export interface MultiSelectProps {
  defaultValue?: Option[];
  options: Option[];
  value: Option[];
  onChange: (option: MultiValue<Option>) => void;
  className?: string;
  name: string;
  placeholder?: string;
}

const baseSelectStyles: StylesConfig<Option, true> = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    '&:hover': {
      border: 'none',
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '4px 12px',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'hsl(var(--muted-foreground))',
    fontSize: '0.875rem',
    opacity: 1,
    paddingLeft: '0px',
  }),
  input: (provided) => ({
    ...provided,
    color: 'hsl(var(--foreground))',
    fontSize: '0.875rem',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'hsl(var(--accent))',
    borderRadius: '0.25rem',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'hsl(var(--accent-foreground))',
    fontSize: '0.875rem',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'hsl(var(--accent-foreground))',
    ':hover': {
      backgroundColor: 'hsl(var(--accent))',
      color: 'hsl(var(--destructive))',
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'hsl(var(--popover))',
    color: 'hsl(var(--popover-foreground))',
    borderRadius: '0.375rem',
    border: '1px solid hsl(var(--border))',
    boxShadow: 'var(--shadow-md)',
    padding: '0.25rem',
    zIndex: 50,
    overflow: 'hidden',
    minWidth: '8rem',
    animation: 'in 0.2s ease-out',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? 'hsl(var(--accent))'
      : 'hsl(var(--popover))',
    color: state.isFocused
      ? 'hsl(var(--accent-foreground))'
      : 'hsl(var(--popover-foreground))',
    fontSize: '0.875rem',
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: '0.375rem',
  }),
  clearIndicator: () => ({
    display: 'none', // Hide the clear indicator
  }),
  indicatorSeparator: () => ({
    display: 'none', // Hide the indicator separator
  }),
  dropdownIndicator: () => ({
    display: 'none', // Hide the default dropdown indicator
  }),
};

export function MultiSelect({
  defaultValue,
  options,
  value,
  onChange,
  className,
  name,
  placeholder,
}: MultiSelectProps) {
  const selectStyles = useMemo(() => baseSelectStyles, []);

  return (
    <div
      className={cn(
        'relative flex h-10 w-full rounded-md border border-input bg-background text-sm ring-offset-background',
        'focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
        className
      )}
    >
      <Select
        defaultValue={defaultValue}
        isMulti
        name={name}
        options={options}
        styles={selectStyles}
        value={value}
        onChange={onChange}
        className="w-full"
        classNamePrefix="react-select"
        placeholder={placeholder}
        components={{
          DropdownIndicator: () => (
            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform opacity-50" />
          ),
        }}
      />
    </div>
  );
}

export default MultiSelect;
