import React, { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from 'axios';
import Select from "react-select";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [employeeState, setEmployeeState] = useState([]);
  const [projectState, setProjectState] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [selectedFollowerEmployee, setSelectedFollowerEmployee] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    startdate: "",
    enddate: "",
    follower: "",
    assignto: "",
    projectname: "",
    tag: "",
    description: "",
    status: "",
  });


  
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // Submit function 
  const handleSubmit = async (e) => {
    e.preventDefault();
 

    const formData = {
      title: inputs.title,
      startdate: inputs.startdate,
      enddate: inputs.enddate,
      follower: selectedFollowerEmployee.value,
      assignto: selectedEmployee.value,
      projectname: selectedProjects.value,
      tag: inputs.tag,
      description: inputs.description,
      status: inputs.status,
    };


  

    try {
      const { data } = await axios.post("/api/task/add", formData);
     
      if (data.success) {
        toast.success(data.message);
        navigate('/task');
      }
    } catch (error) {
      toast.error("Failed to add task");
    }
  };

  // Fetch employees
  const getEmployee = async () => {
    try {
      const { data } = await axios.get("/api/auth/employee");
      if (data?.success) {
        setEmployeeState(data?.employee);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch projects
  const getProjects = async () => {
    try {
      const { data } = await axios.get("/api/project/get-all");
      if (data?.success) {
        setProjectState(data?.project);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEmployee();
    getProjects();
  }, []);

  // Employee options for select
  const options = employeeState.map((employee) => ({
    value: employee._id,
    label: employee.fullname,
  }));

  // Project options for select
  const projectOptions = projectState.map((project) => ({
    value: project._id,
    label: project.projectname,
  }));

  // Handle select changes
  const handleChangeAssign = async (selected) => {
    console.log(selected.value);
const id = selected.value;
    const {data} = await axios.get(`api/auth/edit-emopoyee/${id}`)
    console.log(data);
    
    setSelectedEmployee(selected);

  };

  const handleChangeFollower = (selected) => {
    setSelectedFollowerEmployee(selected);
  };

  const handleChangeProject = (selected) => {
    setSelectedProjects(selected);
  };

  return (
    <div className="main-container">
      <div className="d-flex justify-content-between">
        <h2 className="text-success text-start p-2">Add Task</h2>
        <a href="/task" className="p-2">
          <button className="btn btn-primary">
            <IoIosArrowRoundBack /> Back
          </button>
        </a>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Title */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">
                  Title<span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  onChange={handleChange}
                  value={inputs.title}
                  placeholder="Enter project title"
                  required
                />
              </div>
            </div>

            {/* Start Date */}
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label">
                  Start Date<span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="startdate"
                  onChange={handleChange}
                  value={inputs.startdate}
                  required
                />
              </div>
            </div>

            {/* End Date */}
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label">
                  End Date<span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="enddate"
                  onChange={handleChange}
                  value={inputs.enddate}
                  required
                />
              </div>
            </div>

            {/* Assign To */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">
                  Assign To<span className="text-success"><b>*</b></span>
                </label>
                <Select
                  // isMulti
                  options={options}
                  value={selectedEmployee}
                  onChange={handleChangeAssign}
                  placeholder="Select employee"
                />
              </div>
            </div>


            {/* Projects */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">
                  Projects<span className="text-success"><b>*</b></span>
                </label>
                <Select
                  // isMulti
                  options={projectOptions}
                  value={selectedProjects}
                  onChange={handleChangeProject}
                  placeholder="Select Projects"
                />
              </div>
            </div>
            
            {/* Follower */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">
                  Follower<span className="text-success"><b>*</b></span>
                </label>
                <Select
                  // isMulti
                  options={options}
                  value={selectedFollowerEmployee}
                  onChange={handleChangeFollower}
                  placeholder="Select follower"
                />
              </div>
            </div>

            {/* Description */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  onChange={handleChange}
                  value={inputs.description}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                Tag <span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  name="tag"
                  value={inputs.tag}
                  placeholder="Enter tag"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Status <span className="text-success"><b>*</b></span>
                </label>
                <select className="form-select form-controle" name="status" onChange={handleChange} required>
                  <option value="In Process">In Process</option>
                  <option value="Not Started">Not Started</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>

              </div>
            </div>

          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
