const connectToDatabase = require('../helpers/db');
const collegeData = require('./sample-colleges.json');
const studentData = require('./sample-students.json');

async function seed() {
    try {
        const { College, Student } = await connectToDatabase();

        await College.insertMany(collegeData);

        const studentsArray = [];
        const colleges = await College.find({});
        colleges.forEach((college) => {
            // eslint-disable-next-line no-underscore-dangle
            const collegeId = college._id;
            studentsArray.push(studentData.splice(0, 100).map((student) => {
                student.collegeId = collegeId;
                return student;
            }));
        });

        await Student.insertMany(studentsArray.flat());

        await College.updateMany({}, { $set: { numberOfStudents: 100 } });

        console.log('Successfully seeded database');
    } catch (err) {
        console.log(err);
    }
}

seed();
