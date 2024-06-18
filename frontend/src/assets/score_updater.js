import axios from 'axios';

export const updateScore = (score) => {
    const token = document.cookie.split('; ').find(row => row.startsWith('_auth=')).split('=')[1];
    const authAxios = axios.create({
        baseURL: "https://quizmaster-beryl.vercel.app/score/",
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    console.log(token);
    if (token) {;
        return authAxios.put(`${score}`);
    }
};
