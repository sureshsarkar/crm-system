
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,  // Convert email to lowercase before storing
    unique: true, 
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);  // Email format validation
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  mobile: {
    type: String,
    required: true,
    unique: true,  // Mobile number should be unique
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'], // Limit options to Male, Female, Other
    required: true,
  },
  role: {
    type: Number,
    required: true,
    enum: [0, 1],  // Assuming 0 is user, 1 is admin
  },
  employeeid: {
    type: String,
    required: true,
    unique: true,  // Employee ID should be unique
  },
  status: {
    type: Number,
    required: true,
    enum: [0, 1],  // Assuming 0 is inactive, 1 is active
  },
  projects: [
    {
         type: mongoose.Schema.Types.ObjectId,
        ref: "projects"
    }
],

}, { timestamps: true });  // Automatically add createdAt and updatedAt fields

// Create a model using the schema
const employeeModel = mongoose.model('employees', employeeSchema);

module.exports = employeeModel;
