const express = require('express');
const { Cost, Report } = require('../models/database');
const url = require('url');
const router = express.Router();

router.get('/', async (req, res) => {
    const { user_id, year, month } = req.query;

    const categories = ['food', 'health', 'housing', 'sport', 'education', 'transportation', 'other'];

    const report = {};
    categories.forEach((category) => {
        report[category] = [];
    });

    try {
        const costs = await Cost.find({ user_id, year, month });

        if (costs.length === 0) {
            return res.status(404).send('No reports found with the specified parameters');
        }

        costs.forEach((cost) => {
            const { day, description, sum, category } = cost;
            report[category].push({ day, description, sum });
        });

        const reportDocument = new Report({
            user_id,
            year,
            month,
            report
        });

        await reportDocument.save();

        res.json(report);
    } catch (err) {
        res.status(500).json({ error: 'Failed to generate report' });
    }
});

module.exports = router;
