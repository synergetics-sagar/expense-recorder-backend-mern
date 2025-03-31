const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const er = express.Router()
const path = require("path")
const auth = require("../middlewares/auth")
const expensesModel = require("../models/expensesModel")

er.get("/", auth, async (req, res)=>{
    const {foundUser} = req
    const expenses = await expensesModel.find({userId: foundUser._id})
    res.status(200).json({expenses})
})

er.post("/", auth, async (req, res)=>{
    let expense = req.body
    const {foundUser} = req 
    expense.userId = foundUser._id
    const newExpense = await expensesModel.insertOne(expense)
    res.status(200).json({newExpense})
})


module.exports = er
