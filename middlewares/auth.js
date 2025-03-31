const jwt = require("jsonwebtoken")
const usersModel = require("../models/usersModel")
async function auth(req, res, next){

    try{
        const token = req.headers.authorization
        const user = jwt.verify(token, "sagar@123")
        const foundUser = await usersModel.findOne({_id: user.id}, {password: 0})
        if(foundUser){
            req.foundUser = foundUser
            next()
        }
        else{
            res.status(400).json({error: "Unauthorized"})
        }
    }
    catch(error){
        if(error.name=="TokenExpiredError"){
            res.status(403).json({error})
        }
        else{
            res.status(400).json({error})
        }
    }
    
}

module.exports = auth