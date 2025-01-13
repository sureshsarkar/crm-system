import React, { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast';
import Select from "react-select";

const EditEmployee = () => {
  const [projectState, setProjectState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); 

  
  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    password: "",
    mobile: "",
    employeeid: "",
    role: "",
    projects: "",
    gender: "",
    status: "",
  });

  
  const options = projectState.map((project) => ({
    value: project._id,
    label: project.projectname,
  }));
  // Get employee details when the component is mounted
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { data } = await axios.put(`/api/auth/edit-employee/${id}`); // Assuming your backend endpoint is '/api/auth/employee/:id'
        console.log(data);
        
        if (data.success) {
          setInputs({
            employeeid: data.employee.employeeid,
            fullname: data.employee.fullname,
            email: data.employee.email,
            mobile: data.employee.mobile,
            role: data.employee.role,
            projects: data.employee.projects,
            gender: data.employee.gender,
            status: data.employee.status,
          });

          // Initialize selected projects based on the employee's current projects
          const selected = await  data.employee.projects.map((projectId) => {
            return options.find((project) => project.value === projectId);
          });
          setSelectedProjects(selected);
          
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployee();
  }, [id]); // Run once when the id changes


  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // Handle change event for the select element
  const handleChangeProject = (selected) => {
    setSelectedProjects(selected);
  };



  // Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      fullname: inputs.fullname,
      email: inputs.email,
      mobile: inputs.mobile,
      employeeid: inputs.employeeid,
      role: inputs.role,
      gender: inputs.gender,
      status: inputs.status,
      projects: inputs.projects, // Make sure projects are included in form data
    };
    try {
      const { data } = await axios.put(`/api/auth/edit-employee/${id}`, formData);
      if (data.success) {
        toast.success(data.message);
        navigate('/employee');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating employee");
    }
  };



  const getProjects = async () => {
    try {
      const { data } = await axios.get("/api/project/get-all");
      if (data?.success) {
        setProjectState(data?.project);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect to load project data
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="main-container">
      <div className="d-flex justify-content-between">
        <h2 className="text-success text-start p-2">Edit Employee</h2>
        <a href="/employee" className="p-2">
          <button className="btn btn-primary">
            <IoIosArrowRoundBack /> Back
          </button>
        </a>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label">
                  Employee Id <span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="employeeid"
                  onChange={handleChange}
                  value={inputs.employeeid}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="projects" className="form-label">
                  Projects <span className="text-success"><b>*</b></span>
                </label>

                <Select
                  isMulti={true}
                  name="projects"
                  options={options}
                  value={selectedProjects}
                  onChange={handleChangeProject}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Select Projects"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label">
                  Full Name <span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="fullname"
                  onChange={handleChange}
                  value={inputs.fullname}
                  placeholder="Full Name"
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile <span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="mobile"
                  onChange={handleChange}
                  value={inputs.mobile}
                  placeholder="Mobile"
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={handleChange}
                  value={inputs.email}
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password <span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  onChange={handleChange}
                  name="password"
                  value={inputs.password}
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role <span className="text-success"><b>*</b></span>
                </label>
                <select className="form-select" name="role" value={inputs.role} required onChange={handleChange}>
                  <option value="1">Employee</option>
                  <option value="2">Project Manager</option>
                  <option value="3">SEO Manager</option>
                  <option value="4">Development Manager</option>
                  <option value="5">Admin</option>
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender <span className="text-success"><b>*</b></span>
                </label>
                <select className="form-select" name="gender" onChange={handleChange} value={inputs.gender} required>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status <span className="text-success"><b>*</b></span>
                </label>
                <select className="form-select" name="status" value={inputs.status} onChange={handleChange} required>
                  <option value="1">Active</option>
                  <option value="2">InActive</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
