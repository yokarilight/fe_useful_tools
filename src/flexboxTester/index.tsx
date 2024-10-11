import React, { CSSProperties, useState } from 'react';
import CustomSelect from '@/components/customSelect';

const FlexboxTester = () => {
  const [flexDirection, setFlexDirection] = useState<CSSProperties['flexDirection']>('row');
  const [justifyContent, setJustifyContent] = useState<CSSProperties['justifyContent']>('flex-start');
  const [alignItems, setAlignItems] = useState<CSSProperties['alignItems']>('stretch');

  return (
    <div>
      <h2>Flexbox Tester</h2>
      <div style={{ marginBottom: '16px' }}>
        <CustomSelect
          label='Flex Direction'
          value={flexDirection}
          onChange={(e) => setFlexDirection(e.target.value as CSSProperties['flexDirection'])}
          options={[
            { value: 'row', label: 'Row' },
            { value: 'row-reverse', label: 'Row Reverse' },
            { value: 'column', label: 'Column' },
            { value: 'column-reverse', label: 'Column Reverse' },
          ]}
          name='flexDirection'
          disabled={false}
        />
        <CustomSelect
          label='Justify Content'
          value={justifyContent}
          onChange={(e) => setJustifyContent(e.target.value as CSSProperties['justifyContent'])}
          options={[
            { value: 'flex-start', label: 'Flex Start' },
            { value: 'center', label: 'Center' },
            { value: 'flex-end', label: 'Flex End' },
            { value: 'space-between', label: 'Space Between' },
            { value: 'space-around', label: 'Space Around' },
            { value: 'space-evenly', label: 'Space Evenly' },
          ]}
        />
        <CustomSelect
          label='Align Items'
          value={alignItems}
          onChange={(e) => setAlignItems(e.target.value as CSSProperties['alignItems'])}
          options={[
            { value: 'stretch', label: 'Stretch' },
            { value: 'flex-start', label: 'Flex Start' },
            { value: 'center', label: 'Center' },
            { value: 'flex-end', label: 'Flex End' },
            { value: 'baseline', label: 'Baseline' },
          ]}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection,
          justifyContent,
          alignItems,
          border: '1px solid #ccc',
          padding: '16px',
          height: '200px',
        }}
      >
        <div style={{ backgroundColor: '#4CAF50', width: '50px', height: '50px' }}>1</div>
        <div style={{ backgroundColor: '#2196F3', width: '50px', height: '50px' }}>2</div>
        <div style={{ backgroundColor: '#FF5722', width: '50px', height: '50px' }}>3</div>
      </div>
    </div>
  );
};

export default FlexboxTester;
