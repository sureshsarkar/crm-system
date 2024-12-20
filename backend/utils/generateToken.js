const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


exports.generateTokenAndSetCookie = (userId,role, res) => {
    const token = jwt.sign({ userId,role }, process.env.JWT_SECRET, { expiresIn: "15d" });
    // return res.status(201).send(token)

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: process.env.NODE_ENV !== "development"
    });
    
    if(token !=''){
        return token;
    }else{
        return false;
    }
};

exports.getIdFromToken = (req,res)=>{
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;  // Contains user information like userId
}
