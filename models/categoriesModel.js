const mongoose = require("mongoose")

const categoriesSchema = new mongoose.Schema({
    title: {type: String, required: true},
    userId: {type: mongoose.Schema.ObjectId, required: true},
})

const categoriesModel = mongoose.model("Categories", categoriesSchema)

module.exports = categoriesModel