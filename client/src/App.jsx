import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from "./components/ProtectedRoute";
import ViewAllEvents from './pages/ViewAllEvents';
import Profile from './pages/Profile';
import EventDetail from './pages/EventDetail';


const App = () => {
    return (
        <>
            <ToastContainer />
            <Router>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route path='/allevents' element={<ViewAllEvents />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/eventdetail/:id' element={<EventDetail />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
