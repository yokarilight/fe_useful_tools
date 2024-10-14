import React, { CSSProperties } from 'react';

interface CenteredFlexContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  customClassName?: string;
  customStyle?: CSSProperties;
}

const CenteredFlexContainer = ({
  children,
  customClassName = '',
  customStyle,
  ...props
}: CenteredFlexContainerProps) => {
  return (
    <div
      className={`flex-center ${customClassName}`}
      style={{ ...customStyle }}
      {...props}
    >
      {children}
    </div>
  );
};

export default CenteredFlexContainer;
