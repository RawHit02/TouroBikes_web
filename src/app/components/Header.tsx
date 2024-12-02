import { Box, IconButton, InputAdornment, Menu, MenuItem, OutlinedInput } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { NotificationIcon, HeaderSearchIcon } from '../assets'

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box className='bg-primary rounded-[12px] flex w-full justify-between items-center py-4 ps-6 pr-[18px] h-[72px]'>
        <Box className="max-w-[372px] w-full">
          <OutlinedInput
            id="outlined-adornment-weight"
            color='secondary'
            startAdornment={<InputAdornment position="start"><Image src={HeaderSearchIcon} alt='search' /></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            placeholder='Search anything'
            fullWidth
          />
        </Box>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Image src={NotificationIcon} alt='notify' />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem>
            abcd
          </MenuItem>
        </Menu>
      </Box>
    </>
  )
}

export default Header