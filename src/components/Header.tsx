import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header: React.FC = () => {
    const location = useLocation();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Charts
                </Typography>
                <Button
                    color="inherit"
                    component={Link}
                    to="/"
                    sx={{
                        bgcolor:
                            location.pathname === "/"
                                ? "rgba(255,255,255,0.1)"
                                : "transparent",
                    }}
                >
                    View
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/settings"
                    sx={{
                        bgcolor:
                            location.pathname === "/settings"
                                ? "rgba(255,255,255,0.1)"
                                : "transparent",
                    }}
                >
                    Settings
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
