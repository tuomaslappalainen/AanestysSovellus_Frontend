// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const CreatePoll = ({ token }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [message, setMessage] = useState('');

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleCreatePoll = async (e) => {
        e.preventDefault();
        const formattedOptions = options.map(option => ({ name: option }));
        try {
            const response = await axios.post('http://localhost:5000/api/polls', { question, options: formattedOptions }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Create Poll</h2>
            <form onSubmit={handleCreatePoll}>
                <input type="text" placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} required />
                {options.map((option, index) => (
                    <input key={index} type="text" placeholder={`Option ${index + 1}`} value={option} onChange={(e) => handleOptionChange(index, e.target.value)} required />
                ))}
                <button type="button" onClick={handleAddOption}>Add Option</button>
                <button type="submit">Create Poll</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};
CreatePoll.propTypes = {
    token: PropTypes.string.isRequired,
};

export default CreatePoll;
