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
    const { College } = await connectToDatabase();

    const college = await College.findById(id, {
        city: 1,
        state: 1,
        courses: 1,
        country: 1,
    }).lean();

    const similarColleges = await College.aggregate([
        {
            $project: {
                similarCourses: {
                    $setIntersection: [college.courses, '$courses'],
                },
                name: 1,
                yearFounded: 1,
                city: 1,
                state: 1,
                country: 1,
                numberOfStudents: 1,
            },
        },
        {
            $match: {
                $or: [
                    { state: college.state },
                    { city: college.city },
                ],
                country: college.country,
                _id: { $not: { $eq: college._id } },

            },
        },
    ]);

    similarColleges.forEach((item) => {
        item.id = item._id;
        delete item._id;
    });

    return similarColleges;
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
