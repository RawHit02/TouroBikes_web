import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import { ArrowDropDownIcon, ArrowRightIcon, DashboardIcon, DashboardIconActive, Hamburger, Logo1, VendorManagementicon, VendorManagementiconActive } from '../assets'
import Image from 'next/image'

const SideNav = () => {
  return (
    <>
      <Box className="w-full bg-primary h-[calc(100vh-32px)] rounded-xl px-4 pt-9 pb-4 flex flex-col justify-between">
        <Box>
          <Box className="flex items-center justify-between">
            <Box>
              <Image src={Logo1} alt="logo" />
            </Box>
            <Box className="cursor-pointer">
              <Image src={Hamburger} alt="logo" />
            </Box>
          </Box>
          <Box className='mt-9 flex flex-col gap-2'>
            <Box className="flex items-center gap-[6px] p-3 rounded-lg cursor-pointer bg-primary300 nav-item active">
              <Image src={DashboardIcon} alt='dashboard' className='nav-item-icon' />
              <Image src={DashboardIconActive} alt='dashboard' className='nav-item-icon-active' />
              <Typography className='text-sm text-white nav-item-label'>Dashboard</Typography>
            </Box>
            <Box>
              <Accordion elevation={0}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon className='arrow-down-icon' />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  // className='active'
                >
                  <Box className="flex items-center gap-[6px]">
                    <Image src={VendorManagementicon} alt='vendor' className='vendor-m-icon' />
                    <Image src={VendorManagementiconActive} alt='vendor' className='vendor-m-icon-active' />
                    <Typography>Vendor Management</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails className='mt-2'>
                  <Box className="flex flex-col gap-[16px]">
                    <Box className="flex gap-2 text-white cursor-pointer side-nav-child active">
                      <ArrowRightIcon className='side-nav-child-icon' />
                      <Typography className='side-nav-child-label'>Buyers</Typography>
                    </Box>
                    <Box className="flex gap-2 text-white cursor-pointer side-nav-child">
                      <ArrowRightIcon className='side-nav-child-icon' />
                      <Typography className='side-nav-child-label'>Suppliers</Typography>
                    </Box>
                  </Box>
                  <Box></Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        </Box>
        <Box>a</Box>
      </Box>
    </>
  )
}

export default SideNav