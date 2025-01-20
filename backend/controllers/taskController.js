const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const taskModel = require('../models/taskModel');
const { generateTokenAndSetCookie, getIdFromToken } = require('../utils/generateToken');

exports.addTask = async(req,res)=>{
    try {
        const {title,startdate,enddate,follower,assignto,projectname} = req.body;
        const createdby = getIdFromToken(req,res);// get logedin user Id

        if(!title || !follower || !assignto || !startdate || !enddate || !projectname){
            return res.status(201).send({
                message:"Please fill all the fields correctly",
                success:false
            })
        }
        const newTask = new taskModel({
            title,
            follower,
            startdate,
            enddate,
            assignto,
            projectname,
            createdby:createdby.userId
        });

        await newTask.save();
        return res.status(200).send({
            message:"Task created successfully",
            success:true,
            taskData:newTask
        })


    } catch (error) {
        return res.status(201).send({
            message: 'Server Error',
            success: false,
            error: error.message || error
        })
    }
}

// function to get data by Id start 
exports.getById = async (req,res) =>{
    try {
        const id = req.params.id;

        if(!id){
            return res.status(201).send({
                message:'No id found',
                success:false
            })
        }

        const taskData = await taskModel.findById(id);

        if(taskData){
            return res.status(200).send({
                message:"Task Data found",
                success:true,
                task:taskData
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


// function to get data by Id start 
exports.getByJoin = async (req,res) =>{
    try {
        const id = req.params.id;

        if(!id){
            return res.status(201).send({
                message:'No id found',
                success:false
            })
        }
        const taskData = await taskModel.findById(id).populate('assignto createdby follower projectname').exec();
    
        if(taskData){
            return res.status(200).send({
                message:"Task Data found",
                success:true,
                task:taskData
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

exports.editTask = async(req, res)=>{
    try {
        const id = req.params.id;

        const  {title,startdate,enddate,follower,assignto,projectname,tag,status,descreption} = req.body;
      
        const taskData = await taskModel.findById(id);
        if(!title || !follower || !assignto || !startdate || !enddate || !projectname){
            return res.status(201).send({
                message:"Edit task data",
                success:false,
                taskData:taskData
            })
        }

        // const createdby = getIdFromToken(req,res);// get logedin user Id

        const newTask = {
            title,
            follower,
            assignto,
            startdate,
            enddate,
            projectname,
            tag,
            status,
            descreption,
            // createdby:createdby.userId
        };

        await taskModel.findByIdAndUpdate(id,newTask);
        const updatedTask = await taskModel.findById(id);

        return res.status(200).send({
            message:"Task updated",
            success:true,
            taskData:updatedTask
        })

    } catch (error) {
        return res.status(201).send({
            message:"Server Error",
            success:false,
            error: error.message || error
        })
    }
}

exports.getAllTasks = async(req, res)=>{
    try {
        const allTasks = await taskModel.find();

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

exports.deleteTask = async(req, res)=>{
    try {
        const id = req.params.id;

        if(!id){
            return res.status(201).send({
                message:"Invalid data Id",
                success:false
            })
        }

        // const task = await taskModel.deleteMany({}); // to delete all
        const task = await taskModel.findByIdAndDelete(id);
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


exports.taskFindDynamicController = async (req, res)=>{
    try {
        const {field} = req.body;

        if(!field){
            return res.status(201).send({
                message: 'field not found',
                success: false
            });
        }
        const task = await taskModel.find({},field)
        return  res.status(200).send({
            message:"Got the data",
            success:true,
            task:task
        })
    } catch (error) {
        return res.status(500).send({
            message: 'Server Error',
            success: false,
            error: error.message || error
        });
    }
}