const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const {generateToken} = require('../util/generateToken');

module.exports.registerUser = async (req, res) => {
    try {
         let { name, email, password } = req.body;

         let existingUser = await userModel.findOne({email: email});

        if(existingUser) {
            return res.status(409).json({
                status: "error",
                message: "User already exists!"
            });
        }
 
        bcrypt.genSalt(10, async (err, salt) => {
            if (err) {
                return res.status(500).send('Error while generating salt!');
            }

            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    return res.status(500).send('Error while hashing the password!');
                }

                let newUser = await userModel.create({
                    name,
                    email,
                    password: hash,
                });

                let token = generateToken(newUser);
                res.cookie('token', token);
                return res.status(201).json({
                    status: "success",
                    message: "User registered successfully!",
                    data: {data: newUser.name, email: newUser.email},
                })
            });
        });
 
         
    }
     catch (error) {
          res.status(500).json({
                status: "error",
                message: "Internal server error!",
          })
     } 
 }

module.exports.loginUser = async (req, res) => {
    try{
        let {email, password} = req.body;

        let user = await userModel.findOne({email: email});
    
        if(!user) return res.status(404).json({
            status: "error",
            message: "User does not exist!",
        });    

        bcrypt.compare(password, user.password, function(err, result) {
            if(err) return res.status(500).send('Error while comparing password!');
            if(!result) return res.status(401).json({
                status: "error",
                message: "Invalid password!",
            });

            if(result) {
                let token = generateToken(user);
                res.cookie("token", token);
                res.status(200).json({
                    status: "success",
                    message: "User logged in successfully!",
                    data: {name: user.name, email: user.email},
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error!",
        })
    }
}

module.exports.logoutUser = async (req, res) => {
    try {
        res.cookie("token", "");
        res.status(200).json({
            status: "success",
            message: "User logged out successfully!",
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error!",
        })
    }
}
