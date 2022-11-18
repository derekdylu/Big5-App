import axios from "axios"

// const SERVER_URL = process.env.SERVER_URL;
const SERVER_URL = null
const instance = axios.create({ baseURL: SERVER_URL || 'http://127.0.0.1:8000' });
const jsonHeader = {
    headers: {
        'Content-Type': 'application/json'
    }
};

// --- Interview
// get all interviews
export const getInterviews = async () => {
    return await instance.get('/interviews').then((res) => {
        return res.data;
    });
}

// get an interviwe by id
export const getInterviewById = async (id) => {
    return await instance.get(`/interview/${id}`).then((res) => {
        return res.data;
    })
}

// post an interview
export const postInterview = async (_userId, _timestamp, _topic, _score, _big, _note, _link) => {
    const param = JSON.stringify({
        userId: _userId,
        timestamp: _timestamp,
        topic: _topic,
        score: _score,
        big: _big,
        note: _note,
        link: _link
    });

    return await instance.post('/post_interview', param, jsonHeader).then((res) => {
        return res.data;
    });
}

// update a game
export const updateInterviewById = async (id, _userId, _timestamp, _topic, _score, _big, _note, _link) => {
    let param = {};

    if (_topic != null) {
        param = {...param, "topic": _topic}
    }
    if (_note != null) {
        param = {...param, "note": _note}
    }

    param = JSON.stringify(param);
    return await instance.put(`/update_interview/${id}`, param, jsonHeader).then((res) => {
        return res.data;
    })
}

// delete a game
export const deleteInterviewById = async (id) => {
    return await instance.delete(`/delete_interview/${id}`).then((res) => {
        return res.data;
    })
}

// --- users

// get all users
export const getUsers = async () => {
    return await instance.get('/users').then((res) => {
        return res.data;
    });
}

// get an user by id
export const getUserbyId = async (id) => {
    return await instance.get(`/user/${id}`).then((res) => {
        return res.data;
    })
}

// post an user
export const postUser = async (_username, _img, _interview) => {
    const param = JSON.stringify({
        username: _username,
        img: _img,
        interview: []
    });

    return await instance.post('/post_user', param, jsonHeader).then((res) => {
        return res.data;
    })
}

// update an user
export const updateUserById = async (id, _username, _img, _interview) => {
    let param = {}

    if (_interview != null) {
        param = {...param, "interview": _interview}
    }

    param = JSON.stringify(param)
    return await instance.put(`update_user/${id}`, param, jsonHeader).then((res) => {
        return res.data
    })
}

// --- OAuth
// TODO