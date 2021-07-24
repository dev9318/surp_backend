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

const AccidentStageSchema = new Schema({
    author: {
        type: String,
        required: [true, 'field is required']
    },
    location: {
        type: String,
        required: [true, 'field is required']
    },
    industry: {
        type: String,
        required: [true, 'field is required']
    },
    details: {
        type: String,
        required: [true, 'field is required']
    },
    selectedDate: {
        type: String,
        required: [true, 'field is required']
    },
    keyword: {
        type: [String],
        required: [true, 'field is required']
    },
    type: {
        type: String,
        required: [true, 'field is required']
    },
},{ timestamps: true });

const AccidentStage = mongoose.model('accidents-stage', AccidentStageSchema);

module.exports = AccidentStage;