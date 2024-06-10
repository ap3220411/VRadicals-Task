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
      const response = await Axios.get("http://localhost:5000/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
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
      const response = await Axios.post(
        "http://localhost:5000/addemployees",
        { name, role, email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success === false) {
        throw new Error(response.data.message);
      }
      setNewEmployee("");
      setNewEmail("");
      setNewRole("");
      fetchEmployees();
      alert("Employees Added Successfully");
    } catch (error) {
      console.error("Error adding employee:", error.message);
      alert("Email is already Used");
      setError(error.message);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2>HR Dashboard</h2>
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
            Add Employee
          </button>
        </form>
      </div>
      <ul className="list-group mt-4">
        {employees.map((employee) => (
          <li key={employee.id} className="list-group-item">
            <div>
              <h5>Name:-  {employee.name}</h5> <h5>Technology:-  {employee.role}</h5>
              <h6>Email :-  {employee.email}</h6>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default HRDashboard;
