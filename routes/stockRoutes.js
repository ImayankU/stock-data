const express = require('express');
const multer = require('multer'); // Import multer
const { uploadCSV } = require('../controllers/stockController'); // Adjust the path as necessary

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Make sure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Append timestamp to avoid name collisions
    }
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });

// Define your routes
router.post('/upload', upload.single('file'), uploadCSV);

module.exports = router;
