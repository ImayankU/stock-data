const fs = require('fs');
const csv = require('csv-parser');
const Stock = require('../models/stockModel');

const uploadCSV = (req, res) => {
    const results = [];
    let totalRecords = 0;
    let successfulUploads = 0;
    let failedRecords = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => {
            totalRecords++;
            const validatedData = {
                date: data.Date.trim(),
                symbol: data.Symbol.trim(),
                series: data.Series.trim(),
                prev_close: parseFloat(data['Prev Close']),
                open: parseFloat(data.Open),
                high: parseFloat(data.High),
                low: parseFloat(data.Low),
                last: parseFloat(data.Last),
                close: parseFloat(data.Close),
                vwap: parseFloat(data.VWAP),
                volume: parseFloat(data.Volume),
                turnover: parseFloat(data.Turnover),
                trades: parseInt(data.Trades, 10) || 0,
                deliverable: parseFloat(data['Deliverable Volume']),
                percent_deliverable: parseFloat(data['%Deliverble']),
            };


            const failedFields = [];
            if (!validatedData.date) failedFields.push('date');
            if (!validatedData.symbol) failedFields.push('symbol');
            if (!validatedData.series) failedFields.push('series');
            if (Object.values(validatedData).slice(3).some(value => isNaN(value))) {
                failedFields.push('one or more numeric fields');
            }

            if (failedFields.length > 0) {
                const reasons = failedFields.join(', ') + ' are invalid or empty';
                failedRecords.push({ row: data, reason: reasons });
                return;
            }
            results.push(validatedData);
        })
        .on('end', async () => {
            try {

                if (results.length > 0) {
                    const insertResults = await Stock.insertMany(results);
                    successfulUploads = insertResults.length;
                }
                res.json({
                    totalRecords,
                    successfulUploads,
                    failedRecords: failedRecords.length,
                    failedRecords,
                });
            } catch (error) {
                console.error("Error inserting data:", error);
                return res.status(500).json({ message: "Error inserting data", error });
            } finally {
                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error("Error deleting CSV file:", err);
                    }
                });
            }
        })
        .on('error', (error) => {
            console.error("Error reading CSV file:", error);
            res.status(500).json({ message: "Error reading CSV file", error });
        });
};

module.exports = { uploadCSV };
