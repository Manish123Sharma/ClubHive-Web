import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';

const App = () => {
    return (
        <>
            <ToastContainer />
            <Router>
                <Routes>
                    <Route path='/' element={<Register />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
