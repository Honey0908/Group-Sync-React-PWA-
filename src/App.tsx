import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import CreateJoinRoom from './components/createJoinRoom/CreateJoinRoom';
import Room from './components/room/Room';

import CreateRoom from './components/createRoom/CreateRoom';
import JoinRoom from './components/joinRoom/JoinRoom';
import UserRooms from './components/usersRoom/UsersRoom';
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import NavigationBar from './components/navbar/Navbar';
import Register from './components/register/Register';
import SubscribeToNotifications from './components/SubscribeToNotifications';

const App: React.FC = () => {
  return (
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
              <Route path="/create-join" element={<CreateJoinRoom />} />
              <Route path="/room" element={<Room />} />
              <Route path="/" element={<UserRooms />} />
            </Route>
          </Routes>
        </div>
        <SubscribeToNotifications />
      </AuthProvider>
    </Router>
  );
};

export default App;
