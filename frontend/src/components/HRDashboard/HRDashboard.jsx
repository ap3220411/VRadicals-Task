import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./HRDashboard.css";

function HRDashboard() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [name, setNewEmployee] = useState("");
  const [email, setNewEmail] = useState("");
  const [role, setNewRole] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        navigate("/");
        return;
      }
      const response = await Axios.get("https://admin-hr-dashboard-backend.onrender.com/employees", {
        headers: {
          Authorization: `${token}`,
        },
      });
      setEmployees(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        navigate("/");
        return;
      }
      const url = editMode 
        ? `https://admin-hr-dashboard-backend.onrender.com/employees/${editEmployeeId}`
        : "https://admin-hr-dashboard-backend.onrender.com/addemployees";
      const method = editMode ? 'put' : 'post';
      
      const response = await Axios({
        method,
        url,
        data: { name, role, email },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      
      if (response.data.success === false) {
        throw new Error(response.data.message);
      }
      
      setNewEmployee("");
      setNewEmail("");
      setNewRole("");
      setEditMode(false);
      setEditEmployeeId(null);
      fetchEmployees();
      alert(editMode ? "Employee Updated Successfully" : "Employee Added Successfully");
    } catch (error) {
      console.error(`Error ${editMode ? 'updating' : 'adding'} employee:`, error.message);
      alert(error.message.includes('Email') ? "Email is already Used" : `Error ${editMode ? 'updating' : 'adding'} employee`);
      setError(error.message);
    }
  };

  const handleEditClick = (employee) => {
    setNewEmployee(employee.name);
    setNewEmail(employee.email);
    setNewRole(employee.role);
    setEditEmployeeId(employee._id);
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setNewEmployee("");
    setNewEmail("");
    setNewRole("");
    setEditMode(false);
    setEditEmployeeId(null);
  };

  return (
    <>
      <h1>HR Dashboard</h1>
      <div className="container mt-5">
        <h2>{editMode ? "Edit Employee" : "Add Employees"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setNewEmployee(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Role"
              value={role}
              onChange={(e) => setNewRole(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {editMode ? "Update Employee" : "Add Employee"}
          </button>
          {editMode && (
            <button type="button" className="btn btn-secondary ml-2" onClick={handleCancelEdit}>
              Cancel
            </button>
          )}
        </form>
      </div>
      <div className="table-container">
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Technology</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.role}</td>
                <td>{employee.email}</td>
                <td>{employee.status}</td>
                <td>
                  <button className="btn btn-info" onClick={() => handleEditClick(employee)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default HRDashboard;
