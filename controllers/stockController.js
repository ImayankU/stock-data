const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Stock = require('../models/stockModel'); // Import your Mongoose model

const uploadCSV = (req, res) => {
    const results = [];
    let totalRecords = 0;
    let successfulUploads = 0;
    let failedRecords = [];

    // Check if file is uploaded
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    // Read the uploaded CSV file
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => {
            totalRecords++;

            const validatedData = {
                date: data.Date,
                symbol: data.Symbol,
                series: data.Series,
                prev_close: parseFloat(data['Prev Close']) || null,
                open: parseFloat(data.Open) || null,
                high: parseFloat(data.High) || null,
                low: parseFloat(data.Low) || null,
                last: parseFloat(data.Last) || null,
                close: parseFloat(data.Close) || null,
                vwap: parseFloat(data.VWAP) || null,
                volume: parseFloat(data.Volume) || null,
                turnover: parseFloat(data.Turnover) || null,
                trades: data.Trades !== "" ? parseInt(data.Trades, 10) : 0, // Default to 0 if empty
                deliverable: parseFloat(data['Deliverable Volume']) || null,
                percent_deliverable: parseFloat(data['%Deliverble']) || null,
            };

            // Check for NaN values
            if (Object.values(validatedData).some(value => value === null)) {
                failedRecords.push({ row: data, reason: 'Invalid numeric value or empty field' });
                return; // Skip this row
            }

            // If all validations pass, push to results
            results.push(validatedData);
        })
        .on('end', async () => {
            try {
                // Insert all valid records into the database
                const insertResults = await Stock.insertMany(results);
                successfulUploads = insertResults.length;
            } catch (error) {
                console.error("Error inserting data", error);
                return res.status(500).json({ message: "Error inserting data", error });
            }

            // Prepare response
            res.json({
                totalRecords,
                successfulUploads,
                failedRecords: failedRecords.length,
                failedRecords,
            });
        })
        .on('error', (error) => {
            console.error("Error reading CSV file", error);
            res.status(500).json({ message: "Error reading CSV file", error });
        });
};

module.exports = {
    uploadCSV,
};
