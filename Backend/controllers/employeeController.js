// controllers/employeeController.js
const Employee = require('../models/Employee');


// Add employee
const addEmployee = async (req, res) => {
  try {
    const { name,role,email } = req.body;

    console.log('Request Body:', req.body);

    const newEmployee = new Employee({
      role,
      name,
      email,
    });

    await newEmployee.save();

    res.status(201).json({ success: true, message: 'Employee added successfully' });
  } catch (error) {
    console.error('Error adding employee:', error); // Log the error for debugging
    res.status(400).json({ success: false, message: error.message });
  }
};


// Approve employee
const approveEmployee = async (req, res) => {

  
  try {
    const { employeeId } = req.params;
    console.log(employeeId.id)
    const employee = await Employee.findByIdAndUpdate(employeeId, { status: 'Approved' }, { new: true });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee approved successfully', employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Reject employee
const rejectEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await Employee.findByIdAndUpdate(employeeId, { status: 'Rejected' }, { new: true });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee rejected successfully', employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all employees
const getPendingEmployees = async (req, res) => {
  try {
    const pendingEmployees = await Employee.find({ status: 'Pending' });
    res.json(pendingEmployees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { addEmployee, approveEmployee, rejectEmployee, getPendingEmployees };
