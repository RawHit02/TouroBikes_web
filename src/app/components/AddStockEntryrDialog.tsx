// components/AddNewBuyerDialog.tsx
"use client";

import React, { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Typography,
    OutlinedInput,
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {
    AddCircleOutlineOutlinedIcon,
    CheckCircleIcon,
    CloseOutlinedIcon,
    KeyboardArrowDownIcon
} from "../assets";

interface StockEntryProps {
    stock: boolean;
}


const AddStockEntryDialog = ({ stock }: StockEntryProps) => {
    const [open, setOpen] = useState(false);
    const [age, setAge] = useState('');

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <>
            <Button
                variant="contained"
                className="bg-primary500 rounded-lg h-10 text-base"
                startIcon={<AddCircleOutlineOutlinedIcon />}
                onClick={handleClickOpen}
            > 
                ADD {stock ? " STOCK" : " ENTRY"}
            </Button>
            <Dialog
                fullWidth
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="lg"
            >
                <DialogTitle className="flex items-start justify-between px-9 pt-9 pb-6">
                    <Box>
                        <Typography className="text-2xl leading-6 font-semibold">Add Stock</Typography>
                        <Typography className="text-secondary800 mt-2">Add new stock</Typography>
                    </Box>
                    <IconButton onClick={handleClose} className="p-0">
                        <CloseOutlinedIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className="px-9">
                    <Box sx={{ width: '100%' }}>
                        <Grid container rowSpacing={1} columnSpacing={1}>
                            <Grid size={6}>
                                <Box>
                                    <Typography className="text-sm text-primary mb-1">Stock Type</Typography>
                                    <FormControl fullWidth>
                                        <Select
                                            size='small'
                                            value={age}
                                            onChange={handleChangeSelect}
                                            displayEmpty
                                            IconComponent={() => (<KeyboardArrowDownIcon className='text-baseBlack text-[20px] mr-1' />)}
                                        >
                                            <MenuItem disabled value="">
                                                Item
                                            </MenuItem>
                                            <MenuItem value={10}>Diamond</MenuItem>
                                            <MenuItem value={20}>Gold</MenuItem>
                                            <MenuItem value={30}>Silver</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid size={6}>
                                <Box>
                                    <Typography className="text-sm text-primary mb-1">Gold Type</Typography>
                                    <FormControl fullWidth>
                                        <Select
                                            size='small'
                                            value={age}
                                            onChange={handleChangeSelect}
                                            displayEmpty
                                            IconComponent={() => (<KeyboardArrowDownIcon className='text-baseBlack text-[20px] mr-1' />)}
                                        >
                                            <MenuItem disabled value="">
                                                Enter Here
                                            </MenuItem>
                                            <MenuItem value={10}>Diamond</MenuItem>
                                            <MenuItem value={20}>Gold</MenuItem>
                                            <MenuItem value={30}>Silver</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid size={6}>
                                <Box>
                                    <Typography className="text-sm text-primary mb-1">Form of Gold</Typography>
                                    <FormControl fullWidth>
                                        <Select
                                            size='small'
                                            value={age}
                                            onChange={handleChangeSelect}
                                            displayEmpty
                                            IconComponent={() => (<KeyboardArrowDownIcon className='text-baseBlack text-[20px] mr-1' />)}
                                        >
                                            <MenuItem disabled value="">
                                                Enter Here
                                            </MenuItem>
                                            <MenuItem value={10}>Diamond</MenuItem>
                                            <MenuItem value={20}>Gold</MenuItem>
                                            <MenuItem value={30}>Silver</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid size={6}>
                                <Box>
                                    <Typography className="text-sm text-primary">Quantity</Typography>
                                    <OutlinedInput
                                        name="name"
                                        placeholder="(e.g., 20 pcs)"
                                        fullWidth
                                        className="mt-1"
                                    />
                                </Box>
                            </Grid>
                            <Grid size={6}>
                                <Box>
                                    <Typography className="text-sm text-primary mb-1">Purity (Karat Rating)</Typography>
                                    <FormControl fullWidth>
                                        <Select
                                            size='small'
                                            value={age}
                                            onChange={handleChangeSelect}
                                            displayEmpty
                                            IconComponent={() => (<KeyboardArrowDownIcon className='text-baseBlack text-[20px] mr-1' />)}
                                        >
                                            <MenuItem disabled value="">
                                                Enter Here
                                            </MenuItem>
                                            <MenuItem value={10}>Diamond</MenuItem>
                                            <MenuItem value={20}>Gold</MenuItem>
                                            <MenuItem value={30}>Silver</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid size={6}>
                                <Box>
                                    <Typography className="text-sm text-primary">Weight</Typography>
                                    <OutlinedInput
                                        name="name"
                                        placeholder="(e.g., 1 kg, 500g, 2 carats)"
                                        fullWidth
                                        className="mt-1"
                                    />
                                </Box>
                            </Grid>
                            <Grid size={6}>
                                <Box>
                                    <Typography className="text-sm text-primary">Unit Price</Typography>
                                    <OutlinedInput
                                        name="name"
                                        placeholder="Enter Here"
                                        fullWidth
                                        className="mt-1"
                                    />
                                </Box>
                            </Grid>
                            <Grid size={6}>
                                <Box>
                                    <Typography className="text-sm text-primary">Total Value</Typography>
                                    <OutlinedInput
                                        name="name"
                                        placeholder="Enter Here"
                                        fullWidth
                                        className="mt-1"
                                    />
                                </Box>
                            </Grid>
                            <Grid size={6}>
                                <Box>
                                    <Typography className="text-sm text-primary mb-1">Buyer Name</Typography>
                                    <FormControl fullWidth>
                                        <Select
                                            size='small'
                                            value={age}
                                            onChange={handleChangeSelect}
                                            displayEmpty
                                            IconComponent={() => (<KeyboardArrowDownIcon className='text-baseBlack text-[20px] mr-1' />)}
                                        >
                                            <MenuItem disabled value="">
                                                Select
                                            </MenuItem>
                                            <MenuItem value={10}>Diamond</MenuItem>
                                            <MenuItem value={20}>Gold</MenuItem>
                                            <MenuItem value={30}>Silver</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid size={6}>
                                <Box>
                                    <Typography className="text-sm text-primary">Commission</Typography>
                                    <OutlinedInput
                                        name="name"
                                        placeholder="Enter Here"
                                        fullWidth
                                        className="mt-1"
                                    />
                                </Box>
                            </Grid>
                            <Grid size={6}>
                                <Box>
                                    <Typography className="text-sm text-primary mb-1">Payment Status</Typography>
                                    <FormControl fullWidth>
                                        <Select
                                            size='small'
                                            value={age}
                                            onChange={handleChangeSelect}
                                            displayEmpty
                                            IconComponent={() => (<KeyboardArrowDownIcon className='text-baseBlack text-[20px] mr-1' />)}
                                        >
                                            <MenuItem disabled value="">
                                                Select
                                            </MenuItem>
                                            <MenuItem value={10}>Diamond</MenuItem>
                                            <MenuItem value={20}>Gold</MenuItem>
                                            <MenuItem value={30}>Silver</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid size={6}>
                                <Box>
                                    <Typography className="text-sm text-primary">Amount Received</Typography>
                                    <OutlinedInput
                                        name="name"
                                        placeholder="Enter Here"
                                        fullWidth
                                        className="mt-1"
                                    />
                                </Box>
                            </Grid>
                            <Grid size={12}>
                                <Box>
                                    <Typography className="text-sm text-primary">Notes (if any)</Typography>
                                    <OutlinedInput
                                        name="name"
                                        placeholder="Enter Here"
                                        fullWidth
                                        className="mt-1"
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions className="mb-[36px] px-9">
                    <Button
                        variant="outlined"
                        size="large"
                        startIcon={<CloseOutlinedIcon />}
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<CheckCircleIcon className="!text-[20px]" />}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddStockEntryDialog;
