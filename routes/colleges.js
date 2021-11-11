const express = require('express');

const router = express.Router();
const colleges = require('../services/colleges');
const students = require('../services/students');

// Get colleges stats
router.get('/stats', async (req, res) => {
    try {
        res.json(await colleges.getCollegesStats());
    } catch (err) {
        res.sendStatus(500);
        console.error('Error', err);
    }
});

// Get colleges stats
router.get('/list', async (req, res) => {
    try {
        const { type, value } = req.query;

        if (!type || !value) { // 'type' and 'value' query params are required
            res.status(400).send("'type' and 'value' query params must be present.");
        } else if (type !== 'country' && type !== 'course') { // 'type' query param must be 'country' or 'course'
            res.status(400).send("Invalid 'type'. Must be 'country' or 'course'.");
        } else {
            res.json(await colleges.getSpecificColleges(type, value));
        }
    } catch (err) {
        res.sendStatus(500);
        console.error('Error', err);
    }
});

// Get similar colleges by college id
router.get('/:id/similar', async (req, res) => {
    try {
        res.json(await colleges.getSimilarColleges(req.params.id));
    } catch (err) {
        res.sendStatus(500);
        console.error('Error', err.message);
    }
});

// Get students by college id
router.get('/:id/students', async (req, res) => {
    try {
        res.json(await students.getStudentsByCollege(req.params.id));
    } catch (err) {
        res.sendStatus(500);
        console.error('Error', err.message);
    }
});

// Get college details by id
router.get('/:id', async (req, res) => {
    try {
        res.json(await colleges.getCollegeDetails(req.params.id));
    } catch (err) {
        res.sendStatus(500);
        console.error('Error', err.message);
    }
});

module.exports = router;
