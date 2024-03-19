const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
exports.register = async(req,res,next)=>
{
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordRepeat: req.body.password
        }); 
        res.status(201).json({
            status:"sukces",
            data:{
                user: newUser
            }
        })
    } catch (error) {
        
        res.status(409).json({
            status:"failed",
            message:`failed to create user ${error}`
        })
    }
  

}

exports.login = async(req,res,next)=>
{
    try {
        const {email, password} = req.body;
        if(!email || !password)
        {
            return( res.status(400).json({
                staus:"failed",
                message:"no username of password"
            }))
        }
        const user = await User.findOne({email:email}).select('+password');
        if(!user || !(await user.correctPassword(password, user.password)))
        {
            return( res.status(400).json({
                staus:"failed",
                message:"there is no user with such username of password"
            }))  
        }
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN, { expiresIn: '1h' }); 
        res.status(200).json({ message: 'Login successful',user, token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.adminDashboard = async(req,res,next) =>
{
    res.status(200).json({validate:true})
}