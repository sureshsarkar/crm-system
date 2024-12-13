
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

// create user registration  dsfsdifdsfsdf

// User registration
exports.registrationController = async (req, res) => {
    try {
        const { employeeid, fullname, mobile, email, password, gender, role, status } = req.body;

        // Validation
        if (!employeeid || !fullname || !mobile || !email || !password || !gender || !role || !status) {
            return res.status(400).send({
                message: 'Please fill all fields',
                success: false
            });
        }

        // Check if the email, mobile, or employeeid already exists
        const existingEmail = await employeeModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).send({
                message: 'User with this email already exists',
                success: false
            });
        }

        const existingMobile = await employeeModel.findOne({ mobile });
        if (existingMobile) {
            return res.status(400).send({
                message: 'User with this mobile number already exists',
                success: false
            });
        }

        const existingEmployeeId = await employeeModel.findOne({ employeeid });
        if (existingEmployeeId) {
            return res.status(400).send({
                message: 'User with this employee ID already exists',
                success: false
            });
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new employee data
        const newUser = new employeeModel({
            employeeid,
            fullname,
            mobile,
            email,
            password: hashedPassword,
            gender,
            role,
            status
        });

        await newUser.save();
        return res.status(201).send({
            message: "User created successfully",
            success: true,
            user: newUser
        });

    } catch (error) {
        return res.status(400).send({
            message: 'Error in registration callback',
            success: false,
            error: error
        });
    }
};

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