const mongoose = require('mongoose');

const timerSchema = new mongoose.Schema({
    taskid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'tasks',
          required: true  // Fix: 'require' -> 'required'
    },
    assignid: {
        type: mongoose.Schema.Types.ObjectId,
          ref: 'employees',
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
