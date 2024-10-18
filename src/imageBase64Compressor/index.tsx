import React, { useState, useContext } from 'react';
import { AppContext } from '@/appContext';
import CustomButton from '@/components/customButton';
import CustomInput from '@/components/customInput';
import CustomTextArea from '@/components/customTextArea';
import CustomToast from '@/components/customToast';
import { isBase64Image } from '@/utils';
import { useCopy } from '@/utils/customHooks';

const Base64ImageCompressor = () => {
  const { showToast, setShowToast } = useContext(AppContext);
  const [ base64, setBase64 ] = useState<string>('');
  const [ originalSize, setOriginalSize ] = useState<number | null>(null);
  const [ compressedBase64, setCompressedBase64 ] = useState<string>('');
  const [ compressedSize, setCompressedSize ] = useState<number | null>(null);
  const [ compressionRatio, setCompressionRatio ] = useState<number>(1);
  const [ isCopied, setIsCopied ] = useState(false);

  const copyText = useCopy();

  const isShowCopiedSuccessToast = showToast && isCopied;

  const getBase64Size = (base64String: string) => {
    const stringLength = base64String.length;
    const sizeInBytes = (stringLength * (3 / 4)) - (base64String.endsWith('==') ? 2 : base64String.endsWith('=') ? 1 : 0);

    return sizeInBytes;
  };

  const loadImageFromBase64 = (base64String: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64String;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };

  const compressImage = async (base64String: string, compressionRatio: number) => {
    const img = await loadImageFromBase64(base64String);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    canvas.width = img.width;
    canvas.height = img.height;
  
    if (ctx) {
      // make background white
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  
    const compressedBase64 = canvas.toDataURL('image/jpeg', compressionRatio);
    setCompressedBase64(compressedBase64);
    setCompressedSize(getBase64Size(compressedBase64));
  };

  const handleBase64Input = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setBase64(inputValue);
    if (isBase64Image(inputValue)) {
      setOriginalSize(getBase64Size(inputValue));
    } else {
      setOriginalSize(null);
      setCompressedBase64('');
      setCompressedSize(null);
    }
  };

  const handleCompressionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ratio = parseFloat(e.target.value);
    setCompressionRatio(ratio);
  };

  const handleCompressClick = () => {
    if (isBase64Image(base64) && compressionRatio >= 0.01 && compressionRatio <= 1) {
      compressImage(base64, compressionRatio);
    }
  };

  const handleShowCopiedSuccessToast = (isShow: boolean) => {
    setShowToast(isShow);
    setIsCopied(isShow);
  };

  const handleCopyClick = async () => {
    const isSuccess = await copyText(compressedBase64);

    if (isSuccess) {
      handleShowCopiedSuccessToast(true);
    } else {
      console.error('Failed to copy text');
    }
  };

  return (
    <div>
      <h2>Base64 Image Compressor</h2>
      <CustomTextArea
        rows={4}
        cols={50}
        onChange={handleBase64Input}
        placeholder='Paste your base64 image string here'
      />
      {originalSize !== null && (
        <p>Original Base64 Size: {originalSize} bytes</p>
      )}
      <div>
        <CustomInput
          type='number'
          label='Compression Ratio (0.01 - 1): '
          value={compressionRatio}
          onChange={handleCompressionChange}
          min={0.01}
          max={1}
          step={0.01}
        />
      </div>
      <CustomButton
        label='Compress Image'
        variant='primary'
        onClick={handleCompressClick}
      />
      {compressedBase64 && (
        <div>
          <p>Compressed Base64 Size: {compressedSize} bytes</p>
          <CustomTextArea
            rows={4}
            cols={50}
            readOnly
            value={compressedBase64}
          />
          <img src={compressedBase64} alt='Compressed' style={{ maxWidth: '100%', height: 'auto' }} />
          <CustomButton
            label='Copy Base64'
            variant='primary'
            onClick={handleCopyClick}
          />
        </div>
      )}
      {isShowCopiedSuccessToast && (
        <CustomToast
          message='Copy Successfully!'
          type='success'
          onClose={() => handleShowCopiedSuccessToast(false)}
        />
      )}
    </div>
  );
};

export default Base64ImageCompressor;
