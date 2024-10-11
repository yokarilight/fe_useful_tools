import React, { CSSProperties } from 'react';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  customClassName?: string;
  customStyle?: CSSProperties;
  variant?: 'primary' | 'secondary' | 'danger';
  isDisabled?: boolean;
  isLoading?: boolean;
}

const CustomButton = ({
  label,
  customClassName = '',
  customStyle = {},
  variant = 'primary',
  isDisabled = false,
  isLoading = false,
  ...props
}: CustomButtonProps) => {
  const baseClasses = 'px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary-focus',
    secondary: 'bg-secondary text-gray-700 hover:bg-secondary-hover focus:ring-secondary-focus',
    danger: 'bg-danger text-white hover:bg-danger-hover focus:ring-danger-focus',
  };
  const disabledClasses = 'bg-gray-300 text-gray-500 opacity-50 cursor-not-allowed';

  return (
    <button
      className={`${baseClasses} ${isDisabled || isLoading ? disabledClasses : variantClasses[variant]} ${customClassName}`}
      style={customStyle}
      disabled={isDisabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : label}
    </button>
  );
};

export default CustomButton;
