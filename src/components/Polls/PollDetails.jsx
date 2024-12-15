// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';

const PollDetails = ({ token, role }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [poll, setPoll] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [message, setMessage] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/polls/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPoll(response.data);
            } catch (error) {
                console.error('Error fetching poll:', error);
                setMessage('Poll not found');
            }
        };
        fetchPoll();
    }, [id, token]);

    useEffect(() => {
        if (role === 'admin') {
            const fetchResults = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/polls/${id}/results`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setResults(response.data.results);
                } catch (error) {
                    console.error('Error fetching poll results:', error);
                }
            };
            fetchResults();
        }
    }, [id, token, role]);

    const handleVote = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/polls/${id}/vote`, { optionId: selectedOption }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/polls/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/polls'); 
            setMessage("Poll deleted", response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    if (!poll) return <div>Loading...</div>;

    return (
        <div>
            <h2>{poll.question}</h2>
            {role !== 'admin' && (
                <>
                    <ul>
                        {poll.options.map((option) => (
                            <li key={option._id}>
                                <label>
                                    <input
                                        type="radio"
                                        name="option"
                                        value={option._id}
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                    />
                                    {option.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleVote}>Vote</button>
                </>
            )}
            {role === 'admin' && (
                <div>
                    <h3>Results</h3>
                    <ul>
                        {results.map((result) => (
                            <li key={result._id}>
                                {result.name}: {result.votes} votes
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleDelete}>Delete Poll</button>
                </div>
            )}
            {message && <p>{message}</p>}
        </div>
    );
} 
 
PollDetails.propTypes = {
    token: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
};
export default PollDetails;