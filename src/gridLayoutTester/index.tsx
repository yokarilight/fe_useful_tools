import React, { useState } from 'react';
import CenteredFlexContainer from '@/components/centeredFlexContainer';
import CustomInput from '@/components/customInput';
import { GROUP_WITH_THREE_COLORS } from '@/constants';

const GridLayoutTester = () => {
  const [ columns, setColumns ] = useState<number>(3);
  const [ rows, setRows ] = useState<number>(2);
  const [ gap, setGap ] = useState<number>(10);

  const generateGridStyles = () => ({
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gap,
  });

  return (
    <div>
      <h2>Grid Layout Tester</h2>
      <CenteredFlexContainer customClassName='mb-4'>
        <CustomInput
          type='number'
          label='Columns:'
          value={columns}
          onChange={(e) => setColumns(Number(e.target.value))}
          min={1}
          max={5}
        />
        <CustomInput
          type='number'
          label='Rows:'
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
          min={1}
          max={5}
        />
        <CustomInput
          type='number'
          label='Gap(px):'
          value={gap}
          onChange={(e) => setGap(Number(e.target.value))}
          min={0}
          max={50}
        />
      </CenteredFlexContainer>
      <div
        className='border-solid-slate-300 grid p-4'
        style={generateGridStyles()}
      >
        {Array.from({ length: columns * rows }).map((_, index) => (
          <div
            key={`grid-tester-${index}`}
            className='flex-center text-white h-12'
            style={{
              backgroundColor: GROUP_WITH_THREE_COLORS[(index % 3)],
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridLayoutTester;
