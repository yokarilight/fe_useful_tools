import React, { CSSProperties, useState } from 'react';
import CustomSelect from '@/components/customSelect';
import { GROUP_WITH_THREE_COLORS } from '@/constants';

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
        className='border-solid-slate-300 flex p-4 h-48'
        style={{
          flexDirection,
          justifyContent,
          alignItems,
        }}
      >
        {GROUP_WITH_THREE_COLORS.map((color, index) => (
          <div
            key={`flex-tester-${color}`}
            className='w-12 h-12'
            style={{ backgroundColor: color }}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlexboxTester;
