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
        console.error('Error getting stats', err);
    }
});

// Get colleges list
router.get('/list', async (req, res) => {
    try {
        const { type, value } = req.query;

        if (!type && !value) {
            res.json(await colleges.getAllColleges());
        }
        // Both 'type' and 'value' query params need to be specified
        if (type && !value) {
            res.status(400).send("'value' query params must be present.");
        } else if (!type && value) {
            res.status(400).send("'type' query params must be present.");
        } else if (type !== 'country' && type !== 'course') { // 'type' query param must be 'country' or 'course'
            res.status(400).send("Invalid 'type'. Must be 'country' or 'course'.");
        } else {
            const result = await colleges.getSpecificColleges(type, value);

            if (result === null) {
                res.status(404).send('No colleges found.');
            } else {
                res.json(result);
            }
        }
    } catch (err) {
        res.sendStatus(500);
        console.error('Error getting specif list', err);
    }
});

// Get similar colleges by college id
router.get('/:id/similar', async (req, res) => {
    try {
        const result = await colleges.getSimilarColleges(req.params.id);

        if (result === null) {
            res.status(404).send('No similar colleges found.');
        } else {
            res.json(result);
        }
    } catch (err) {
        res.sendStatus(500);
        console.error('Error getting similar colleges', err.message);
    }
});

// Get students by college id
router.get('/:id/students', async (req, res) => {
    try {
        const result = await students.getStudentsByCollege(req.params.id);

        if (result === null) {
            res.status(404).send('No students found for this college.');
        } else {
            res.json(result);
        }
    } catch (err) {
        res.sendStatus(500);
        console.error('Error getting students', err.message);
    }
});

// Get college details by id
router.get('/:id', async (req, res) => {
    try {
        const result = await colleges.getCollegeDetails(req.params.id);

        if (result === null) {
            res.status(404).send('College not found.');
        } else {
            res.json(result);
        }
    } catch (err) {
        res.sendStatus(500);
        console.error('Error getting college details', err.message);
    }
});

module.exports = router;
