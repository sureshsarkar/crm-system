import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { TiArchive } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import toast  from 'react-hot-toast';
import { format } from 'date-fns';

const ManageProject = ({getRole,roleAuth}) => {

  useEffect(  () =>{
    getRole();
},[roleAuth])


  const [projectData, setProjectData] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch employee
  const getProject = async () => {
    try {
      const { data } = await axios.get("/api/project/get-all");
      console.log(data);
      if (data?.success) {
        const formattedData = data.project.map((project) => ({
          id: project._id,
          projectname: project.projectname,
          status: project.status,
          createdAt:format(new Date(project.createdAt), 'dd/MM/yyyy hh:mm a'),
        }));
        setProjectData(formattedData);
        setRecords(formattedData);  // Initialize records with fetched data
      }else{
        toast.error(data.message);
      }

      
    } catch (error) {
      toast.error(error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getProject();
  }, []);

  // Filter employee function
  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredData = projectData.filter((row) =>
      row.name.toLowerCase().includes(value)
    );
    setRecords(filteredData);
  };

  // Delete employee function

const handleDeleteProject = async (id) => {
  if (!window.confirm("Are you sure you want to delete this project?")) return;
  
  setLoading(true);
  try {
    const { data } = await axios.delete(`/api/project/delete/${id}`);
   
    console.log(data);
    
    if (data.success) {
      toast.success(data.message);
      const updatedProject = projectData.filter(emp => emp.id !== id);
      setProjectData(updatedProject);
      setRecords(updatedProject);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Failed to delete project");
  } finally {
    setLoading(false);
  }
};

  // Table columns
  const columns = [
    // { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.projectname, sortable: true },
    { name: "Status", selector: (row) => (row.status==1 ? "Active" : "Inactive"), sortable: true },
    { name: "Created", selector: (row) => row.createdAt, sortable: true },
  ];


   // Conditionally add the "Action" column if roleAuth is 5
    if (roleAuth === 5) {
      columns.push({
        name: "Action",
        cell: (row) => (
          <div className="d-flex">
          <a href={`/project/edit/${row.id}`}>
            <button className="btn btn-primary m-1" title="Edit">
              <FaEdit />
            </button>
          </a>
          <button
            onClick={() => handleDeleteProject(row.id)}
            className="btn btn-danger m-1"
            title="Delete"
            disabled={loading}
          >
           {loading ? "..." : <TiArchive />}
          </button>
        </div>
        ),
      });
    }
  


  return (
    <div className="main-container">
      <div className="d-flex justify-content-between">
        <h2 className="text-success text-start p-2">Project Data Table</h2>
        { roleAuth===5 ? (
        <a href="/project/add" className="p-2">
          <button className="btn btn-primary">
            <IoIosPersonAdd /> Add
          </button>
        </a>
        ):null}
      </div>

      <div>
        <div className="text-end">
          <input
            type="text"
            placeholder="Filter data"
            onChange={handleFilter}
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

export default ManageProject;
