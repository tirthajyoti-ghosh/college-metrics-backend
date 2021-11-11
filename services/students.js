/* eslint-disable no-underscore-dangle */
const { Types } = require('mongoose');
const connectToDatabase = require('../helpers/db');

async function getStudentsByCollege(collegeId) {
    const { Student } = await connectToDatabase();
    const { ObjectId } = Types;

    const students = await Student.find({ collegeId: ObjectId(collegeId) }, {
        name: 1,
        yearOfBatch: 1,
        collegeId: 1,
        skills: 1,
    }).lean();

    students.forEach((student) => {
        student.id = student._id;
        delete student._id;
    });

    return students;
}

async function getStudentDetails(id) {
    const { Student } = await connectToDatabase();
    const { ObjectId } = Types;

    const studentData = await Student.aggregate([
        {
            $match: { _id: ObjectId(id) }, // Get student details by id
        },
        {
            $lookup: { // Lookup college details by collegeId field in student document
                from: 'colleges',
                localField: 'collegeId',
                foreignField: '_id',
                as: 'college',
            },
        },
        {
            $unwind: { path: '$college' }, // Property college will be an array of 1 element so unwind it
        },
        {
            $project: { // Get only required fields
                name: 1,
                yearOfBatch: 1,
                skills: 1,
                'college._id': 1,
                'college.name': 1,
                'college.city': 1,
                'college.state': 1,
                'college.country': 1,
                'college.yearFounded': 1,
                'college.numberOfStudents': 1,
                'college.courses': 1,
            },
        },
    ]);

    const student = studentData[0];

    student.id = student._id;
    delete student._id;

    student.college.id = student.college._id;
    delete student.college._id;

    return student;
}

module.exports = {
    getStudentsByCollege,
    getStudentDetails,
};
