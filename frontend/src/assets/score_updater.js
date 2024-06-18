import axios from 'axios';

export const updateScore = (score) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('_auth=')).split('=')[1];
    const authAxios = axios.create({
        baseURL: "http://127.0.0.1:8000/score/",
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    console.log(token);
    if (token) {;
        return authAxios.put(`${score}`);
    }
};
