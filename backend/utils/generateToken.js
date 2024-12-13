const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

    exports.generateTokenAndSetCookie  = (userId, res) => {
        return res.status(201).send(userId)
    // create token   
    const JWT_SECRET = "LearnWithS2"
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15d" });
    // set cookie 
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "development" // CSRF attacks cross-site request forgery attacks
        // sameSite: process.env.NODE_ENV !== "development" // CSRF attacks cross-site request forgery attacks
    });
}
