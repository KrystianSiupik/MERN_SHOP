const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
exports.secure = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "You are not logged in" });
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.TOKEN);
        req.user = decoded;
   
        next();
        
    } catch (error) {
        return res.status(403).json({ message: `Invalid token ${error}` });
    }
}

exports.adminAuthMiddleware = async (req,res,next)=>{
    try {
       
        const user = await User.findById(req.user.userId);


        if (!user) {
          
            return res.status(404).json({
                message: "User not found"
            });
        }


        if (user.role !== "admin") {
           
            return res.status(403).json({
                message: "Forbidden - User does not have admin privileges"
            });
        }

       
    } catch (error) {
        
        console.error("Error in adminAuthMiddleware:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
   next();
}