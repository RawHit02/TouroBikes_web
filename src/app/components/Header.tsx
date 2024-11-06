import { Box, Button, TextField } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { NotificationIcon } from '../assets'

const Header = () => {
  return (
    <>
      <Box className='bg-primary rounded-[12px] flex w-full justify-between items-center py-4 ps-6 pr-[18px] h-[72px]'>
        <TextField className='bg-red-50' />
        <Box><Image src={NotificationIcon} alt='notify' /></Box>
        <Button variant='contained' color='secondary'>sdfkjdsf</Button>
      </Box>
    </>
  )
}

export default Header