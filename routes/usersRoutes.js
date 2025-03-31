const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const usersModel = require("../models/usersModel")
const ur = express.Router()
const path = require("path")
const auth = require("../middlewares/auth")

ur.get("/list",async (req,res)=>{
    const users = await usersModel.find({}, {name: 1})
    res.render("usersList", {users})

})

ur.get("/", async (req, res)=>{
    try{
        const users = await usersModel.find({}, {name: 1, email: 1, password: 1})
        res.status(200).json({payload: users})
    }
    catch(error){
        res.status(500).json({error})
    }
    
})

ur.get("/profile", auth ,async (req, res)=>{
    const foundUser = req.foundUser
    res.status(200).json({foundUser})
})

ur.post("/login", async (req, res)=>{
    const {email, password} = req.body
    const foundUser = await usersModel.findOne({email, password}, {password: 0, age: 0, married: 0})
    const user = {
        id: foundUser._id,
        email: foundUser.email,
        name: foundUser.name
    }
    const token = jwt.sign(user, "sagar@123", {expiresIn: "15m"})
    res.status(200).json({token})
})

ur.post("/", async (req, res)=>{
    const {name, email, password} = req.body
    try{
        const user = await usersModel.insertOne({name, email, password})
        res.status(200).json({payload: user})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error})
    }
    
})

ur.delete("/:id", async (req, res)=>{
    const uid = req.params.id
    try{
        const deletedUser = await usersModel.findOneAndDelete({_id: uid})
        res.status(200).json({deletedUser})
    }
    catch(error){
        res.status(500).json({error})
    }
    
})

ur.put("/:id", (req, res)=>{
    const uid = req.params.id
    const updatedUser = req.body
    res.status(200).json({
        message: `Update request for user with id: ${uid} successful`,
        updatedUser
    })
})


module.exports = ur
