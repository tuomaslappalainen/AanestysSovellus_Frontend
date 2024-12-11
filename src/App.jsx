// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import CreatePoll from './Components/Polls/CreatePoll';
import PollList from './Components/Polls/Polllist';
import PollDetails from './Components/Polls/PollDetails';
import './App.css';

const App = () => {
    const [token, setToken] = useState('');
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleLogin = (token, role, username) => {
        setToken(token);
        setRole(role);
        setUsername(username);
    };

    const handleLogout = () => {
        setToken('');
        setRole('');
        setUsername('');
        navigate('/login'); // Redirect to the login page
    };

    return (
        <div>
            <nav>
                <ul>
                    {username && (
                        <li>
                            Logged in as: {username} <button onClick={handleLogout}>Logout</button>
                        </li>
                    )}
                    {!username && <li><Link to="/login">Login</Link></li>}
                    <li><Link to="/register">Register</Link></li>
                    {role === 'admin' && <li><Link to="/create-poll">Create Poll</Link></li>}
                    {username && <li><Link to="/polls">Polls</Link></li>}
                </ul>
            </nav>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setToken={handleLogin} />} />
                {role === 'admin' && <Route path="/create-poll" element={<CreatePoll token={token} />} />}
                <Route path="/polls/:id" element={<PollDetails token={token} role={role} />} />
                <Route path="/polls" element={<PollList token={token} />} />
            </Routes>
        </div>
    );
};

export default App;
