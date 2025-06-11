import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { RootState } from '../../app/store';
import { clearNotification } from '../../features/commands/commandsSlice';

const Notification: React.FC = () => {
    const dispatch = useDispatch();
    const { notification } = useSelector((state: RootState) => state.commands);

    const handleClose = () => {
        dispatch(clearNotification());
    };

    if (!notification) return null;

    return (
        <Snackbar
            open={!!notification}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={handleClose}
                severity={notification.type}
                sx={{ width: '100%' }}
            >
                {notification.message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;