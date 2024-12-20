const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//const JWT_SECRET = "LearnWithS2"; // Or use process.env.JWT_SECRET for environment-based config

// Middleware to check if the user is authenticated
exports.adminAuthMiddleware = (req, res, next) => {
    // Get the token from the cookies
    const token = req.cookies.jwt;

    // If there is no token, return an error
    if (!token) {
        return res.status(401).send({
            message: 'No token provided. Please log in.',
            success: false
        });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({
                message: 'Invalid or expired token.',
                success: false
            });
        }

        
        // Attach the decoded user information to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    });
};
