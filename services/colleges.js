/* eslint-disable no-underscore-dangle */
const connectToDatabase = require('../helpers/db');
const { collegeProjections } = require('../helpers/general');

async function getCollegeDetails(id) {
    try {
        const { College } = await connectToDatabase();

        const college = await College.findById(id, collegeProjections).lean();

        if (!college) {
            return null;
        }

        college.id = college._id;
        delete college._id;

        return college;
    } catch (error) {
        return null;
    }
}

async function getSimilarColleges(id) {
    const { College } = await connectToDatabase();

    let college;
    try {
        college = await College.findById(id, {
            city: 1,
            state: 1,
            courses: 1,
            country: 1,
        }).lean();

        if (!college) {
            return null;
        }
    } catch (error) {
        return null;
    }

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

    if (similarColleges.length === 0) {
        return null;
    }

    similarColleges.forEach((item) => {
        item.id = item._id;
        delete item._id;
    });

    return similarColleges;
}

async function getCollegesStats() {
    const { College } = await connectToDatabase();

    let countryStats;
    let courseStats;

    const promises = [
        (async () => {
            // Inspired by https://stackoverflow.com/a/23116396/11686135
            const countryStatsData = await College.aggregate([
                {
                    $group: {
                        _id: '$country',
                        count: { $sum: 1 },
                    },
                },
            ]);

            countryStats = countryStatsData.map((item) => ({
                country: item._id,
                count: item.count,
            }));
        })(),
        (async () => {
            // Inspired by https://stackoverflow.com/a/46445620/11686135
            const coursesStatsData = await College.aggregate([
                {
                    $unwind: {
                        path: '$courses',
                    },
                },
                {
                    $group: {
                        _id: '$courses',
                        count: { $sum: 1 },
                    },
                },
            ]);

            courseStats = coursesStatsData.map((item) => ({
                course: item._id,
                count: item.count,
            }));
        })(),
    ];
    await Promise.all(promises);

    return {
        countryStats,
        courseStats,
    };
}

async function getSpecificColleges(type, value) {
    const { College } = await connectToDatabase();

    let colleges;
    if (type === 'course') {
        colleges = await College.find({ courses: { $in: [value] } }, collegeProjections).lean();
    } else {
        colleges = await College.find({ country: value }, collegeProjections).lean();
    }

    if (colleges.length === 0) {
        return null;
    }

    colleges.forEach((item) => {
        item.id = item._id;
        delete item._id;
    });

    return colleges;
}

async function getAllColleges() {
    const { College } = await connectToDatabase();

    const colleges = await College.find({}, collegeProjections).lean();

    colleges.forEach((item) => {
        item.id = item._id;
        delete item._id;
    });

    return colleges;
}

module.exports = {
    getCollegeDetails,
    getSimilarColleges,
    getCollegesStats,
    getSpecificColleges,
    getAllColleges,
};
