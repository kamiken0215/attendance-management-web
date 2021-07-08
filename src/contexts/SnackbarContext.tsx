import React, { useState, createContext, FC } from 'react';

export type Severity = 'success' | 'error' | 'warning' | 'info';

//const type:Severity = 'success' | 'error' | 'warning' | 'info'

export const SnackbarContext = createContext({
  snackState: {
    isOpen: false,
    severity: undefined,
    message: '',
  },
  toggleSnack: (isOpen: boolean, severity: Severity, message: string) =>
    undefined,
});

export const SnackbarContextProvider: FC = (props) => {
  const [snackState, setSnackState] = useState({
    isOpen: false,
    severity: undefined,
    message: '',
  });

  const toggleSnack = (
    isOpen: boolean,
    severity: Severity,
    message: string,
  ) => {
    setSnackState({
      isOpen: isOpen,
      severity: severity,
      message: message,
    });
  };

  return (
    <SnackbarContext.Provider value={{ snackState, toggleSnack: toggleSnack }}>
      {props.children}
    </SnackbarContext.Provider>
  );
};
