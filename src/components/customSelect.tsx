import React from 'react';

interface CustomSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  customClassName?: string;
}

const CustomSelect  = ({
  label,
  value,
  onChange,
  options,
  customClassName = '',
  ...props
}: CustomSelectProps) => {
  return (
    <div className={`mb-4 ${customClassName}`}>
      {label && <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>}
      <select
        className='w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
        value={value}
        onChange={onChange}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
