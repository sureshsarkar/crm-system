const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
     
})

const employeeModel = mongoose.model('employees',employeeSchema);

module.exports = employeeModel;