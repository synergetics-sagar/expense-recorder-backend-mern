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

er.delete("/:id", auth, async (req, res)=>{
    const expenseId = req.params.id
    const foundUser = req.foundUser
    const deletedExpense = await expensesModel.findOneAndDelete({_id: expenseId, userId: foundUser._id})
    res.status(200).json({deletedExpense})
})

er.get("/:from/:to", auth, async (req, res)=>{
    const {from, to} = req.params
    const foundUser = req.foundUser
    const foundExpenses = await expensesModel.find({userId: foundUser._id,date: {$gte: new Date(from), $lte: new Date(to)}})
    res.status(200).json({foundExpenses, from , to})
})



module.exports = er
