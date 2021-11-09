const { Schema } = require('mongoose');

module.exports = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
    },
    yearOfBatch: {
        type: Number,
        required: true,
    },
    collegeId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
        default: [],
    },
}, { timestamps: true });
