import { Box, Stack } from '@mui/material'
import React from 'react'

interface Props {
    children: React.ReactNode
  }
  
  
export default async function BaseLayout({ children }: Props) {

  return (
    <Stack
      sx={{
        maxWidth: '100vw',
        minHeight: '100vh',
        wordBreak: 'break-word',
        overflowWrap: 'break-word'
      
      }
   
    
      }
    )
  }
