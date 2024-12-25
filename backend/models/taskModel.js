const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    tasktimer:{
        type:Number,
        default:0
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees',
        require: [true, 'creater id is required']
    },
    follower: {
      type: mongoose.Types.ObjectId,
      ref: 'employees',
      require: [true, 'user id is required']

    },
    assignto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees',
        require: [true, 'Assign id is required']
    },
    projectname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects',
        require: [true, 'project id is required']
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
    descreption: {
        type: String,
        default: 'Task Descreption'
    }
}, { timestamps: true });

const taskModel = mongoose.model('tasks', taskSchema);

module.exports = taskModel;
