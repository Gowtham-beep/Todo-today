const express=require('express')
const userRouter=require('./backend/routes/users')
const TodoRouter=require('./backend/routes/todos')
const cors=require('cors')
const app=express()
const{DatabaseConnection}=require('./backend/DB/index')

app.use(cors())
app.use(express.json())


app.use('/user',userRouter)
app.use('/todos',TodoRouter)

DatabaseConnection().then(()=>{
    app.listen(3000)
})
