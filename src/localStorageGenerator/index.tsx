import React, { useState } from 'react';
import CustomButton from '@/components/customButton';
import CustomInput from '@/components/customInput';
import { ERR_MSGS } from '@/constants';
import { isLocalStorageValueValid } from '@/utils';

const LocalStorageGenerator = () => {
  const [ key, setKey ] = useState<string>('');
  const [ value, setValue ] = useState<string>('');
  const [ generatedCode, setGeneratedCode ] = useState<string>('');
  const [ valueErrMsg, setValueErrMsg ] = useState<string>('');

  const handleOnChangeItemValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    const isValid = isLocalStorageValueValid(e.target.value);
    isValid ? setValueErrMsg('') : setValueErrMsg(ERR_MSGS.INVALID_LOCALSTORAGE_VALUE_TEXT);
  };

  const generateCode = () => {
    const jsonValue = JSON.stringify(value);
    const code = `localStorage.setItem('${key}', ${jsonValue});`;
    setGeneratedCode(code);
  };

  return (
    <div>
      <h2>localStorage setItem Generator</h2>
      <CustomInput
        type='text'
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder='Enter key'
      />
      <CustomInput
        type='text'
        value={value}
        onChange={(e) => handleOnChangeItemValue(e)}
        placeholder='Enter value (can be JSON)'
      />
      <div>{valueErrMsg}</div>
      <CustomButton
        label='Generate Code'
        variant='primary'
        onClick={generateCode}
        isDisabled={!key || valueErrMsg !== ''}
      />
      <pre>{generatedCode}</pre>
    </div>
  );
};

export default LocalStorageGenerator;
