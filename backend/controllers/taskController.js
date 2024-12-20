const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const taskModel = require('../models/taskModel');
const { generateTokenAndSetCookie, getIdFromToken } = require('../utils/generateToken');

exports.addTask = async(req,res)=>{
    try {
        
        const taskData = req.body;

        return res.status(201).send({
            taskData:taskData
        })


    } catch (error) {
        return res.status(400).send({
            message: 'Server Error',
            success: false,
            error: error.message || error
        })
    }
}