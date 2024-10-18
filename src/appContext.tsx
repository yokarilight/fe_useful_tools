import React, { createContext, useState, ReactNode } from 'react';

interface AppContextProps {
  showToast: boolean;
  setShowToast: (value: boolean) => void;
}

export const AppContext = createContext<AppContextProps>({
  showToast: false,
  setShowToast: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => {
  const [ showToast, setShowToast ] = useState(false);

  return (
    <AppContext.Provider value={{ showToast, setShowToast }}>
      {children}
    </AppContext.Provider>
  );
};
