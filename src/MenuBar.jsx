import { Box, Stack, MenuItem,Select, TextField, Button, ButtonGroup, Tooltip, AppBar } from "@mui/material";
import React, { useState } from "react";

import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import RedoRoundedIcon from '@mui/icons-material/RedoRounded';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

const CustomButton = (props) => {
    const {
        label,
        letter,
    } = props;

    return (
        <Tooltip title={label} arrow>
            <Button variant="outlined" color="primary" size="small" sx={{ fontSize: "1.2rem" }}>
                {letter}
            </Button>
        </Tooltip>
    )
}

const MenuBar = () => {
    const [textLevel, setTextLevel] = useState("normal");

    return (
        <AppBar position="static" sx={{ mb: 5 }}>
            <Stack direction="row" spacing={2} sx={{ p: 1.5, width: "100%", display: "flex", justifyContent: "space-between", backgroundColor: "" }} >
                <TextField variant="outlined" label="Name" sx={{ width: 400 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
                    <Select variant="outlined" value={textLevel} onChange={(e) => setTextLevel(e.target.value)} sx={{ minWidth: 120 }}>
                        <MenuItem value="normal">Normal</MenuItem>
                        <MenuItem value="h1">Header 1</MenuItem>
                        <MenuItem value="h2">Header 2</MenuItem>
                        <MenuItem value="h3">Header 3</MenuItem>
                        <MenuItem value="h4">Header 4</MenuItem>
                        <MenuItem value="h5">Header 5</MenuItem>
                        <MenuItem value="h6">Header 6</MenuItem>
                    </Select>

                    <ButtonGroup size="small" aria-label="small button group">
                        <CustomButton label="Bold" letter="B" />
                        <CustomButton label="Italic" letter="I" />
                        <CustomButton label="Inline Code" letter="{ }" />
                        <CustomButton label="Code Block" letter="{B}" />
                        <CustomButton label="Equation" letter="=" />
                    </ButtonGroup>
                </Box>

                <ButtonGroup size="medium" aria-label="medium button group">
                    <Tooltip title="Undo" arrow>
                        <Button>
                            <UndoRoundedIcon />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Redo" arrow>
                        <Button>
                            <RedoRoundedIcon />
                        </Button>
                    </Tooltip>
                </ButtonGroup>

                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
                    <Tooltip title="Export" arrow>
                        <Button variant="outlined">
                            <IosShareRoundedIcon />
                        </Button>
                    </Tooltip>

                    <Tooltip title="Document Settings" arrow>
                        <Button variant="outlined">
                            <SettingsRoundedIcon />
                        </Button>
                    </Tooltip>

                    <Tooltip title="Account" arrow>
                        <Button variant="outlined">
                            <PersonRoundedIcon />
                        </Button>
                    </Tooltip>
                </Box>
            </Stack>
        </AppBar>
    );
}

export default MenuBar