const mongoose = require('mongoose');

const timerSchema = new mongoose.Schema({
    taskid: {
        type: String,  // Fix: 'Type' -> 'type'
        required: true  // Fix: 'require' -> 'required'
    },
    assignid: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        default: 'No comment'
    },
    timer: {
        starttime: {
            type: Date,
        },
        stoptime: {
            type: Date,
        },
        totalduration: {
            type: Number,  // Duration in milliseconds
            default: 0
        },
        isrunning: {
            type: Boolean,
            default: false
        }
    }
}, { timestamps: true });

// Model creation
const timerModel = mongoose.model('timers', timerSchema);

module.exports = timerModel;
