const express = require('express');
let router = express.Router();

router.get('/', function (req, res) {
    console.log('in /about');

    const developers = [
        {
            firstname: `OrDavid`,
            lastname: `Israelov`,
            id: `209271774`,
            email: `ordavid1045@gmail.com`,
        },
        {
            firstname: `Dor`,
            lastname: `Nagaoker`,
            id: `318353307`,
            email: `dornagauker@gmail.com`,
        },
    ];

    console.log(developers);
    return res.status(200).send(developers);
});

module.exports = router;