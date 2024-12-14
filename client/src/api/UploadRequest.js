import axios from 'axios';

const API = axios.create({ baseURL: process.env.baseURL });

export const uploadImage = (data) => API.post('/upload/', data);
export const uploadPost = (data) => API.post('/post', data);