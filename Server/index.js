import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/upload.js'; // solved 
import { connectDatabase } from './config/db.js';
import { handleErrors } from './Middleware/errorHandler.js';
import validateEnv from './utils/validateEnv.js';


dotenv.config();
validateEnv()


const app = express();


// to serve images for public (public folder)
app.use(express.static('public'));
app.use('/images', express.static('public/images'));


// MiddleWare
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));



const allowedOrigins = [
  'https://mern-social-app-henna.vercel.app/'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));



app.use(handleErrors); // Catch and format errors




// uses of routes

app.get('/health', (req, res) => res.status(200).send('OK'));


app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);

const PORT = process.env.PORT || 4000;
connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});