const mongoose=require('mongoose')
require('dotenv').config()

const DatabaseConnection= async ()=> {
    try{
        await mongoose.connect(process.env.mongodb_link)
        console.log('Database connected')
    }catch(error){
        console.log('Database connection failed: ',error)
    }
}

const Schema=mongoose.Schema
const ObjectID= Schema.ObjectId

const usersSchema=new Schema({
    username:String,
    hash:String
})

const todoSchema=new Schema({
    title:String,
    description:String,
    status:Boolean,
    userId:ObjectID
})

const User=mongoose.model('User',usersSchema)
const Todo=mongoose.model('Todo',todoSchema)

module.exports={
    DatabaseConnection,
    User,
    Todo
}