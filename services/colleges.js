/* eslint-disable no-underscore-dangle */
const connectToDatabase = require('../helpers/db');

async function getCollegeDetails(id) {
    const { College } = await connectToDatabase();

    const college = await College.findById(id, {
        name: 1,
        yearFounded: 1,
        city: 1,
        state: 1,
        country: 1,
        numberOfStudents: 1,
        courses: 1,
    }).lean();

    college.id = college._id;
    delete college._id;

    return college;
}

async function getSimilarColleges(id) {
    return {
        data: 'IT WORKS!',
    };
}

async function getCollegesStats() {
    return {
        data: 'IT WORKS!',
    };
}

module.exports = {
    getCollegeDetails,
    getSimilarColleges,
    getCollegesStats,
};
