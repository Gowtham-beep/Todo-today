const express=require('express')
const jwt= require('jsonwebtoken')
const mongoose = require('mongoose');
const {User}=require('../DB/index')
const router=express.Router()
const bcrypt=require('bcrypt')
require('dotenv').config()

router.post('/signup', async (req, res) => {
    const { username, password } = req.body; 
    try {
        
        const user = await User.findOne({ username });
        if (user) {
            return res.status(403).json({
                message: "User already exists"
            });
        }

        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                return res.status(500).json({
                    message: "Error in hashing the password",
                    error: err.message
                });
            }
            const newUser = new User({ username, hash });
            await newUser.save();
            return res.status(201).json({
                message: "Signup successful",
                username,
                hash
            });
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error in creating user",
            error: error.message
        });
    }
});


router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = await User.findOne({ username });
        
        if (user) {
            bcrypt.compare(password, user.hash, (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Error during password comparison" });
                }if (result) {
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.json({
                        token: token,
                        message: "Password matched"
                    });
                } else {
                    res.status(401).json({
                        message: "Password mismatch"
                    });
                }
            });
        } else {
            res.status(404).json({
                message: "User not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});



module.exports=router