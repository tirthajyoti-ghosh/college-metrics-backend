const express = require('express');

const router = express.Router();
const students = require('../services/students');

router.get('/:id', async (req, res) => {
    try {
        res.json(await students.getStudentDetails(req.params.id));
    } catch (err) {
        res.sendStatus(500);
        console.error('Error', err.message);
    }
});

module.exports = router;
