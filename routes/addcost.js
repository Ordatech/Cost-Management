const express = require('express');
const crypto = require('crypto');
const { Cost } = require('../models/database');
let router = express.Router();

router.post('/', function (req, res) {
    const currentDate = new Date();

    const costData = {
        ...req.body,
        id: crypto.randomUUID(),
    };

    if (!costData.day || !costData.month || !costData.year) {
        costData.day = currentDate.getDate();
        costData.month = currentDate.getMonth() + 1;
        costData.year = currentDate.getFullYear();
    }

    Cost.create(costData)
        .then((cost) => {
            console.log(`Created new cost: ${cost}`);
            res.status(200).send(`Cost created successfully: ${cost}`);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error creating cost!\nOne of the parameters invalid');
        });
});



module.exports = router;
