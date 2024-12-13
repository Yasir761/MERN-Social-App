import express from 'express';
import multer from 'multer';

const router = express.Router();

// Storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images"); // Folder where images will be stored
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name); // Use the provided name from the request body
    },
});

const upload = multer({ storage: storage });

// Route to handle file uploads
router.post('/', upload.single("file"), (req, res) => {
    try {
        res.status(200).json("File uploaded successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json("Error uploading the file");
    }
});

export default router;
