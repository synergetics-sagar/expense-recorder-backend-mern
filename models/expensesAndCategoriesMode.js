const mongoose = require("mongoose")

const ExpensesAndCategoriesSchema = new mongoose.Schema({
    description: {type: String},
    amount: {type: Number},
    date: {type: Date},
    categoryId: {type: mongoose.Schema.ObjectId},
    userId: {type: mongoose.Schema.ObjectId},
    categoryTitle: {type: String}
})

const ExpensesAndCategoriesModel = mongoose.model("ExpensesAndCategories", ExpensesAndCategoriesSchema, "expensesAndCategories")

module.exports = ExpensesAndCategoriesModel