// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import CreatePoll from './components/Polls/CreatePoll';
import PollList from './components/Polls/PollList';
import PollDetails from './components/Polls/PollDetails';
import './App.css';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [role, setRole] = useState(localStorage.getItem('role') || '');
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    useEffect(() => {
        if (role) {
            localStorage.setItem('role', role);
        } else {
            localStorage.removeItem('role');
        }
    }, [role]);

    useEffect(() => {
        if (username) {
            localStorage.setItem('username', username);
        } else {
            localStorage.removeItem('username');
        }
    }, [username]);

    const handleLogin = (token, role, username) => {
        setToken(token);
        setRole(role);
        setUsername(username);
    };

    const handleLogout = () => {
        setToken('');
        setRole('');
        setUsername('');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        navigate('/login');
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
