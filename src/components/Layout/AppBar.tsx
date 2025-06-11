import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { RootState } from '../../app/store';
import {
    AppBar as MuiAppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const AppBar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
        handleMenuClose();
    };

    return (
        <MuiAppBar position="static">
            <Toolbar>
                {isAuthenticated && (
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenuOpen}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Управление манипулятором
                </Typography>
                {isAuthenticated && (
                    <>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={() => { navigate('/dashboard'); handleMenuClose(); }}>
                                Панель управления
                            </MenuItem>
                            <MenuItem onClick={() => { navigate('/history'); handleMenuClose(); }}>
                                История
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>Выход</MenuItem>
                        </Menu>
                        <Typography variant="subtitle1" sx={{ mr: 2 }}>
                            {user}
                        </Typography>
                    </>
                )}
            </Toolbar>
        </MuiAppBar>
    );
};

export default AppBar;