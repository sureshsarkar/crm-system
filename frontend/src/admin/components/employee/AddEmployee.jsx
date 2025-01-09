import React, { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "axios";
import Select from "react-select";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [projectState, setProjectState] = useState([]);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    password: "",
    mobile: "",
    employeeid: "",
    role: "",
    gender: "",
    status: "",
    projects: "",
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      fullname: inputs.fullname,
      email: inputs.email,
      password: inputs.password,
      mobile: inputs.mobile,
      employeeid: inputs.employeeid,
      role: inputs.role,
      gender: inputs.gender,
      status: inputs.status,
      projects: selectedProjects.map((selectedVal) => selectedVal.value),
    };

    // console.log(formData);
    // return false;

    try {
      const { data } = await axios.post("/api/auth/register", formData);

      // console.log(data);
      // return false
      if (data.success) {
        // alert(data.message);
        toast.success(data.message);
        navigate("/employee");
      }

      if (!data.success) {
        // alert(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function to get projects

  const getProjects = async (e) => {
    try {
      const { data } = await axios.get("/api/project/get-all");
      if (data?.success) {
        setProjectState(data?.project);
      }
    } catch (error) {
      console.log(error);
    }
  };


  // useEffect
  useEffect(() => {
    getProjects();
  }, []);


  const options = projectState.map((project) => ({
    value: project._id,
    label: project.projectname,
  }));

  
  const [selectedProjects, setSelectedProjects] = useState(null);

  // Handle change event for the select element
  const handleChangeProject = (selected) => {
    setSelectedProjects(selected);
  };



  return (
    <div className="main-container">
      <div className="d-flex justify-content-between">
        <h2 className="text-success text-start p-2">Add Employee</h2>
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
                  Employee Id{" "}
                  <span className="text-success">
                    <b>*</b>
                  </span>
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
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Projects{" "}
                  <span className="text-success">
                    <b>*</b>
                  </span>
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
                  Full Name{" "}
                  <span className="text-success">
                    <b>*</b>
                  </span>
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
                  Mobile{" "}
                  <span className="text-success">
                    <b>*</b>
                  </span>
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
                  Email{" "}
                  <span className="text-success">
                    <b>*</b>
                  </span>
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
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password{" "}
                  <span className="text-success">
                    <b>*</b>
                  </span>
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
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Role{" "}
                  <span className="text-success">
                    <b>*</b>
                  </span>
                </label>
                <select
                  className="form-select"
                  name="role"
                  required
                  onChange={handleChange}
                >
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
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Gender{" "}
                  <span className="text-success">
                    <b>*</b>
                  </span>
                </label>
                <select
                  className="form-select form-controle"
                  name="gender"
                  onChange={handleChange}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Status{" "}
                  <span className="text-success">
                    <b>*</b>
                  </span>
                </label>
                <select
                  className="form-select form-controle"
                  name="status"
                  onChange={handleChange}
                  required
                >
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

export default AddEmployee;
