import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => {
    return (
        <>
            <ToastContainer />
            <Router>
                <Routes>
                    <Route path='/register' element={<Register />} />
                    <Route path='/' element={<Login />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
