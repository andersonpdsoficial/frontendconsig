'use client'
import StyleMaterialUi from '../lib/StyleMaterialUi'
import React from 'react'
import ReactQueryProvider from '../lib/ReactQueryProvider'

interface Props {   /* Após react 18 não aceita  o children sem a interface declarada */
  children: React.ReactNode
}

export default function BaseProvider({ children }: Props) {
  return (
    <ReactQueryProvider>
      <StyleMaterialUi>
        <>
        {children}
        </>
      </StyleMaterialUi>
    </ReactQueryProvider>
  )
}
