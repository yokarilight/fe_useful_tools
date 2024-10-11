import { useState } from 'react';
import './App.css';
import Base64Converter from './base64Convertor';
import FlexboxTester from './flexboxTester';
import LocalStorageGenerator from './localStorageGenerator';
import UuidGenerator from './uuidGenerator';

function App() {
  return (
    <>
      <Base64Converter />
      <LocalStorageGenerator />
      <UuidGenerator />
      <FlexboxTester />
    </>
  );
}

export default App;
