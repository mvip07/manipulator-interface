import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { clearNotification } from '../features/commands/commandsSlice';

export const useActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators({ clearNotification }, dispatch), [dispatch]);
};