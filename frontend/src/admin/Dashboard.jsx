import React,{useEffect,useState} from 'react'
import axios from 'axios';
import toast from "react-hot-toast";
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}from 'react-icons/bs'
 import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

function Dashboard({getRole,roleAuth}) {

  const [countData, setCountData] = useState({
    employeeCount :0,
    projectCount :0,
    taskCount :0,
  })
     useEffect(  () =>{
          getRole();
      },[roleAuth])
      
    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
     
      const getData = async ()=>{
        try {
          const whereField = {
            "field":"_id,email"
          };
          const { data } = await axios.post(`/api/auth/employee-finddynamic`,whereField);
          const task = await axios.post(`/api/task/task-finddynamic`,whereField);
          const project = await axios.post(`/api/project/project-finddynamic`,whereField);
          if(data?.employee?.length>0){
            setCountData((prev)=>({
              ...prev,
              employeeCount:data.employee.length,
            }))
          }

          if(task?.data?.task?.length>0){
            setCountData((prev)=>({
              ...prev,
              taskCount:task?.data.task.length,
            }))
          }

          if(project?.data?.project?.length>0){
            setCountData((prev)=>({
              ...prev,
              projectCount:project?.data.project.length,
            }))
          }
          // console.log(data.employee);
          
        } catch (error) {
          toast.error(error)
        }
      }

      useEffect(()=>{
        getData();
      },[])

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3 className='text-dark'>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
          {roleAuth === 5 ?(
            <div className='card'>
              <a href="/employee">
                <div className='card-inner'>
                    <h3>Employees</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>{countData.employeeCount}</h1>
                </a>
            </div>
          ):null
          }
            <div className='card'>
            <a href="/task">
                <div className='card-inner'>
                    <h3>Tasks</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>{countData.taskCount}</h1>
                </a>
            </div>
            <div className='card'>
            <a href="">
                <div className='card-inner'>
                    <h3>PROJECT</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>{countData.projectCount}</h1>
                </a>
            </div>
            <div className='card'>
            <a href="">
                <div className='card-inner'>
                    <h3>ALERTS</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>42</h1>
                </a>
            </div>
        </div>

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default Dashboard