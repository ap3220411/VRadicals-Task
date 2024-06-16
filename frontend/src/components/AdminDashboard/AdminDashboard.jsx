import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboardStyles.css";
import Axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate(); // Hook for navigation

  const [pendingEmployees, setPendingEmployees] = useState([]);
  const [approvedEmployees, setApprovedEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(true);

  const fetchPendingEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        navigate("/");
        return;
      }
      const response = await Axios.get(
        "https://admin-hr-dashboard-backend.onrender.com/employees/pending",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setPendingEmployees(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching pending employees:", error.message);
      setError(error.message);
    }
  };

  const fetchApprovedEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        navigate("/");
        return;
      }
      const response = await Axios.get(
        "https://admin-hr-dashboard-backend.onrender.com/employees/approve",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setApprovedEmployees(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching approved employees:", error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchPendingEmployees();
    fetchApprovedEmployees();
  }, []);

  const handleApproveEmployee = async (id) => {
    if (window.confirm("Are you sure you want to approve this employee?")) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found");
          navigate("/");
          return;
        }
        await Axios.put(
          `https://admin-hr-dashboard-backend.onrender.com/employees/${id}/approve`,
          {},
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        fetchPendingEmployees();
        fetchApprovedEmployees();
        alert("Employee approved");
      } catch (error) {
        console.error("Error approving employee:", error.message);
        setError(error.message);
      }
    }
  };

  const handleRejectEmployee = async (id) => {
    if (window.confirm("Are you sure you want to reject this employee?")) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found");
          navigate("/");
          return;
        }
        await Axios.put(
          `https://admin-hr-dashboard-backend.onrender.com/employees/${id}/reject`,
          {},
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        fetchPendingEmployees();
        alert("Employee rejected");
      } catch (error) {
        console.error("Error rejecting employee:", error.message);
        setError(error.message);
      }
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
      <h2>Pending Employees</h2>
      <ul className="admin-employee-list">
        {pendingEmployees.map((employee) => (
          <li key={employee._id} className="admin-employee-item">
            <span><h3>{employee.name}</h3></span>
            <div>
              <button
                className="admin-approve-button"
                onClick={() => handleApproveEmployee(employee._id)}
              >
                Approve
              </button>
              <button
                className="admin-reject-button"
                onClick={() => handleRejectEmployee(employee._id)}
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h2>Approved Employees Team</h2>
      <table className="admin-employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Technology</th>
          </tr>
        </thead>
        <tbody>
          {approvedEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.status}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
