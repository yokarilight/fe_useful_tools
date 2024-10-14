import React, { useState } from 'react';
import CenteredFlexContainer from '@/components/centeredFlexContainer';
import CustomInput from '@/components/customInput';

const CssUnitConverter = () => {
  const [ px, setPx ] = useState<string>('');
  const [ rem, setRem ] = useState<string>('');
  const [ resultPx, setResultPx ] = useState<string>('');
  const [ resultRem, setResultRem ] = useState<string>('');
  const baseFontSize = 16; // default base size

  const convertPxToRem = () => {
    setResultRem((Number(px) / baseFontSize).toFixed(2));
  };

  const convertRemToPx = () => {
    setResultPx((Number(rem) * baseFontSize).toString());
  };

  return (
    <div>
      <h2>CSS Unit Converter</h2>
      <CenteredFlexContainer customClassName='mb-4'>
        <div>
          <CustomInput
            type='text'
            value={px}
            onChange={(e) => setPx(e.target.value)}
            placeholder='Enter px value'
          />
          <button onClick={convertPxToRem}>Convert to rem</button>
          <p>{resultRem} rem</p>
        </div>

        <div>
          <CustomInput
            type='text'
            value={rem}
            onChange={(e) => setRem(e.target.value)}
            placeholder='Enter rem value'
          />
          <button onClick={convertRemToPx}>Convert to px</button>
          <p>{resultPx} px</p>
        </div>
      </CenteredFlexContainer>
    </div>
  );
};

export default CssUnitConverter;
