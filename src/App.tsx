import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import {
  CreateRoom,
  JoinRoom,
  Login,
  NavigationBar,
  Register,
  SubscribeToNotifications,
  UserRooms,
} from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <div className="app-container">
            <NavigationBar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<PrivateRoute />}>
                <Route path="/create-room" element={<CreateRoom />} />
                <Route path="/join-room" element={<JoinRoom />} />
                <Route path="/" element={<UserRooms />} />
              </Route>
            </Routes>
          </div>
          <SubscribeToNotifications />
        </AuthProvider>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
