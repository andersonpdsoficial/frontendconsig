'use client';
import StyleMaterialUi from '../lib/styleProvider';
import React from 'react';
import ReactQueryProvider from '../lib/reactQueryProvider';

interface Props {
  children: React.ReactNode;
}

export default function BaseProvider({ children }: Props) {
  return (
    <ReactQueryProvider>
      <StyleMaterialUi>
        {children}
      </StyleMaterialUi>
    </ReactQueryProvider>
  );
}
