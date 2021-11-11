const express = require('express');

const router = express.Router();
const students = require('../services/students');

router.get('/:id', async (req, res) => {
    try {
        const result = await students.getStudentDetails(req.params.id);

        if (result === null) {
            res.status(404).send('Student not found.');
        } else {
            res.json(result);
        }
    } catch (err) {
        res.sendStatus(500);
        console.error('Error', err.message);
    }
});

module.exports = router;
