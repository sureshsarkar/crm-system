const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    startdate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    enddate: {
        type: Date,
        required: [true, 'End date is required']
    },
    tasktimer: {
        type: Number,
        default: 0
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees',
        required: [true, 'Creator ID is required']
    },
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees',
        required: [true, 'Follower ID is required']
    },
    assignto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees',
        required: [true, 'Assignee ID is required']
    },
    projectname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects',
        required: [true, 'project id is required']
    },
    tag: {
        type: String,
        default: 'Task Tag'
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Process', 'Completed', 'On Hold'],
        default: 'Not Started'
    },
    description: {
        type: String,
        default: 'Task Description'
    }
}, { timestamps: true });

const taskModel = mongoose.model('tasks', taskSchema);

module.exports = taskModel;
