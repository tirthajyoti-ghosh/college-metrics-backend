const express = require('express');

const router = express.Router();
const colleges = require('../services/colleges');

router.get('/', async (req, res) => {
    try {
        res.json(await colleges.getMultiple());
    } catch (err) {
        console.error('Error while getting programming languages', err.message);
    }
});

module.exports = router;
