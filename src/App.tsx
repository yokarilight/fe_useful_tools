import { useState } from 'react';
import './App.css';
import Base64Converter from './base64Convertor';
import CssUnitConverter from './cssUnitConvertor';
import FlexboxTester from './flexboxTester';
import GridLayoutTester from './gridLayoutTester';
import LocalStorageGenerator from './localStorageGenerator';
import UuidGenerator from './uuidGenerator';

function App() {
  return (
    <>
      <Base64Converter />
      <LocalStorageGenerator />
      <UuidGenerator />
      <FlexboxTester />
      <GridLayoutTester />
      <CssUnitConverter />
    </>
  );
}

export default App;
