const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const cr = express.Router()
const path = require("path")
const auth = require("../middlewares/auth")
const categoriesModel = require("../models/categoriesModel")


cr.get("/", auth ,async (req, res)=>{
    const foundUser = req.foundUser
    const categories = await categoriesModel.find({userId: foundUser._id})
    res.json({categories})
})

cr.post("/", auth ,async (req, res)=>{
    const foundUser = req.foundUser
    const {title} = req.body
    const category = {
        title,
        userId: foundUser._id
    }
    const newCategory = await categoriesModel.insertOne(category)
    res.status(200).json({newCategory})
})

module.exports = cr
