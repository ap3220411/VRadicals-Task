import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboardStyles.css";
import Axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate(); // Hook for navigation

  const [pendingEmployees, setPendingEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    fetchPendingEmployees();
  }, []);
  console.log(pendingEmployees);

  const fetchPendingEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        navigate("/");
        return;
      }
      const response = await Axios.get(
        "http://localhost:5000/employees/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPendingEmployees(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
      setError(error.message);
    }
  };

  const handleApproveEmployee = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        navigate("/");
        return;
      }
      await Axios.put(
        `http://localhost:5000/employees/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPendingEmployees();
      alert("You Are  Selected")
    } catch (error) {
      console.error("Error approving employee:", error.message);
      setError(error.message);
    }
  };

  const handleRejectEmployee = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        navigate("/");
        return;
      }
      await Axios.put(
        `http://localhost:5000/employees/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPendingEmployees();
      alert("You Are Not Selected")
    } catch (error) {
      console.error("Error rejecting employee:", error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!authenticated) {
      navigate("/");
    }
  }, [authenticated, navigate]);

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-heading">Admin Dashboard</h2>
      {error && <p className="admin-error-message">{error}</p>}
      <ul className="admin-employee-list">
        {pendingEmployees.map((employee) => (
          <li key={employee._id} className="admin-employee-item">
            <span><h3>{employee.name}</h3></span>
            <div>
              <button
                className="admin-approve-button"
                onClick={() => handleApproveEmployee(employee._id)} // Pass employee._id to handleApproveEmployee
              >
                Approve
              </button>
              <button
                className="admin-reject-button"
                onClick={() => handleRejectEmployee(employee._id)} // Pass employee._id to handleRejectEmployee
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
