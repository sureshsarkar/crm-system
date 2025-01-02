import React, { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from 'axios';
import Select from "react-select";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const [employeeState, setEmployeeState] = useState([]);
  const [projectState, setProjectState] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [selectedFollowerEmployee, setSelectedFollowerEmployee] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  
  
  const { id } = useParams();
  const navigate = useNavigate();
  

  const [inputs, setInputs] = useState({
    title: "",
    startdate: "",
    enddate: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: inputs.title,
      startdate: inputs.startdate,
      enddate: inputs.enddate,
      follower: selectedFollowerEmployee.map((s) => s.value),
      assignto: selectedEmployee.map((s) => s.value),
      projects: selectedProjects.map((s) => s.value),
      tag: inputs.tag,
      description: inputs.description,
      status: inputs.status,
    };

    try {
      const { data } = await axios.put(`/api/task/edit-task/${id}`, formData);
      if (data.success) {
        toast.success(data.message);
        navigate('/task');
      }
    } catch (error) {
      toast.error("Failed to update task");
    }
  };
  useEffect(() => {
  const fetchTaskDetails = async () => {
    try {
      const { data } = await axios.put(`/api/task/edit-task/${id}`);
      // console.log(task.title);
      
      if (data.success) {
        const task = data.taskData;
        setInputs({
          title: data.taskData.title,
          startdate: data.taskData.startdate,
          enddate: data.taskData.enddate,
          tag: data.taskData.tag,
          description: data.taskData.description,
          status: data.taskData.status,
        });
        
        setSelectedEmployee(task.assignto.map((e) => ({ value: e._id, label: e.fullname })));
        setSelectedFollowerEmployee(task.follower.map((f) => ({ value: f._id, label: f.fullname })));
        setSelectedProjects(task.projects.map((p) => ({ value: p._id, label: p.projectname })));
      }
    } catch (error) {
      toast.error("Failed to fetch task details");
    }
  };

  fetchTaskDetails();
}, [id]);

  const getEmployee = async () => {
    try {
      const { data } = await axios.get("/api/auth/employee");
      if (data?.success) setEmployeeState(data?.employee);
    } catch (error) {
      console.error(error);
    }
  };

  const getProjects = async () => {
    try {
      const { data } = await axios.get("/api/project/get-all");
      if (data?.success) setProjectState(data?.project);
    } catch (error) {
      console.error(error);
    }
  };

  const options = employeeState.map((e) => ({ value: e._id, label: e.fullname }));
  const projectOptions = projectState.map((p) => ({ value: p._id, label: p.projectname }));



  //useEffect
  useEffect(() => {
    getEmployee();
    getProjects();
  }, []);


  return (
    <div className="main-container">
      <div className="d-flex justify-content-between">
        <h2 className="text-success text-start p-2">Edit Task</h2>
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
                <label className="form-label">Title</label>
                <input type="text" className="form-control" name="title" onChange={handleChange} value={inputs.title} required />
              </div>
            </div>

            {/* Start Date */}
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input type="date" className="form-control" name="startdate" onChange={handleChange} value={inputs.startdate} required />
              </div>
            </div>

            {/* End Date */}
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label">End Date</label>
                <input type="date" className="form-control" name="enddate" onChange={handleChange} value={inputs.enddate} required />
              </div>
            </div>

            {/* Projects */}
            <div className="col-md-6">
              <label className="form-label">Projects</label>
              <Select options={projectOptions} value={selectedProjects} onChange={setSelectedProjects} isMulti />
            </div>

            {/* Assign To */}
            <div className="col-md-6">
              <label className="form-label">Assign To</label>
              <Select options={options} value={selectedEmployee} onChange={setSelectedEmployee} isMulti />
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-3">Update Task</button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
