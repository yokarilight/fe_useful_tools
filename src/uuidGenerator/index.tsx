import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CustomButton from '@/components/customButton';

const UuidGenerator = () => {
  const [ uuid, setUuid ] = useState<string>('');

  const generateUuid = () => {
    setUuid(uuidv4());
  };

  return (
    <div className='uuid-generator-container'>
      <h2>UUID Generator</h2>
      <CustomButton
        label='Generate UUID'
        variant='primary'
        onClick={generateUuid}
      >
      </CustomButton>
      <p>{uuid}</p>
    </div>
  );
};

export default UuidGenerator;
