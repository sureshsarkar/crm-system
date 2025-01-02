import React, { useState,useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { TiArchive } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import toast  from 'react-hot-toast';
import { format } from 'date-fns';


const ManageTask = () => {

  const [records, setRecords] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

   // Fetch Projects
   const getProjects = async () => {
    try {
      const { data } = await axios.get("/api/project/get-all");
      if (data.success) {
        // console.log(data);
        
        setProjects(data.project);  // Store projects in state
      }
    } catch (error) {
      toast.error(error);
    }
  };

   // Fetch Projects
   const getEmployees = async () => {
    try {
      const { data } = await axios.get("/api/auth/employee");
      if (data.success) {
        setEmployees(data.employee);  // Store projects in state
      }
    } catch (error) {
      toast.error(error);
    }
  };


  // Fetch Task
  const getTasks = async () => {
    try {
      const { data } = await axios.get("/api/task/get-all");
      
      if (data.success) {
        const formattedData = data.tasks.map((task, i) => {
          const projectName =  projects.find(p => p._id === task.projectname)?.projectname || "Unknown";
          const assigntoName =  employees.find(p => p._id === task.assignto)?.fullname || "Unknown";
          return {
            id:task._id,
            sn: i + 1,
            title: task.title,
            projectname: projectName,
            assignto: assigntoName,
            status: task.status,
            createdAt: format(new Date(task.createdAt), 'dd/MM/yyyy hh:mm a'),
          };
        });
        setTaskData(formattedData);
        setRecords(formattedData);
      }
    } catch (error) {
      toast.error("Failed to fetch tasks");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      await getProjects();
      await getEmployees();
      await getTasks();
    };
    fetchData();
  }, [projects]);




  // const data = [
  //   { id: 1, name: "John Doe", age: 28 },
  //   { id: 2, name: "Jane Smith", age: 34 },
  //   { id: 3, name: "Sam Wilson", age: 23 }
  // ];

  const columns = [
    { name: "S.N.", selector: (row) => row.sn, sortable: true },
    { name: "Title", selector: (row) => row.title, sortable: true },
    { name: "Project Name", selector: (row) => row.projectname, sortable: true },
    { name: "Assign", selector: (row) => row.assignto, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    { name: "Created", selector: (row) => row.createdAt, sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex">
          <a href={`/task/edit/${row.id}`}>
            <button className="btn btn-primary m-1" title="Edit">
              <FaEdit />
            </button>
          </a>
          <button
            onClick={() => handleDeleteEmployee(row.id)}
            className="btn btn-danger m-1"
            title="Delete"
          >
            <TiArchive />
          </button>
        </div>
      ),
    },
  ];




   // Filter task function
   const handelFilter = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredData = taskData.filter((row) =>
      (String(row.title).toLowerCase().includes(value) || 
       String(row.projectname).toLowerCase().includes(value) ||
       String(row.status).toLowerCase().includes(value) ||
       String(row.createdAt).toLowerCase().includes(value)
      )
    );
    setRecords(filteredData);
  };



   // Delete task function

const handleDeleteEmployee = async (id) => {
  if (!window.confirm("Are you sure you want to delete this task?")) return;
  
  setLoading(true);
  try {
    const { data } = await axios.delete(`/api/task/delete/${id}`);
    if (data.success) {
      toast.success(data.message);
      const updatedTask = taskData.filter(emp => emp.id !== id);
      setTaskData(updatedTask);
      setRecords(updatedTask);
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    toast.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="main-container">
      <div className="d-flex justify-content-between">
        <h2 className="text-success text-start p-2">Task Data Table</h2>
        <a href="/task/add" className="p-2">
          <button className="btn btn-primary">
            <IoIosPersonAdd /> Add
          </button>
        </a>
      </div>
      <div>
        <div className="text-end">
          <input
            type="text"
            placeholder="Filter data"
            onChange={handelFilter}
          />
        </div>
        <DataTable
          columns={columns}
          data={records}
          selectableRows
          fixedHeader
          pagination
        />
      </div>
    </div>
  );
};

export default ManageTask;
