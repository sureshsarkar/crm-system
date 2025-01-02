import React, { useState,useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from 'axios'
import toast  from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
  const navigate = useNavigate();
  
  const [inputs, setInputs] = useState({
    projectname: "",
    projectdescreption: "",
    status: "",
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
      const formData =  {
        projectname: inputs.projectname,
        projectdescreption: inputs.projectdescreption,
        status: inputs.status,
      }

    try {
      const {data} = await axios.post("/api/project/add", formData);

      if (!data.success) {
        toast.error(data.message);
      }
     
      if (data.success) {
        toast.success(data.message);
        navigate('/project')
      }

    } catch (error) {
      toast.error(error);

    }
  }


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
                  Project Name<span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="projectname"
                  onChange={handleChange}
                  value={inputs.projectname}
                  placeholder="Enter project name"
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Status <span className="text-success"><b>*</b></span>
                </label>
                <select className="form-select form-controle" name="status" value={inputs.status} onChange={handleChange} required>
                  <option value="1">Active</option>
                  <option value="2">InActive</option>
                </select>
              </div>
            </div>

            <div className="col-md-12">
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label">
                  Project Descreption <span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="projectdescreption"
                  onChange={handleChange}
                  value={inputs.projectdescreption}
                  placeholder="Enter project descreption"
                  required
                />
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

export default AddProject;
