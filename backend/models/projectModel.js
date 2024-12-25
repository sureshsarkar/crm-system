
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectname: {
    type: String,
    required: true,
    unique: true, 
  },
  projectdescreption:{
    type:String,
    required:true,
    default:"Project descreption"
  },
  status: {
    type: Number,
    required: true,
    enum: [0, 1],  // Assuming 0 is inactive, 1 is active
    default:1
  }
}, { timestamps: true });  // Automatically add createdAt and updatedAt fields

// Create a model using the schema
const projectModel = mongoose.model('projects', projectSchema);

module.exports = projectModel;
