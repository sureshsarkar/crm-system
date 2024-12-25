const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const taskModel = require('../models/taskModel');
const { generateTokenAndSetCookie, getIdFromToken } = require('../utils/generateToken');

exports.addTask = async(req,res)=>{
    try {
        const {title,follower,assignto} = req.body;
        const createdby = getIdFromToken(req,res);// get logedin user Id

        if(!title || !follower || !assignto){
            return res.status(400).send({
                message:"Please fill all the fields correctly",
                success:false
            })
        }
        const newTask = new taskModel({
            title,
            follower,
            assignto,
            createdby:createdby.userId
        });

        await newTask.save();
        return res.status(201).send({
            message:"Task created successfully",
            taskData:newTask
        })


    } catch (error) {
        return res.status(400).send({
            message: 'Server Error',
            success: false,
            error: error.message || error
        })
    }
}

exports.editTask = async(req, res)=>{
    try {
        const id = req.params.id;

        const  {title,follower,assignto,projectname,tag,status,descreption} = req.body;

        const taskData = await taskModel.findById(id);
        if(!title || !follower || !assignto){
            return res.status(201).send({
                message:"Edit task data",
                success:false,
                taskData:taskData
            })
        }

        const createdby = getIdFromToken(req,res);// get logedin user Id

        const newTask = {
            title,
            follower,
            assignto,
            projectname,
            tag,
            status,
            descreption,
            createdby:createdby.userId
        };

        await taskModel.findByIdAndUpdate(id,newTask);
        const updatedTask = await taskModel.findById(id);

        return res.status(200).send({
            message:"Task updated",
            success:true,
            taskData:updatedTask
        })

    } catch (error) {
        return res.status(500).send({
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
            tasks:allTasks
        })


    } catch (error) {
        return res.status(500).send({
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
            return res.status(500).send({
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
        return res.status(500).send({
            message:"Server error",
            success:false,
            error: error.message || error
        })
    }
}