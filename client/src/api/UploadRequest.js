import axios from 'axios';

const API = axios.create({ baseURL: 'https://mern-social-app-production-a43f.up.railway.app/' });

export const uploadImage = (data) => API.post('/upload/', data);
export const uploadPost = (data) => API.post('/post', data);