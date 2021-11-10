const { Schema } = require('mongoose');

module.exports = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
    },
    yearFounded: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: true,
    },
    numberOfStudents: {
        type: Number,
        required: false,
        default: 0,
    },
    courses: {
        type: [String],
        required: true,
        default: [],
    },
}, { timestamps: true });
