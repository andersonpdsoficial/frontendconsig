
import React, { createContext, useState, useContext } from 'react';

const EmprestimoContext = createContext(null);

export const EmprestimoProvider = ({ children }) => {
  const [dadosEmprestimo, setDadosEmprestimo] = useState(null);

  return (
    <EmprestimoContext.Provider value={{ dadosEmprestimo, setDadosEmprestimo }}>
      {children}
    </EmprestimoContext.Provider>
  );
};

export const useEmprestimoContext = () => {
  return useContext(EmprestimoContext);
};
