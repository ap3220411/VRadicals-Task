// models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
   
  },
  email: {
    type: String,
    required: true
  },
 
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
