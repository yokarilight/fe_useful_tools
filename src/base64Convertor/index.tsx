import React, { useState } from 'react';
import CustomButton from '@/components/customButton';
import CustomTextArea from '@/components/customTextArea';
import { errMsgs } from '@/constants';
import { isValidBase64 } from '@/utils';

const Base64Converter = () => {
  const [ input, setInput ] = useState<string>('');
  const [ output, setOutput ] = useState<string>('');
  const [ base64ErrMsg, setBase64ErrMsg ] = useState<string>('');

  const encodeBase64 = () => {
    if (!input) {
      setBase64ErrMsg(errMsgs.TEXT_EMPTY);
    }
    
    setOutput(btoa(input));
  };

  const decodeBase64 = () => {
    if (!input) {
      setBase64ErrMsg(errMsgs.TEXT_EMPTY);
    }

    try {
      setOutput(atob(input));
    } catch (err) {
      if (err instanceof Error) {
        setBase64ErrMsg(err.message);
      }
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const isValid = isValidBase64(e.target.value);
    isValid ? setBase64ErrMsg('') : setBase64ErrMsg(errMsgs.INVALID_BASE_64_TEXT);
  };

  return (
    <div className='base64-convertor-container'>
      <h2>Base64 Encoder/Decoder</h2>
      <CustomTextArea
        value={input}
        onChange={(e) => handleOnChange(e)}
        placeholder='Enter text to encode/decode'
        errorMessage={base64ErrMsg}
      />
      <CustomButton
        label='Encode'
        variant='primary'
        onClick={encodeBase64}
      />
      <CustomButton
        label='Decode'
        variant='primary'
        onClick={decodeBase64}
      />
      <p>{output}</p>
    </div>
  );
};

export default Base64Converter;
