import React, { CSSProperties } from 'react';

interface CustomTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
  customClassName?: string;
  customStyle?: CSSProperties;
  isDisabled?: boolean;
}

const CustomTextArea = ({
  label,
  errorMessage,
  customStyle,
  customClassName = '',
  isDisabled = false,
  ...props
}: CustomTextAreaProps) => {
  const baseClasses =
    'w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500';
  const disabledClasses = 'bg-gray-200 text-gray-500 cursor-not-allowed';
  const errorClasses = 'border-red-500';

  return (
    <div className='mb-4'>
      {label && <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>}
      <textarea
        className={`${baseClasses} ${isDisabled ? disabledClasses : 'border-gray-300'} ${
          errorMessage ? errorClasses : ''
        } ${customClassName}`}
        style={customStyle}
        disabled={isDisabled}
        {...props}
      />
      {errorMessage && <p className='mt-1 text-sm text-red-500'>{errorMessage}</p>}
    </div>
  );
};

export default CustomTextArea;
