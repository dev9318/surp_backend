const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AccidentSchema = new Schema({
    Date: {
        type: String,
        required: [true, 'field is required']
    },
    Type: {
        type: String,
        required: [true, 'field is required']
    },
    Location: {
        type: Boolean,
        required: [true, 'field is required']
    },
    Company: {
        type: Boolean,
        required: [true, 'field is required']
    },
    Deaths: {
        type: Boolean,
        required: [true, 'field is required']
    },
    Injured: {
        type: Boolean,
        required: [true, 'field is required']
    },
    Source: {
        type: Boolean,
        required: [true, 'field is required']
    },

});

const Accidents = mongoose.model('accidents', AccidentSchema);

module.exports = Accidents;