import axios from 'axios';

const API_URL = 'http://localhost:5000/api/polls/';

const createPoll = (question, options, token) => {
    return axios.post(API_URL, { question, options }, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

const getPolls = () => {
    return axios.get(API_URL);
};

const getPoll = (id) => {
    return axios.get(API_URL + id);
};

const voteOnPoll = (id, optionId, token) => {
    return axios.post(API_URL + id + '/vote', { optionId }, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export default {
    createPoll,
    getPolls,
    getPoll,
    voteOnPoll
};