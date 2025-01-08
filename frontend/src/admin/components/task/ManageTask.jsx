import React, { useState,useEffect,useRef } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { TiArchive } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import { MdOutlineWatchLater,MdWatchLater } from "react-icons/md";
import toast  from 'react-hot-toast';
import { format } from 'date-fns';



const ManageTask = () => {

  const [records, setRecords] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [taskId, setTastId] = useState(null);
  const closeButtonRef = useRef(null);

    const [inputs, setInputs] = useState({
      starttime: "",
      timerid: "",
      comment: "",
      totalduration: ""
    });

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

  // get task timer status start 
  const getTimerStatus =  ()=>{
    const timerStatus  = JSON.parse(localStorage.getItem('timer'));

    if(timerStatus?.starttimer){
      setTimerRunning(true)
      setTastId(timerStatus.taskid)
    }
    // console.log(timerRunning);
  }
  // get task timer status end


  useEffect(() => {
     getTimerStatus();
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      await getProjects();
      await getEmployees();
      await getTasks();
    };
    fetchData();

  }, [projects]);


  const columns = [
    { name: "S.N.", selector: (row) => row.sn, sortable: true },
    {
      name: "Timer",
      cell: (row) => (
        <div className="timerButton" data-id={row.id}>
          {timerRunning  && row.id==taskId? 
          <button className="btn stoptimerCLS" data-bs-toggle="modal" data-bs-target="#staticBackdrop" title="Stop Timer">
            <img src="./icon-clock.gif" alt="" />
          </button>
           :
           <button className="btn" title="Start Timer" onClick={handelStartTimer}>
             <MdOutlineWatchLater />
          </button>
           }
          </div>
      ),
    },
    { name: "Status", 
      cell:(row)=>(
        <select className="form-select form-controle" name="status" onChange={handleChange}  value={row.status} required>
          <option value="In Process">In Process</option>
          <option value="Not Started">Not Started</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>
      )
    },
    { 
      name: "Title", 
      selector: (row) => row.title, 
      sortable: true,
      cell: (row) => (
        <div title={row.title} className="titleCell">
          {row.title}
        </div>
      ),
    },
    { name: "Project Name", selector: (row) => row.projectname, sortable: true },
    { name: "Assign", selector: (row) => row.assignto, sortable: true },
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


const handelStartTimer = async (event)=>{
  const parentDiv = event.target.closest('.timerButton');
  const taskId = parentDiv ? parentDiv.getAttribute('data-id') : null;
  // const assignerId = parentDiv ? parentDiv.getAttribute('data-assignto') : null;

  if(timerRunning){
    toast.error("First of all stop other task");
    return false
  }

  try {
    const {data} = await axios.get(`/api/task/get-by-id/${taskId}`);

    if(data?.task){
      const taskRef = data?.task;
    await startTimer(taskRef);
          getTimerStatus();

    }
    
  } catch (error) {
    console.log(error);
    
  }
}

const startTimer = async (taskRef)=>{
    const taskdataSchema = {
      taskid:taskRef._id,
      assignid:taskRef.assignto,
    }
    const {data} = await axios.post("/api/timer/add",taskdataSchema);
    if(data?.success){
        const starttimer = data?.timerdata.timer.isrunning;
        const taskid = data?.timerdata.taskid;
        const timerid = data?.timerdata._id;
        toast.success("Timer Started!");
        const now = new Date();
        const item = {
          starttimer: starttimer,
          taskid:taskid,
          timerid:timerid,
          started:now.getTime(),
          timerexpiry: now.getTime() + 15 * 24 * 60 * 60 * 1000,  // Expiry time in milliseconds
        };
        localStorage.setItem("timer", JSON.stringify(item));
        // navigate("/dashboard");
    } else {
      toast.error(data.message || "Invalid credentials");
    }
}

const handelStopTimer = async()=>{
  try {
    const now = new Date();
    const timerStatus  = JSON.parse(localStorage.getItem('timer'));
      if(timerStatus.starttimer){
        inputs.starttime = new Date(timerStatus.started).toISOString();
        inputs.timerid = timerStatus.timerid;
        inputs.totalduration =now.getTime() - timerStatus.started;
        const {data} = await axios.post("/api/timer/edit",inputs);

        if(data.success){
          setTimerRunning(false)
           // Auto click the close button
          if (closeButtonRef.current) {
            closeButtonRef.current.click();
          }
          toast.success(data.message);
        }
      }
  } catch (error) {
    console.log(error);
  }
}

const closeModel = (e)=>{
  const modal = bootstrap.Modal.getInstance(e.target.closest('.modal'));
  modal.hide();
}
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
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

          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5 text-dark" id="staticBackdropLabel">Add a comment</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <textarea name="comment" value={inputs.comment} onChange={handleChange} placeholder="Add a comment"/>

                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeButtonRef}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handelStopTimer}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        {/* model end  */}
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
