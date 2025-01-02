import React, { useState,useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import toast  from 'react-hot-toast';

const EditEmployee = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); 

   // Get employee details when the component is mounted
   useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { data } = await axios.put(`/api/auth/edit-employee/${id}`); // Assuming your backend endpoint is '/api/auth/employee/:id'
        // console.log(data);
        
        if (data.success) {
          setInputs({
            fullname: data.employee.fullname,
            email: data.employee.email,
            // password: "", // Do not pre-fill password for security reasons
            mobile: data.employee.mobile,
            employeeid: data.employee.employeeid,
            role: data.employee.role,
            gender: data.employee.gender,
            status: data.employee.status,
          });
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployee();
  }, [id]); // Run once when the id changes

  
  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    password: "",
    mobile: "",
    employeeid: "",
    role: "",
    gender: "",
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
        fullname: inputs.fullname,
        email: inputs.email,
        mobile: inputs.mobile,
        // password: inputs.password,
        employeeid: inputs.employeeid,
        role: inputs.role,
        gender: inputs.gender,
        status: inputs.status,
      }
// console.log(formData);
// return false;

    try {
      const { data } = await axios.put(`/api/auth/edit-employee/${id}`,formData
       
      )
      if (data.success) {
        toast.success(data.message);
        // alert("User registered Successfully");
        navigate('/employee')
      }
    } catch (error) {
      toast.error(data.message);
      // console.log(error);
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
                  Employee Id <span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="employeeid"
                  onChange={handleChange}
                  value="EMP"
                  required
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
                <label htmlFor="exampleInputPassword1" className="form-label">
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
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Role <span className="text-success"><b>*</b></span>
                </label>
                <select className="form-select" name="role" value={inputs.role} required onChange={handleChange}>
                  <option value="1">Employee</option>
                  <option value="2">Project Manager</option>
                  <option value="3">SEO Manager</option>
                  <option value="4">Development Manager</option>
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Gender <span className="text-success"><b>*</b></span>
                </label>
                <select className="form-select form-controle" name="gender" onChange={handleChange} value={inputs.gender} required>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
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
