
const bcrypt = require('bcrypt');
const employeeModel = require('../models/EmployeeModel');
// get all user
exports.getAllEmployee = async (req, res) => {

    try {

        const employee = await employeeModel.find();

        res.status(201).send({
            message: "Fetch all employee",
            success: true,
            employee: employee
        })
    } catch (error) {

        return res.status(400).send({
            message: 'Failed to get employee',
            success: 'false',
            error: error
        })
    }
}

// create user registration 
exports.registrationController = async (req, res) => {

    try {
        const { username, email, password } = req.body
        // validation 

        if (!username || !email || !password) {
            return res.status(400).send({
                message: 'Please fill all fields',
                success: 'false'
            })
        }

        // existing user
        const existinguser = await employeeModel.findOne({ email })
        if (existinguser) {
            return res.status(400).send({
                message: 'User already exists',
                success: 'false'
            })
        }
        // encrypt password
        const hashPassword = await bcrypt.hash(password, 10)

        // save data
        const user = new employeeModel({ username, email, password: hashPassword })
        await user.save();
        return res.status(201).send({
            message: "User created successfully",
            success: true,
            user: user
        })
    } catch (error) {

        return res.status(400).send({
            message: 'Error in register callback',
            success: 'false',
            error: error
        })
    }
}

//user login
exports.loginController = async (req, res) => {

    try {
        let { email, password } = req.body
        // validation 
        if (!email || !password) {
            return res.status(400).send({
                message: 'Please fill all fields',
                success: 'false'
            })
        }

        // get user
        const user = await employeeModel.findOne({ email })

        if (!user) {
            return res.status(400).send({
                message: 'Email is not Exist',
                success: 'false'
            })
        }

        // password 
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).send({
                message: 'Email Or password',
                success: 'false'
            })
        }

        if (user) {
            return res.status(200).send({
                message: 'User found',
                success: true,
                user
            })
        } else {
            return res.status(400).send({
                message: 'User not exist',
                success: 'false'
            })
        }

    } catch (error) {
        return res.status(400).send({
            message: 'Server Error',
            success: 'false',
            error: error
        })
    }
}