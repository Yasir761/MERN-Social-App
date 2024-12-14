import axios from 'axios';
import dotenv from "dotenv"

dotenv.config()
const API = axios.create({ baseURL: Process.env.baseURL });

export const uploadImage = (data) => API.post('/upload/', data);
export const uploadPost = (data) => API.post('/post', data);