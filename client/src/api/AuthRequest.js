import axios from 'axios';

const API = axios.create({ baseURL: 'https://mern-social-app-production-a43f.up.railway.app/' });

export const logIn = (formData) => API.post('/auth/login', formData); 

export const signUp = (formData) => API.post('/auth/register', formData);