import dotenv from 'dotenv';

const requiredEnv = ['MONGO_URI', 'PORT'];

export default function validateEnv() {
  dotenv.config();

  requiredEnv.forEach((varName) => {
    if (!process.env[varName]) {
      console.error(`Missing required environment variable: ${varName}`);
      process.exit(1); // Exit process if environment variables are missing
    }
  });
}
