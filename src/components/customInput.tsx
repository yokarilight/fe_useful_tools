import React from 'react';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  label?: string;
}

const CustomInput = ({ errorMessage, label, ...props }: CustomInputProps) => {
  return (
    <div>
      {label && <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>}
      <input
        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          errorMessage ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
      {errorMessage && <p className='mt-1 text-sm text-red-500'>{errorMessage}</p>}
    </div>
  );
};

export default CustomInput;
