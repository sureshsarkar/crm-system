import React, { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from 'axios';
import dayjs from 'dayjs';
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast'; // Importing toast for error handling

const ViewTask = () => {
  const { id } = useParams();
  const [timerRecord, setTimerData] = useState([]);
  const [inputs, setInputs] = useState({
    title: "",
    createdat: "",
    updatedat: "",
    taskstartdate: "",
    taskenddate: "",
    follower: "",
    assignto: "",
    projectname: "",
    createdby: "",
    tag: "",
    description: "",
    status: "",
  });

  // Fetch Task Details
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const { data } = await axios.get(`/api/task/get-by-join/${id}`);
        if (data.task) {
          setInputs({
            title: data.task.title,
            assignto: data.task.assignto.fullname,
            follower: data.task.follower.fullname,
            projectname: data.task.projectname.projectname,
            createdby: data.task.createdby.fullname,
            taskstartdate: dayjs(data.task.startdate).format('YYYY-MM-DD'),
            taskenddate: dayjs(data.task.enddate).format('YYYY-MM-DD'),
            createdat: dayjs(data.task.createdAt).format('YYYY-MM-DD'),
            updatedat: dayjs(data.task.updatedAt).format('YYYY-MM-DD'),
            tag: data.task.tag,
            description: data.task.description,
            status: data.task.status,
          });
        }
      } catch (error) {
        toast.error("Failed to fetch task details");
      }
    };
    fetchTaskDetails();
  }, [id]); // Dependency on id to fetch data whenever the id changes

  // Fetch Timer Details (if needed)
  useEffect(() => {
    const fetchTimerDetails = async () => {
      try {
        const { data } = await axios.get(`/api/timer/get-by-taskid/${id}`);
        //console.log(data); // You can handle the timer data here
        if (data.success) {
          setTimerData(data.timer);
          console.log(data.timer);
          
        }
      } catch (error) {
        // You can add toast or console logs if needed
        console.log("Failed to fetch timer details", error);
      }
    };
    fetchTimerDetails();

  }, [id]); // Adding id as dependency to make sure timer details are fetched for the correct task

  return (
    <div className="main-container">
      <div className="d-flex justify-content-between">
        <h2 className="text-success text-start p-2">View Task</h2>
        <a href="/task" className="p-2">
          <button className="btn btn-primary">
            <IoIosArrowRoundBack /> Back
          </button>
        </a>
      </div>

      <div className="row">
        {/* Task Information */}
        <div className="col-md-6">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <tbody>
                <tr>
                  <th><i className="bi bi-person-check-fill text-info"></i> Title</th>
                  <td>{inputs.title}</td>
                </tr>
                <tr>
                  <th><i className="bi bi-router text-info"></i> Task Start</th>
                  <td>{inputs.taskstartdate}</td>
                </tr>
                <tr>
                  <th><i className="bi bi-usb-symbol text-info"></i> Task End</th>
                  <td>{inputs.taskenddate}</td>
                </tr>
                <tr>
                  <th><i className="bi bi-envelope-open text-info"></i> Assgn To</th>
                  <td>{inputs.assignto}</td>
                </tr>
                <tr>
                  <th><i className="bi bi-chat-dots text-info"></i> Project Name</th>
                  <td>{inputs.projectname}</td>
                </tr>
                <tr>
                  <th><i className="bi bi-chat-dots text-info"></i> Status</th>
                  <td>{inputs.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Task Information */}
        <div className="col-md-6">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <tbody>
                <tr>
                  <th><i className="bi bi-chat-dots text-info"></i> Task Created By</th>
                  <td>{inputs.createdby}</td>
                </tr>
                <tr>
                  <th><i className="bi bi-pin-map-fill text-info"></i> Tag</th>
                  <td>{inputs.tag}</td>
                </tr>
                <tr>
                  <th><i className="bi bi-telephone text-info"></i> Follower</th>
                  <td>{inputs.follower}</td>
                </tr>
                <tr>
                  <th><i className="bi bi-calendar-check text-info"></i>Task Created</th>
                  <td>{inputs.createdat}</td>
                </tr>
                <tr>
                  <th><i className="bi bi-globe-central-south-asia text-info"></i> Task Updated</th>
                  <td>{inputs.updatedat}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Show Task Records (Follow-up Notes) */}
      <div className="card-body" style={{ paddingTop: '14px' }}>
        <div className="row bg-light">
          <div className="col-md-4">
            <label htmlFor="exampleInputFile"> <b>Comment</b> </label>
          </div>
          <div className="col-md-3">
            <label htmlFor="exampleInputFile"> <b>Started</b> </label>
          </div>
          <div className="col-md-2">
            <label htmlFor="exampleInputFile"> <b>Ended</b> </label>
          </div>
          <div className="col-md-3">
            <label htmlFor="exampleInputFile"> <b>Total Duration</b> </label>
          </div>
        </div>
        <div className="row">
  {/* Follow-up Notes - Placeholder */}
  {timerRecord.map((timerD, index) => {
    // Calculate total duration
    const totalDuration = timerD.timer.totalduration;
    const hours = Math.floor(totalDuration / 3600);
    const minutes = Math.floor((totalDuration % 3600) / 60);
    const seconds = totalDuration % 60;
// console.log(totalDuration);

    return (
      <div className="col-md-12 py-2 my-1" style={{ background: '#98e3692e', borderRadius: '10px' }} key={index}>
        <div className="row">
          <div className="col-md-4 pt-2">
            <p className="ml-3 comenttextstyle">
              {timerD.comment}
            </p>
          </div>
          <div className="col-md-3 pt-2">
            <span className="badge bg-inverse-warning p-2">{dayjs(timerD.timer.starttime).format('DD MMMM YYYY hh:mm A')}</span>
          </div>
          <div className="col-md-2 pt-2">
            <span className="badge bg-inverse-success p-2">{dayjs(timerD.timer.endtime).format('DD MMMM YYYY hh:mm A')}</span>
          </div>
          <div className="col-md-3 pt-2">
            <span className="badge bg-inverse-success p-2">
              {`${hours} hours, ${minutes} minutes, ${seconds} seconds`}
            </span>
          </div>
        </div>
      </div>
    );
  })}
</div>

      </div>
    </div>
  );
};

export default ViewTask;
