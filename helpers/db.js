const { createConnection } = require('mongoose');
require('dotenv').config();

const collegeSchema = require('../models/College');
const studentSchema = require('../models/Student');

module.exports = async () => {
    const connection = await createConnection(process.env.MONGODB_CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Third argument represents the collection (table) name in the database.
    const College = connection.model('College', collegeSchema, 'colleges');
    const Student = connection.model('Student', studentSchema, 'students');

    return { College, Student };
};
