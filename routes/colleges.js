const express = require('express');

const router = express.Router();
const colleges = require('../services/colleges');

router.get('/details/:id', async (req, res) => {
    try {
        res.json(await colleges.getCollegeDetails(req.params.id));
    } catch (err) {
        console.error('Error', err.message);
    }
});

router.get('/similar/:id', async (req, res) => {
    try {
        res.json(await colleges.getSimilarColleges(req.params.id));
    } catch (err) {
        console.error('Error', err.message);
    }
});

module.exports = router;
