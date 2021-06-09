const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AccidentSchema = new Schema({
    Date: {
        type: Date,
        required: [true, 'field is required']
    },
    Type: {
        type: String,
        required: [true, 'field is required']
    },
    Location: {
        type: String,
        required: [true, 'field is required']
    },
    Company: {
        type: String,
        required: [true, 'field is required']
    },
    Deaths: {
        type: String,
        // required: [true, 'field is required']
    },
    Injured: {
        type: String,
        // required: [true, 'field is required']
    },
    Source: {
        type: [String],
        required: [true, 'field is required']
    },

}, { timestamps: true });

const Accident = mongoose.model('accidents', AccidentSchema);

module.exports = Accident;