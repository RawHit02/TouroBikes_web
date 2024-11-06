"use client"

import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
        // the component name defined in the `name` parameter
        // of the `styled` API
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    boxShadow: "none",
                },
            },
            variants: [
                {
                    props: { variant: "contained", color: "secondary" },
                    style: {
                        backgroundColor: "red",
                        "&:hover": {
                            backgroundColor: "#BDBDBD"
                        }
                    },
                },
                {
                    props: { variant: "text" },
                    style: {
                        textTransform: "none",
                    },
                },
                {
                    props: { size: "large" },
                    style: {
                        fontSize: "16px",
                        height: "40px",
                        padding: "0 40px",
                    },
                },
                {
                    props: { color: "secondary" },
                    style: {
                        color: "#000",
                    },
                },
            ],
        },
    },
});

export default theme