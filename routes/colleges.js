const express = require('express');

const router = express.Router();
const colleges = require('../services/colleges');
const students = require('../services/students');

// Get colleges stats
router.get('/stats', async (req, res) => {
    try {
        res.json(await colleges.getCollegesStats());
    } catch (err) {
        console.error('Error', err);
    }
});

// Get similar colleges by college id
router.get('/:id/similar', async (req, res) => {
    try {
        res.json(await colleges.getSimilarColleges(req.params.id));
    } catch (err) {
        console.error('Error', err.message);
    }
});

// Get students by college id
router.get('/:id/students', async (req, res) => {
    try {
        res.json(await students.getStudentsByCollege(req.params.id));
    } catch (err) {
        console.error('Error', err.message);
    }
});

// Get college details by id
router.get('/:id', async (req, res) => {
    try {
        res.json(await colleges.getCollegeDetails(req.params.id));
    } catch (err) {
        console.error('Error', err.message);
    }
});

module.exports = router;
