import React, { useState } from 'react';
import { isBase64Image } from '@/utils';

const Base64ImageCompressor = () => {
  const [ base64, setBase64 ] = useState<string>('');
  const [ originalSize, setOriginalSize ] = useState<number | null>(null);
  const [ compressedBase64, setCompressedBase64 ] = useState<string>('');
  const [ compressedSize, setCompressedSize ] = useState<number | null>(null);
  const [ compressionRatio, setCompressionRatio ] = useState<number>(1);
  const [ copied, setCopied ] = useState<boolean>(false);

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

  const handleCopyClick = () => {
    if (compressedBase64) {
      navigator.clipboard.writeText(compressedBase64)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => console.error('Failed to copy: ', err));
    }
  };

  return (
    <div>
      <h2>Base64 Image Compressor</h2>
      <textarea
        rows={4}
        cols={50}
        placeholder='Paste your base64 image string here'
        value={base64}
        onChange={handleBase64Input}
      />
      {originalSize !== null && (
        <p>Original Base64 Size: {originalSize} bytes</p>
      )}
      <div>
        <label htmlFor='compression'>Compression Ratio (0.01 - 1): </label>
        <input
          type='number'
          id='compression'
          value={compressionRatio}
          min='0.01'
          max='1'
          step='0.01'
          onChange={handleCompressionChange}
        />
      </div>
      <button onClick={handleCompressClick}>Compress Image</button>
      {compressedBase64 && (
        <div>
          <p>Compressed Base64 Size: {compressedSize} bytes</p>
          <textarea
            rows={4}
            cols={50}
            readOnly
            value={compressedBase64}
          />
          <img src={compressedBase64} alt='Compressed' style={{ maxWidth: '100%', height: 'auto' }} />
          <button onClick={handleCopyClick}>
            {copied ? 'Copied!' : 'Copy Base64'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Base64ImageCompressor;
