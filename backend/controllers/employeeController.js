
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const employeeModel = require('../models/EmployeeModel');
const { generateTokenAndSetCookie, getIdFromToken } = require('../utils/generateToken');
// get all employee
exports.getAllEmployee = async (req, res) => {

    try {

        const employee = await employeeModel.find().select('-password');

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

// create employee registration  dsfsdifdsfsdf

// employee registration
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
                message: 'Employee with this email already exists',
                success: false
            });
        }

        const existingMobile = await employeeModel.findOne({ mobile });
        if (existingMobile) {
            return res.status(400).send({
                message: 'Employee with this mobile number already exists',
                success: false
            });
        }

        const existingEmployeeId = await employeeModel.findOne({ employeeid });
        if (existingEmployeeId) {
            return res.status(400).send({
                message: 'Employee with this employee ID already exists',
                success: false
            });
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new employee data
        const newEmployee = new employeeModel({
            employeeid,
            fullname,
            mobile,
            email,
            password: hashedPassword,
            gender,
            role,
            status
        });

        await newEmployee.save();
      
        // Generate token and set cookie
       const token =  generateTokenAndSetCookie(newEmployee._id,newEmployee.role, res);

       // Send response with user data
       return res.status(201).send({
           message: "User created successfully",
           success: true,
           token: token,
           role:user.role
       });

    } catch (error) {
        return res.status(400).send({
            message: 'Error in registration callback',
            success: false,
            error: error
        });
    }
};

// user login
exports.loginController = async (req, res) => {
    try {
        let { email, password } = req.body;

        // validation 
        if (!email || !password) {
            return res.status(400).send({
                message: 'Please fill all fields',
                success: false
            });
        }

        // get user
        const user = await employeeModel.findOne({ email });

        if (!user) {
            return res.status(400).send({
                message: 'Email does not exist',
                success: false
            });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({
                message: 'Email or password is incorrect',
                success: false
            });
        }

        // Generate token and set cookie
       const token =  generateTokenAndSetCookie(user._id,user.role, res);

        // Send response with user data
        return res.status(200).send({
            message: 'User found and logged in successfully',
            success: true,
            token: token,
            role:user.role
        });

    } catch (error) {
        return res.status(500).send({
            message: 'Server Error',
            success: false,
            error: error.message || error
        });
    }
}

// user logout
exports.logoutController = (req, res) => {
    // Clear the 'jwt' cookie
    res.clearCookie('jwt', {
        httpOnly: true,  // Prevents JavaScript from accessing the cookie (helps mitigate XSS)
        sameSite: 'Strict',  // Protects against CSRF attacks
    });

    // Send response to the client indicating successful logout
    return res.status(200).send({
        message: 'Logged out successfully.',
        success: true,
    });
};


exports.myProfile = async(req,res)=>{
    try {

        const getId = getIdFromToken(req, res);

     // Optionally, fetch user profile from DB using userId (if needed)
        const employee = await employeeModel.findById(getId.userId).select('-password'); 
        return res.status(201).send({
            message:"Employee got",
            success:true,
            employee: employee
        })
    } catch (error) {
        return res.status(500).send({
            message: 'Server Error',
            success: false,
            error: error.message || error
        });
    }
}

// delete employee 
exports.deleteEmployee = async(req,res)=>{
    try {

        const id = req.params.id;
        const employee = await employeeModel.findByIdAndDelete(id);
        return res.status(200).send({
            message: "Employee deleted",
            success: true
        })

    } catch (error) {
        return res.status(500).send({
            message: 'Server Error',
            success: false,
            error: error.message || error
        });
    }
}
