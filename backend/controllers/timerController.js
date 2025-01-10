const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const timerModel = require('../models/timerModel');

exports.addTimer = async(req,res)=>{
    try {
        const {taskid,assignid} = req.body;

        if(!taskid || !assignid){
            return res.status(201).send({
                message:"Invaild data",
                success:false
            })
        }

       

        const newTimer = new timerModel({
            taskid,
            assignid,
            timer: {
                starttime: new Date(),
                isrunning: true
            }
        });

        await newTimer.save();
        return res.status(200).send({
            message:"Timer started successfully",
            success:true,
            timerdata:newTimer
        })


    } catch (error) {
        return res.status(201).send({
            message: 'Server Error',
            success: false,
            error: error.message || error
        })
    }
}

exports.getById = async (req,res)=>{
    return res.status(201).send({
        message:'No id found',
        success:false
    })
}

// function to get data by Id start 
exports.getByTaskId = async (req,res) =>{
    try {
        const id = req.params.id;

        if(!id){
            return res.status(201).send({
                message:'No id found',
                success:false
            })
        }

        const timerData = await timerModel.find({ taskid: id });

        if(timerData){
            return res.status(200).send({
                message:"Timer Data found",
                success:true,
                timer:timerData
            })
        }

    } catch (error) {
        return res.status(201).send({
            message:'Server Error',
            success:false,
            error:error.message || error
        })
    }
}
// function to get data by Id end

exports.editTimer = async(req, res)=>{
    try {
        const  {timerid,comment,totalduration,starttime} = req.body;
      
        if(!timerid || !comment || !totalduration || !starttime){
            return res.status(201).send({
                message:"Invaild data",
                success:false,
                res:req.body
            })
        }

     
        const newTask = {
            comment,
            timer: {
                starttime: starttime,
                stoptime: new Date(),
                isrunning: false,
                totalduration:totalduration
            }
        };

        await timerModel.findByIdAndUpdate(timerid,newTask);

        return res.status(200).send({
            message:"Timer stoped",
            success:true
        })

    } catch (error) {
        return res.status(201).send({
            message:"Server Error",
            success:false,
            error: error.message || error
        })
    }
}

exports.getAllTimers = async(req, res)=>{
    try {
        const allTasks = await timerModel.find();

        if(!allTasks){
            return res.status(201).send({
                message:"No Task found",
                success:false
            })
        }

        return res.status(200).send({
            message:"Task got",
            tasks:allTasks,
            success:true
        })


    } catch (error) {
        return res.status(201).send({
            message:"Server Error",
            success:false,
            error: error.message || error
        })
    }
}

exports.deleteTimer = async(req, res)=>{
    try {
        const id = req.params.id;

        if(!id){
            return res.status(201).send({
                message:"Invalid data Id",
                success:false
            })
        }

        // const task = await timerModel.deleteMany({}); // to delete all
        const task = await timerModel.findByIdAndDelete(id);
        return res.status(200).send({
            message: "Task deleted",
            success: true
        })

    } catch (error) {
        return res.status(201).send({
            message:"Server error",
            success:false,
            error: error.message || error
        })
    }
}