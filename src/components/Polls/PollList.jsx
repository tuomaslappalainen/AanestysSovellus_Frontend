// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PollList = ({ token }) => {
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/polls', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPolls(response.data);
            } catch (error) {
                console.error('Error fetching polls:', error);
            }
        };
        fetchPolls();
    }, [token]);

    return (
        <div>
            <h2>Polls</h2>
            <ul>
                {polls.map((poll) => (
                    <li key={poll._id}>
                        <Link to={`/polls/${poll._id}`}>{poll.question}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

PollList.propTypes = {
    token: PropTypes.string.isRequired,
};

export default PollList;