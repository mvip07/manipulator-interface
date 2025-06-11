import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppBar from './components/Layout/AppBar';
import PrivateRoute from './components/Auth/PrivateRoute';
import Notification from './components/Layout/Notification';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HistoryPage from './pages/HistoryPage';

const App: React.FC = () => {
    return (
        <>
            <AppBar />
            <Notification />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/history"
                    element={
                        <PrivateRoute>
                            <HistoryPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </>
    );
};

export default App;