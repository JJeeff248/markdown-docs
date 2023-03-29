import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Container, Typography } from "@mui/material";
import MenuBar from "./MenuBar";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const App = () => {
    return (
        <ThemeProvider theme={darkTheme} >
            <CssBaseline />
            <MenuBar />
            <Container maxWidth="md">
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome!
                </Typography>
            </Container>
        </ThemeProvider>
    );
};

export default App;
