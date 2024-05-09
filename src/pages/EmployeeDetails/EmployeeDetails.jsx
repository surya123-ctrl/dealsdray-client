import React, { useState, useEffect } from "react";
import axios from "axios";
// import { AuthContext } from "../../contexts/AuthContext";
import "./EmployeeDetails.scss";
import { LiaEdit } from "react-icons/lia";
import { FcDeleteRow } from "react-icons/fc";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EmployeeDetails = () => {
  //   const loggedInDetails = useContext(AuthContext);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0); // Initialize with 0
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/employee/getEmployeeDetails"
        );
        setEmployeeDetails(response.data);
        setTotalEmployees(response.data.length); // Update total count
      } catch (error) {
        console.log("Error in fetching employee details: ", error);
      }
    };
    fetchEmployeeDetails();
  }, []);

  const handleDelete = async (employeeId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/employee/deleteEmployeeDetails/${employeeId}`
      );
      toast.success(response.data);
      setEmployeeDetails(
        employeeDetails.filter((employee) => employee._id !== employeeId)
      );
      setTotalEmployees(totalEmployees - 1); // Decrease total count
    } catch (error) {
      console.log("Error in deleting Employee", error);
    }
  };

  const handleUpdate = async (employeeId) => {
    navigate(`/edit-employee/${employeeId}`);
  };
  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployeeDetails = () => {
    let sortedDetails = [...employeeDetails];
    if (sortConfig.key !== null) {
      sortedDetails.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedDetails;
  };
  return (
    <div className="employee-details-container">
      <h2>Employee Details</h2>
      <p>Total Count: {totalEmployees}</p>
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort("_id")}>
              ID{" "}
              {sortConfig.key === "_id" && (
                <span>{sortConfig.direction === "ascending" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => requestSort("name")}>
              Name{" "}
              {sortConfig.key === "name" && (
                <span>{sortConfig.direction === "ascending" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => requestSort("email")}>
              Email{" "}
              {sortConfig.key === "email" && (
                <span>{sortConfig.direction === "ascending" ? "▲" : "▼"}</span>
              )}
            </th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th onClick={() => requestSort("createdAt")}>
              Created On{" "}
              {sortConfig.key === "createdAt" && (
                <span>{sortConfig.direction === "ascending" ? "▲" : "▼"}</span>
              )}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployeeDetails().map((employee, index) => (
            <tr key={index}>
              <td>{employee._id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course.join(", ")}</td>
              <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
              <td className="action-buttons">
                <LiaEdit onClick={() => handleUpdate(employee._id)} />
                <FcDeleteRow onClick={() => handleDelete(employee._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDetails;
