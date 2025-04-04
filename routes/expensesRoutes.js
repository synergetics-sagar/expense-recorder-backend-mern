const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const er = express.Router()
const path = require("path")
const auth = require("../middlewares/auth")
const expensesModel = require("../models/expensesModel")
const ExpensesAndCategoriesModel = require("../models/expensesAndCategoriesMode")

er.get("/", async (req, res)=>{
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
    const foundExpenses = await ExpensesAndCategoriesModel.find({userId: foundUser._id,date: {$gte: new Date(from), $lte: new Date(to)}})
    res.status(200).json({foundExpenses, from , to})
})

er.get("/:categoryId/:from/:to", auth, async (req, res)=>{
    const {from, to, categoryId} = req.params
    const foundUser = req.foundUser
    try{
        const foundExpenses = await ExpensesAndCategoriesModel.find({userId: foundUser._id,date: {$gte: new Date(from), $lte: new Date(to)}, categoryId: categoryId})
        res.status(200).json({foundExpenses})
    }
    catch(error){
        if(error.name=="CastError")
        res.status(500).json({error: "Invalid Category"})
    }
    
})



module.exports = er
