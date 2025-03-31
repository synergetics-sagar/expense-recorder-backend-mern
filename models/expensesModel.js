const mongoose = require("mongoose")

const ExpensesSchema = new mongoose.Schema({
    description: {type: String, required: true},
    amount: {type: Number, required: true},
    date: {type: Date, required: true},
    categoryId: {type: mongoose.Schema.ObjectId, required: true},
    userId: {type: mongoose.Schema.ObjectId, required: true},
})

const expensesModel = mongoose.model("Expenses", ExpensesSchema)

module.exports = expensesModel