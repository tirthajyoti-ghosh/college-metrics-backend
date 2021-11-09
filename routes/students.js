const express = require('express');

const router = express.Router();
const students = require('../services/students');

router.get('/', async (req, res) => {
    try {
        res.json(await students.getMultiple());
    } catch (err) {
        console.error('Error while getting programming languages', err.message);
    }
});

module.exports = router;
