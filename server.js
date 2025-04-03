let express = require("express")
const swaggerUi = require("swagger-ui-express");
let path = require("path")
const mongoose = require("mongoose")
const ur = require("./routes/usersRoutes")
const fs = require("fs");
const cr = require("./routes/categoriesRoutes");
const er = require("./routes/expensesRoutes");
const cors = require("cors")
let app = express()
const PORT = 8080

const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, "swagger.json"), "utf8"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.set("view engine", "pug")

app.use(express.json())
app.use(cors())
app.use("/users", ur)
app.use("/categories", cr)
app.use("/expenses", er)



const dbConnect = async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/expenseRecorder2")
        console.log("Connection Successful");
    }
    catch(err){
        console.log(err)
    }
}

dbConnect()
// mongodb://localhost:27017/

app.get("/", (req, res)=>{
    res.status(200).json({message: "SUCCESS From REST API"})
})

app.listen(PORT, ()=>{
    console.log(`Server listening in port: ${PORT}`)
})