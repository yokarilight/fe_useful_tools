import { useState } from 'react';
import './App.css';
import { Provider } from './appContext';
import Base64Converter from './base64Convertor';
import CssUnitConverter from './cssUnitConvertor';
import FlexboxTester from './flexboxTester';
import GridLayoutTester from './gridLayoutTester';
import ImageBase64Compressor from './imageBase64Compressor';
import LocalStorageGenerator from './localStorageGenerator';
import UuidGenerator from './uuidGenerator';

function App() {
  return (
    <Provider>
      <Base64Converter />
      <ImageBase64Compressor />
      <LocalStorageGenerator />
      <UuidGenerator />
      <FlexboxTester />
      <GridLayoutTester />
      <CssUnitConverter />
    </Provider>
  );
}

export default App;
