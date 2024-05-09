import React, { useState } from "react";
import axios from "axios";
import "./CreateEmployee.scss";
import toast from "react-hot-toast";
const CreateEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    designation: "HR",
    gender: "M",
    course: [],
  });
  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    console.log(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? checked
            ? [...prevData[name], value]
            : prevData[name].filter((item) => item !== value)
          : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    for (const key in formData) {
      if (!formData[key]) {
        toast.error(`Please fill in ${key}.`);
        return;
      }
    }
    if (formData.course.length === 0) {
      toast.error("Please select at least one course.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        formData
      );
      console.log("User registered", response);
      console.log(formData);
      toast.success(response.data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        mobile: "",
        designation: "",
        gender: "",
        course: [],
      });
    } catch (error) {
      console.log("Error in registration", error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="createEmployee-container">
      <form onSubmit={handleSubmit}>
        <h1>Create Employee</h1>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            placeholder="Enter your Mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Designation</label>
          <select
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div>
          <label>Gender</label>
          <span>
            <input
              type="radio"
              name="gender"
              value="M"
              checked={formData.gender === "M"}
              onChange={handleChange}
            />
            <label>Male</label>
          </span>
          <span>
            <input
              type="radio"
              name="gender"
              value="F"
              checked={formData.gender === "F"}
              onChange={handleChange}
            />
            <label>Female</label>
          </span>
        </div>
        <div>
          <label>Courses</label>
          <span>
            <input
              type="checkbox"
              name="course"
              value="MCA"
              checked={formData.course.includes("MCA")}
              onChange={handleChange}
            />
            <label>MCA</label>
          </span>
          <span>
            <input
              type="checkbox"
              name="course"
              value="BCA"
              checked={formData.course.includes("BCA")}
              onChange={handleChange}
            />
            <label>BCA</label>
          </span>
          <span>
            <input
              type="checkbox"
              name="course"
              value="BSC"
              checked={formData.course.includes("BSC")}
              onChange={handleChange}
            />
            <label>BSC</label>
          </span>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
