import React, { useState, useEffect } from 'react';

interface CustomToastProps {
  message: string;
  type?: 'success' | 'info' | 'error';
  duration?: number;
  onClose: () => void;
}

const CustomToast = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}: CustomToastProps) => {

  const [ remainingTime, setRemainingTime ] = useState(duration);

  const progressPercentage = (remainingTime / duration) * 100;

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'info':
        return 'bg-blue-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => (prev > 1000 ? prev - 1000 : 0));
    }, 1000);

    const closeTimer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(closeTimer);
    };
  }, [ duration, onClose ]);

  return (
    <div className={`fixed inset-x-0 top-20 flex justify-center z-50`}>
      <div
        className={`px-4 py-2 rounded shadow-lg text-white w-64 relative ${getBackgroundColor()}`}
      >
        <p className='text-lg mb-4'>{message}</p>
        <p className='text-xs'>Closing in {remainingTime / 1000} seconds...</p>
        <div className='absolute bottom-0 left-0 h-1 bg-white' style={{ width: `${progressPercentage}%` }}></div>
      </div>
    </div>
  );
};

export default CustomToast;
