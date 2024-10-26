const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Stock = require('../models/stockModel');
const { uploadCSV } = require('../controllers/stockController');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid filename collisions
    },
});

const upload = multer({ storage });

// Route to upload CSV
router.post('/upload_csv', upload.single('file'), uploadCSV); // 'file' should match the input name in the form

// Endpoint to get the highest volume
router.get('/highest_volume', async (req, res) => {
    try {
        const highestVolumeRecord = await Stock.findOne().sort({ volume: -1 });
        if (!highestVolumeRecord) {
            return res.status(404).json({ message: 'No records found' });
        }
        res.json(highestVolumeRecord);
    } catch (error) {
        console.error("Error retrieving highest volume:", error);
        res.status(500).json({ message: "Error retrieving highest volume", error });
    }
});

// Endpoint to get the average close price
router.get('/average_close', async (req, res) => {
    try {
        const averageClose = await Stock.aggregate([
            {
                $group: {
                    _id: null,
                    averageClose: { $avg: "$close" }
                }
            }
        ]);
        if (averageClose.length === 0) {
            return res.status(404).json({ message: 'No records found' });
        }
        res.json(averageClose[0].averageClose);
    } catch (error) {
        console.error("Error calculating average close:", error);
        res.status(500).json({ message: "Error calculating average close", error });
    }
});

// Endpoint to get the average VWAP
router.get('/average_vwap', async (req, res) => {
    try {
        const averageVWAP = await Stock.aggregate([
            {
                $group: {
                    _id: null,
                    averageVWAP: { $avg: "$vwap" }
                }
            }
        ]);
        if (averageVWAP.length === 0) {
            return res.status(404).json({ message: 'No records found' });
        }
        res.json(averageVWAP[0].averageVWAP);
    } catch (error) {
        console.error("Error calculating average VWAP:", error);
        res.status(500).json({ message: "Error calculating average VWAP", error });
    }
});

module.exports = router;
