import axios from 'axios';
import dotenv from "dotenv"

dotenv.config()
const API = axios.create({ baseURL: Process.env.baseURL });

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);
export const likePost = (id, userId) => API.put(`post/${id}/like_dislike`, { userId: userId })